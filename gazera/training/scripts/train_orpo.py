#!/usr/bin/env python3
"""Train ORPO/DPO with QLoRA.

Compatible with TRL >= 0.9.0.
"""
from __future__ import annotations

import argparse
from dataclasses import dataclass
from typing import Dict

import torch
import yaml
from datasets import load_dataset
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig

# Try to import ORPO, fall back to DPO
try:
    from trl import ORPOTrainer, ORPOConfig
    TRAINER_CLASS = ORPOTrainer
    CONFIG_CLASS = ORPOConfig
    TRAINER_NAME = "ORPO"
except ImportError:
    try:
        from trl import DPOTrainer, DPOConfig
        TRAINER_CLASS = DPOTrainer
        CONFIG_CLASS = DPOConfig
        TRAINER_NAME = "DPO"
    except ImportError:
        from trl import DPOTrainer
        from transformers import TrainingArguments
        TRAINER_CLASS = DPOTrainer
        CONFIG_CLASS = TrainingArguments
        TRAINER_NAME = "DPO-legacy"


@dataclass
class ORPOCfg:
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
    beta: float = 0.1


def load_config(path: str) -> ORPOCfg:
    with open(path, "r", encoding="utf-8") as handle:
        data = yaml.safe_load(handle)
    return ORPOCfg(**data)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", required=True)
    args = parser.parse_args()

    cfg = load_config(args.config)

    print(f"Using trainer: {TRAINER_NAME}")

    # Determine compute dtype
    compute_dtype = torch.bfloat16 if torch.cuda.is_available() and torch.cuda.is_bf16_supported() else torch.float16
    print(f"Using compute dtype: {compute_dtype}")

    # Quantization config
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

    # Prepare for QLoRA
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

    # Load datasets
    print(f"Loading training data: {cfg.train_file}")
    train_ds = load_dataset("json", data_files=cfg.train_file, split="train")
    eval_ds = load_dataset("json", data_files=cfg.eval_file, split="train")

    # Build config based on trainer type
    config_kwargs = dict(
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
        seed=cfg.seed,
        report_to=[],
        optim="paged_adamw_8bit",
        lr_scheduler_type="cosine",
    )

    # Add trainer-specific params
    if TRAINER_NAME in ["ORPO", "DPO"]:
        config_kwargs["max_length"] = cfg.max_seq_length
        config_kwargs["max_prompt_length"] = cfg.max_seq_length // 2
        config_kwargs["beta"] = cfg.beta
        config_kwargs["eval_strategy"] = "steps"
    else:
        config_kwargs["evaluation_strategy"] = "steps"

    training_config = CONFIG_CLASS(**config_kwargs)

    # Create trainer
    trainer_kwargs = dict(
        model=model,
        args=training_config,
        train_dataset=train_ds,
        eval_dataset=eval_ds,
        peft_config=lora_config,
    )

    # Add tokenizer with correct param name
    if TRAINER_NAME in ["ORPO", "DPO"]:
        trainer_kwargs["processing_class"] = tokenizer
    else:
        trainer_kwargs["tokenizer"] = tokenizer
        trainer_kwargs["max_length"] = cfg.max_seq_length
        trainer_kwargs["max_prompt_length"] = cfg.max_seq_length // 2
        trainer_kwargs["beta"] = cfg.beta

    trainer = TRAINER_CLASS(**trainer_kwargs)

    # Train
    print("Starting training...")
    trainer.train()

    # Save
    print(f"Saving model to {cfg.output_dir}")
    trainer.model.save_pretrained(cfg.output_dir)
    tokenizer.save_pretrained(cfg.output_dir)

    print("Training complete!")


if __name__ == "__main__":
    main()
