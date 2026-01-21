#!/usr/bin/env python3
"""Retrieve relevant chunks from Qdrant."""
from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
from typing import Dict, List

from qdrant_client import QdrantClient

from rag.retriever.embeddings import embed_query, embed_texts
from rag.retriever.store_qdrant import query_chunks, upsert_chunks


COLLECTION = "gazera_docs"


def load_chunks(path: Path) -> List[Dict[str, object]]:
    rows = []
    with path.open("r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            rows.append(json.loads(line))
    return rows


def index_chunks(chunks: List[Dict[str, object]], model_name: str, qdrant_url: str) -> None:
    texts = [chunk["text"] for chunk in chunks]
    vectors = embed_texts(texts, model_name)
    client = QdrantClient(url=qdrant_url)
    upsert_chunks(client, COLLECTION, vectors, chunks)


def retrieve(query: str, model_name: str, qdrant_url: str, top_k: int = 8) -> List[Dict[str, object]]:
    client = QdrantClient(url=qdrant_url)
    vector = embed_query(query, model_name)
    return query_chunks(client, COLLECTION, vector, top_k=top_k)


def main() -> None:
    parser = argparse.ArgumentParser(description="Index and retrieve chunks from Qdrant.")
    parser.add_argument("--index", help="JSONL of chunks to index")
    parser.add_argument("--query", help="Query text")
    parser.add_argument("--top-k", type=int, default=8)
    args = parser.parse_args()

    qdrant_url = os.getenv("QDRANT_URL", "http://localhost:6333")
    model_name = os.getenv("EMBED_MODEL", "intfloat/multilingual-e5-large")

    if args.index:
        chunks = load_chunks(Path(args.index))
        index_chunks(chunks, model_name, qdrant_url)
        print(f"Indexed {len(chunks)} chunks")

    if args.query:
        results = retrieve(args.query, model_name, qdrant_url, args.top_k)
        print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
