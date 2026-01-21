#!/usr/bin/env python3
"""MinHash/LSH deduplication for JSONL chat data."""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Dict, Iterable, List

from datasketch import MinHash, MinHashLSH

ARABIC_RE = re.compile(r"[\u0600-\u06FF]")


def iter_jsonl(path: Path) -> Iterable[Dict[str, object]]:
    with path.open("r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            yield json.loads(line)


def write_jsonl(path: Path, rows: Iterable[Dict[str, object]]) -> None:
    with path.open("w", encoding="utf-8") as handle:
        for row in rows:
            handle.write(json.dumps(row, ensure_ascii=False) + "\n")


def normalize_for_dedupe(text: str) -> List[str]:
    text = text.lower().strip()
    text = re.sub(r"\s+", " ", text)
    return text.split()


def build_signature(tokens: List[str], num_perm: int) -> MinHash:
    mh = MinHash(num_perm=num_perm)
    for token in tokens:
        mh.update(token.encode("utf-8"))
    return mh


def concat_messages(row: Dict[str, object]) -> str:
    messages = row.get("messages_normalized") or row.get("messages") or []
    parts: List[str] = []
    if isinstance(messages, list):
        for msg in messages:
            content = str(msg.get("content_normalized", msg.get("content", "")))
            parts.append(content)
    return "\n".join(parts)


def main() -> None:
    parser = argparse.ArgumentParser(description="MinHash/LSH dedupe for JSONL chat data.")
    parser.add_argument("--input", required=True, help="Input JSONL path")
    parser.add_argument("--output", required=True, help="Output JSONL path")
    parser.add_argument("--threshold", type=float, default=0.9)
    parser.add_argument("--num-perm", type=int, default=128)
    args = parser.parse_args()

    rows = list(iter_jsonl(Path(args.input)))
    lsh = MinHashLSH(threshold=args.threshold, num_perm=args.num_perm)

    kept_rows: List[Dict[str, object]] = []
    for idx, row in enumerate(rows):
        text = concat_messages(row)
        if not ARABIC_RE.search(text):
            kept_rows.append(row)
            continue
        tokens = normalize_for_dedupe(text)
        if not tokens:
            kept_rows.append(row)
            continue
        mh = build_signature(tokens, args.num_perm)
        matches = lsh.query(mh)
        if matches:
            row["dedupe_drop"] = True
            continue
        key = f"item-{idx}"
        lsh.insert(key, mh)
        kept_rows.append(row)

    write_jsonl(Path(args.output), kept_rows)


if __name__ == "__main__":
    main()
