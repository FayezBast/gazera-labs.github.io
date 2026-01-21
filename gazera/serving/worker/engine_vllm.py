from __future__ import annotations

import os
from typing import List

try:
    from vllm import LLM, SamplingParams
except Exception as exc:  # pragma: no cover - optional
    raise ImportError("vLLM is not installed") from exc


class VLLMEngine:
    def __init__(self) -> None:
        model_path = os.getenv("MERGED_MODEL_PATH") or os.getenv("MODEL_PATH", "Qwen/Qwen2.5-7B-Instruct")
        self.llm = LLM(model=model_path)

    def generate(self, messages: List[dict], max_tokens: int, temperature: float) -> str:
        prompt = "".join([f"{m['role']}: {m['content']}\n" for m in messages])
        params = SamplingParams(max_tokens=max_tokens, temperature=temperature)
        outputs = self.llm.generate([prompt], params)
        return outputs[0].outputs[0].text.strip()
