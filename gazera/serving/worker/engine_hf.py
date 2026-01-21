from __future__ import annotations

import logging
import os
from typing import List

import torch
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

logger = logging.getLogger(__name__)


class HFEngine:
    def __init__(self) -> None:
        model_path = os.getenv("MERGED_MODEL_PATH") or os.getenv("MODEL_PATH", "Qwen/Qwen2.5-7B-Instruct")
        adapter_path = os.getenv("ADAPTER_PATH")
        dtype = torch.bfloat16 if torch.cuda.is_available() and torch.cuda.is_bf16_supported() else torch.float16

        logger.info(f"Loading model from {model_path}")
        logger.info(f"Using dtype: {dtype}")

        try:
            self.tokenizer = AutoTokenizer.from_pretrained(model_path, use_fast=True)
            if self.tokenizer.pad_token is None:
                self.tokenizer.pad_token = self.tokenizer.eos_token

            self.model = AutoModelForCausalLM.from_pretrained(
                model_path,
                device_map="auto",
                torch_dtype=dtype,
            )
            if adapter_path and os.path.exists(adapter_path):
                logger.info(f"Loading adapter from {adapter_path}")
                self.model = PeftModel.from_pretrained(self.model, adapter_path)
            self.model.eval()
            logger.info("Model loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load model: {e}")
            raise

    def generate(self, messages: List[dict], max_tokens: int, temperature: float) -> str:
        if not messages:
            raise ValueError("messages cannot be empty")
        if max_tokens <= 0:
            raise ValueError(f"max_tokens must be positive, got {max_tokens}")
        if temperature < 0:
            raise ValueError(f"temperature must be non-negative, got {temperature}")

        try:
            prompt = self.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
            inputs = self.tokenizer(prompt, return_tensors="pt").to(self.model.device)
            output_ids = self.model.generate(
                **inputs,
                max_new_tokens=max_tokens,
                do_sample=temperature > 0,
                temperature=temperature if temperature > 0 else None,
            )
            new_tokens = output_ids[0][inputs["input_ids"].shape[1]:]
            return self.tokenizer.decode(new_tokens, skip_special_tokens=True).strip()
        except Exception as e:
            logger.error(f"Generation failed: {e}")
            raise
