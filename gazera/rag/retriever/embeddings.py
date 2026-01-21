#!/usr/bin/env python3
"""Embedding utilities for RAG."""
from __future__ import annotations

from functools import lru_cache
from typing import Iterable, List

import numpy as np

try:
    from sentence_transformers import SentenceTransformer
except Exception as exc:  # pragma: no cover - optional
    raise ImportError("sentence-transformers is required for embeddings") from exc


@lru_cache(maxsize=1)
def get_model(model_name: str) -> SentenceTransformer:
    return SentenceTransformer(model_name)


def embed_texts(texts: Iterable[str], model_name: str) -> np.ndarray:
    model = get_model(model_name)
    vectors = model.encode(list(texts), normalize_embeddings=True)
    return np.array(vectors)


def embed_query(query: str, model_name: str) -> np.ndarray:
    return embed_texts([query], model_name)[0]
