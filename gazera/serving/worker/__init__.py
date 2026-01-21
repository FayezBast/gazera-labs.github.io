from __future__ import annotations

import logging

logger = logging.getLogger(__name__)


def get_engine():
    """Get inference engine with fallback from vLLM to HuggingFace."""
    try:
        from serving.worker.engine_vllm import VLLMEngine

        logger.info("Initializing vLLM engine")
        return VLLMEngine()
    except ImportError as e:
        logger.warning(f"vLLM not available ({e}), falling back to HuggingFace Transformers")
    except Exception as e:
        logger.error(f"Failed to initialize vLLM engine: {e}, falling back to HuggingFace Transformers")
    
    try:
        from serving.worker.engine_hf import HFEngine

        logger.info("Initializing HuggingFace Transformers engine")
        return HFEngine()
    except Exception as e:
        logger.error(f"Failed to initialize HuggingFace engine: {e}")
        raise RuntimeError("Could not initialize any inference engine") from e
