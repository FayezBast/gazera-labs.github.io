from __future__ import annotations


def get_engine():
    try:
        from serving.worker.engine_vllm import VLLMEngine

        return VLLMEngine()
    except Exception:
        from serving.worker.engine_hf import HFEngine

        return HFEngine()
