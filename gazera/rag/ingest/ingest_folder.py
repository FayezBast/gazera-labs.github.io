#!/usr/bin/env python3
"""Ingest docs into chunked JSONL for RAG."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Dict, Iterable, List

from pypdf import PdfReader

from rag.ingest.chunk_arabic import chunk_document


SUPPORTED_EXT = {".txt", ".md", ".pdf"}


def read_text(path: Path) -> str:
    if path.suffix.lower() == ".pdf":
        reader = PdfReader(str(path))
        return "\n".join(page.extract_text() or "" for page in reader.pages)
    return path.read_text(encoding="utf-8")


def iter_documents(root: Path) -> Iterable[Dict[str, str]]:
    for path in root.rglob("*"):
        if path.suffix.lower() not in SUPPORTED_EXT:
            continue
        text = read_text(path)
        title = path.stem
        for chunk in chunk_document(text, title, str(path)):
            yield chunk


def write_jsonl(path: Path, rows: Iterable[Dict[str, str]]) -> None:
    with path.open("w", encoding="utf-8") as handle:
        for row in rows:
            handle.write(json.dumps(row, ensure_ascii=False) + "\n")


def main() -> None:
    parser = argparse.ArgumentParser(description="Ingest a folder of docs into JSONL chunks.")
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()

    rows = list(iter_documents(Path(args.input)))
    write_jsonl(Path(args.output), rows)
    print(f"Wrote {len(rows)} chunks")


if __name__ == "__main__":
    main()
