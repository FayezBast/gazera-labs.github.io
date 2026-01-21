#!/usr/bin/env python3
"""Qdrant storage helpers."""
from __future__ import annotations

from typing import Dict, Iterable, List

import numpy as np
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, PointStruct, VectorParams


def ensure_collection(client: QdrantClient, collection: str, vector_size: int) -> None:
    if collection in [c.name for c in client.get_collections().collections]:
        return
    client.create_collection(
        collection_name=collection,
        vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE),
    )


def upsert_chunks(
    client: QdrantClient,
    collection: str,
    embeddings: np.ndarray,
    payloads: List[Dict[str, object]],
) -> None:
    ensure_collection(client, collection, embeddings.shape[1])
    points = [
        PointStruct(id=idx, vector=embeddings[idx].tolist(), payload=payloads[idx])
        for idx in range(len(payloads))
    ]
    client.upsert(collection_name=collection, points=points)


def query_chunks(
    client: QdrantClient,
    collection: str,
    query_vector: np.ndarray,
    top_k: int = 8,
) -> List[Dict[str, object]]:
    results = client.search(collection_name=collection, query_vector=query_vector.tolist(), limit=top_k)
    return [result.payload for result in results]
