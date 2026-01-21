#!/usr/bin/env python3
"""Train Qwen2.5-7B-Instruct with QLoRA SFT.

Compatible with TRL >= 0.9.0 using SFTConfig.
"""
from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List

import torch
import yaml
from datasets import load_dataset
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig

# Import SFTConfig for newer TRL versions
try:
    from trl import SFTTrainer, SFTConfig as TRLSFTConfig
    USE_SFT_CONFIG = True
except ImportError:
    from trl import SFTTrainer
    from transformers import TrainingArguments as TRLSFTConfig
    USE_SFT_CONFIG = False


@dataclass
class SFTConfig:
    base_model: str
    train_file: str
    eval_file: str
    output_dir: str
    max_seq_length: int
    per_device_train_batch_size: int
    gradient_accumulation_steps: int
    learning_rate: float
    warmup_ratio: float
    num_train_epochs: int
    logging_steps: int
    save_steps: int
    eval_steps: int
    seed: int
    merge_on_save: bool = False


def load_config(path: str) -> SFTConfig:
    with open(path, "r", encoding="utf-8") as handle:
        data = yaml.safe_load(handle)
    return SFTConfig(**data)


def format_messages(tokenizer, messages: List[Dict[str, str]]) -> str:
    return tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=False,
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", required=True)
    args = parser.parse_args()

    cfg = load_config(args.config)

    # Determine compute dtype
    compute_dtype = torch.bfloat16 if torch.cuda.is_available() and torch.cuda.is_bf16_supported() else torch.float16
    print(f"Using compute dtype: {compute_dtype}")

    # Quantization config for QLoRA
    quant_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=compute_dtype,
        bnb_4bit_use_double_quant=True,
    )

    # Load tokenizer
    tokenizer = AutoTokenizer.from_pretrained(cfg.base_model, use_fast=True)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    tokenizer.padding_side = "right"

    # Load model
    print(f"Loading model: {cfg.base_model}")
    model = AutoModelForCausalLM.from_pretrained(
        cfg.base_model,
        quantization_config=quant_config,
        device_map="auto",
        torch_dtype=compute_dtype,
    )
    model.config.use_cache = False

    # Prepare model for QLoRA training
    model = prepare_model_for_kbit_training(model)

    # LoRA config
    lora_config = LoraConfig(
        r=16,
        lora_alpha=32,
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM",
        target_modules=[
            "q_proj", "k_proj", "v_proj", "o_proj",
            "gate_proj", "up_proj", "down_proj",
        ],
    )

    # Apply LoRA
    model = get_peft_model(model, lora_config)
    model.print_trainable_parameters()

    # Load datasets
    print(f"Loading training data: {cfg.train_file}")
    train_ds = load_dataset("json", data_files=cfg.train_file, split="train")
    eval_ds = load_dataset("json", data_files=cfg.eval_file, split="train")

    # Preprocess dataset to add text field
    def map_fn(example: Dict[str, object]) -> Dict[str, str]:
        messages = example.get("messages", [])
        return {"text": format_messages(tokenizer, messages)}

    train_ds = train_ds.map(map_fn, remove_columns=train_ds.column_names)
    eval_ds = eval_ds.map(map_fn, remove_columns=eval_ds.column_names)

    # Build training config
    training_kwargs = dict(
        output_dir=cfg.output_dir,
        per_device_train_batch_size=cfg.per_device_train_batch_size,
        gradient_accumulation_steps=cfg.gradient_accumulation_steps,
        learning_rate=cfg.learning_rate,
        warmup_ratio=cfg.warmup_ratio,
        num_train_epochs=cfg.num_train_epochs,
        logging_steps=cfg.logging_steps,
        save_steps=cfg.save_steps,
        eval_steps=cfg.eval_steps,
        save_strategy="steps",
        fp16=(compute_dtype == torch.float16),
        bf16=(compute_dtype == torch.bfloat16),
        gradient_checkpointing=True,
        gradient_checkpointing_kwargs={"use_reentrant": False},
        seed=cfg.seed,
        report_to=[],
        optim="paged_adamw_8bit",
        lr_scheduler_type="cosine",
    )

    # Add max_seq_length for SFTConfig, eval_strategy for both
    if USE_SFT_CONFIG:
        training_kwargs["max_length"] = cfg.max_seq_length
        training_kwargs["eval_strategy"] = "steps"
        training_kwargs["packing"] = False
    else:
        training_kwargs["evaluation_strategy"] = "steps"

    training_args = TRLSFTConfig(**training_kwargs)

    # Create trainer - no peft_config since we already applied LoRA
    trainer_kwargs = dict(
        model=model,
        args=training_args,
        train_dataset=train_ds,
        eval_dataset=eval_ds,
    )

    # Add tokenizer with correct parameter name based on version
    if USE_SFT_CONFIG:
        trainer_kwargs["processing_class"] = tokenizer
    else:
        trainer_kwargs["tokenizer"] = tokenizer
        trainer_kwargs["max_seq_length"] = cfg.max_seq_length
        trainer_kwargs["dataset_text_field"] = "text"

    trainer = SFTTrainer(**trainer_kwargs)

    # Train
    print("Starting training...")
    trainer.train()

    # Save
    print(f"Saving model to {cfg.output_dir}")
    trainer.model.save_pretrained(cfg.output_dir)
    tokenizer.save_pretrained(cfg.output_dir)

    # Optionally merge LoRA weights
    if cfg.merge_on_save:
        print("Merging LoRA weights...")
        merged = trainer.model.merge_and_unload()
        merged_dir = Path(cfg.output_dir) / "merged"
        merged.save_pretrained(merged_dir)
        tokenizer.save_pretrained(merged_dir)
        print(f"Merged model saved to {merged_dir}")

    print("Training complete!")


if __name__ == "__main__":
    main()
