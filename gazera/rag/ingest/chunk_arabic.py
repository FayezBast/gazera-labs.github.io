#!/usr/bin/env python3
"""Arabic-aware chunking utilities."""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Dict, Iterable, List

SENTENCE_SPLIT_RE = re.compile(r"(?<=[\.!؟\n])\s+")


def split_sentences(text: str) -> List[str]:
    parts = [p.strip() for p in SENTENCE_SPLIT_RE.split(text) if p.strip()]
    return parts or [text.strip()]


def chunk_text(text: str, chunk_size: int = 1200, overlap: int = 200) -> List[str]:
    sentences = split_sentences(text)
    chunks: List[str] = []
    current: List[str] = []
    current_len = 0

    for sentence in sentences:
        if current_len + len(sentence) + 1 > chunk_size and current:
            chunk = " ".join(current).strip()
            chunks.append(chunk)
            tail = chunk[-overlap:] if overlap > 0 else ""
            current = [tail] if tail else []
            current_len = len(tail)
        current.append(sentence)
        current_len += len(sentence) + 1

    if current:
        chunks.append(" ".join(current).strip())
    return chunks


def chunk_document(text: str, title: str, source_path: str) -> List[Dict[str, str]]:
    chunks = chunk_text(text)
    return [
        {
            "title": title,
            "source_path": source_path,
            "chunk_id": f"{title}-{idx}",
            "text": chunk,
        }
        for idx, chunk in enumerate(chunks)
    ]


def write_jsonl(path: Path, rows: Iterable[Dict[str, str]]) -> None:
    with path.open("w", encoding="utf-8") as handle:
        for row in rows:
            handle.write(json.dumps(row, ensure_ascii=False) + "\n")


def main() -> None:
    parser = argparse.ArgumentParser(description="Chunk a text file into Arabic-aware chunks.")
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--title", default="document")
    args = parser.parse_args()

    text = Path(args.input).read_text(encoding="utf-8")
    rows = chunk_document(text, args.title, args.input)
    write_jsonl(Path(args.output), rows)


if __name__ == "__main__":
    main()
