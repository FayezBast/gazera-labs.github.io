#!/usr/bin/env python3
"""Optional reranking for retrieved chunks."""
from __future__ import annotations

from typing import Dict, List

import numpy as np

from rag.retriever.embeddings import embed_query, embed_texts


def cosine_rerank(query: str, chunks: List[Dict[str, object]], model_name: str) -> List[Dict[str, object]]:
    texts = [chunk["text"] for chunk in chunks]
    vectors = embed_texts(texts, model_name)
    query_vec = embed_query(query, model_name)
    scores = np.dot(vectors, query_vec)
    ranked = sorted(zip(chunks, scores), key=lambda x: x[1], reverse=True)
    return [item[0] for item in ranked]
