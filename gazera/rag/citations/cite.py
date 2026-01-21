#!/usr/bin/env python3
"""Citation helpers for RAG responses."""
from __future__ import annotations

from typing import Dict, List


def short_quote(text: str, max_chars: int = 240) -> str:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    quote = " ".join(lines[:2])
    if len(quote) > max_chars:
        quote = quote[: max_chars - 3].rstrip() + "..."
    return quote


def build_citations(chunks: List[Dict[str, object]]) -> List[Dict[str, str]]:
    citations = []
    for chunk in chunks:
        citations.append({
            "title": str(chunk.get("title", "")),
            "chunk_id": str(chunk.get("chunk_id", "")),
            "quote": short_quote(str(chunk.get("text", ""))),
        })
    return citations
