#!/usr/bin/env python3
"""Train Qwen2.5-7B-Instruct with QLoRA SFT."""
from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List

import torch
import yaml
from datasets import load_dataset
from peft import LoraConfig
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    TrainingArguments,
)
from trl import SFTTrainer


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
    merge_on_save: bool


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

    compute_dtype = torch.bfloat16 if torch.cuda.is_available() and torch.cuda.is_bf16_supported() else torch.float16
    quant_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=compute_dtype,
    )

    tokenizer = AutoTokenizer.from_pretrained(cfg.base_model, use_fast=True)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    model = AutoModelForCausalLM.from_pretrained(
        cfg.base_model,
        quantization_config=quant_config,
        device_map="auto",
    )
    model.config.use_cache = False

    lora_config = LoraConfig(
        r=16,
        lora_alpha=16,
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM",
        target_modules=[
            "q_proj",
            "k_proj",
            "v_proj",
            "o_proj",
            "gate_proj",
            "up_proj",
            "down_proj",
        ],
    )

    train_ds = load_dataset("json", data_files=cfg.train_file, split="train")
    eval_ds = load_dataset("json", data_files=cfg.eval_file, split="train")

    def map_fn(example: Dict[str, object]) -> Dict[str, str]:
        messages = example.get("messages", [])
        return {"text": format_messages(tokenizer, messages)}

    train_ds = train_ds.map(map_fn, remove_columns=train_ds.column_names)
    eval_ds = eval_ds.map(map_fn, remove_columns=eval_ds.column_names)

    training_args = TrainingArguments(
        output_dir=cfg.output_dir,
        per_device_train_batch_size=cfg.per_device_train_batch_size,
        gradient_accumulation_steps=cfg.gradient_accumulation_steps,
        learning_rate=cfg.learning_rate,
        warmup_ratio=cfg.warmup_ratio,
        num_train_epochs=cfg.num_train_epochs,
        logging_steps=cfg.logging_steps,
        save_steps=cfg.save_steps,
        eval_steps=cfg.eval_steps,
        eval_strategy="steps",
        save_strategy="steps",
        fp16=compute_dtype == torch.float16,
        bf16=compute_dtype == torch.bfloat16,
        gradient_checkpointing=True,
        seed=cfg.seed,
        report_to=[],
    )

    trainer = SFTTrainer(
        model=model,
        processing_class=tokenizer,
        train_dataset=train_ds,
        eval_dataset=eval_ds,
        max_seq_length=cfg.max_seq_length,
        peft_config=lora_config,
        args=training_args,
    )

    trainer.train()
    trainer.model.save_pretrained(cfg.output_dir)
    tokenizer.save_pretrained(cfg.output_dir)

    if cfg.merge_on_save:
        from peft import PeftModel

        merged = PeftModel.from_pretrained(model, cfg.output_dir)
        merged = merged.merge_and_unload()
        merged_dir = Path(cfg.output_dir) / "merged"
        merged.save_pretrained(merged_dir)
        tokenizer.save_pretrained(merged_dir)


if __name__ == "__main__":
    main()
