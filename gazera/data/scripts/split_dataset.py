#!/usr/bin/env python3
"""Split dataset into train/dev/test JSONL files."""
from __future__ import annotations

import argparse
import hashlib
import json
import random
from pathlib import Path
from typing import Dict, Iterable, List


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


def prompt_hash(row: Dict[str, object]) -> str:
    messages = row.get("messages_normalized") or row.get("messages") or []
    parts: List[str] = []
    if isinstance(messages, list):
        for msg in messages:
            if msg.get("role") == "user":
                parts.append(str(msg.get("content_normalized", msg.get("content", ""))))
    joined = "\n".join(parts)
    return hashlib.sha256(joined.encode("utf-8")).hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser(description="Split JSONL dataset into train/dev/test.")
    parser.add_argument("--input", required=True)
    parser.add_argument("--train", required=True)
    parser.add_argument("--dev", required=True)
    parser.add_argument("--test", required=True)
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--dev-ratio", type=float, default=0.05)
    parser.add_argument("--test-ratio", type=float, default=0.05)
    args = parser.parse_args()

    rows = list(iter_jsonl(Path(args.input)))
    random.Random(args.seed).shuffle(rows)

    seen_hashes = set()
    unique_rows: List[Dict[str, object]] = []
    for row in rows:
        h = prompt_hash(row)
        if h in seen_hashes:
            continue
        seen_hashes.add(h)
        unique_rows.append(row)

    total = len(unique_rows)
    dev_size = int(total * args.dev_ratio)
    test_size = int(total * args.test_ratio)
    train_size = total - dev_size - test_size

    train_rows = unique_rows[:train_size]
    dev_rows = unique_rows[train_size:train_size + dev_size]
    test_rows = unique_rows[train_size + dev_size:]

    write_jsonl(Path(args.train), train_rows)
    write_jsonl(Path(args.dev), dev_rows)
    write_jsonl(Path(args.test), test_rows)


if __name__ == "__main__":
    main()
