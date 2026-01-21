#!/usr/bin/env python3
"""Arabic normalization for JSONL chat data."""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Dict, Iterable, List

ARABIC_RE = re.compile(r"[\u0600-\u06FF]")


def normalize_text(
    text: str,
    remove_tatweel: bool = True,
    normalize_taa_marbuta: bool = False,
) -> str:
    if remove_tatweel:
        text = text.replace("\u0640", "")
    text = re.sub(r"[\u0622\u0623\u0625]", "\u0627", text)
    text = text.replace("\u0649", "\u064A")
    if normalize_taa_marbuta:
        text = text.replace("\u0629", "\u0647")
    return text


def normalize_messages(messages: List[Dict[str, str]], **kwargs: object) -> List[Dict[str, str]]:
    normalized: List[Dict[str, str]] = []
    for msg in messages:
        content = msg.get("content", "")
        normalized.append({
            "role": msg.get("role", ""),
            "content": content,
            "content_normalized": normalize_text(content, **kwargs),
        })
    return normalized


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


def main() -> None:
    parser = argparse.ArgumentParser(description="Normalize Arabic text in JSONL chat data.")
    parser.add_argument("--input", required=True, help="Input JSONL path")
    parser.add_argument("--output", required=True, help="Output JSONL path")
    parser.add_argument("--keep-tatweel", action="store_true", help="Keep tatweel")
    parser.add_argument("--normalize-taa-marbuta", action="store_true")
    args = parser.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)

    def process_row(row: Dict[str, object]) -> Dict[str, object]:
        messages = row.get("messages", [])
        if isinstance(messages, list):
            row["messages_normalized"] = normalize_messages(
                messages,
                remove_tatweel=not args.keep_tatweel,
                normalize_taa_marbuta=args.normalize_taa_marbuta,
            )
        text_fields = []
        if isinstance(messages, list):
            for msg in messages:
                content = str(msg.get("content", ""))
                text_fields.append(content)
        joined = "\n".join(text_fields)
        row["text_normalized"] = normalize_text(
            joined,
            remove_tatweel=not args.keep_tatweel,
            normalize_taa_marbuta=args.normalize_taa_marbuta,
        )
        row["contains_arabic"] = bool(ARABIC_RE.search(joined))
        return row

    rows = (process_row(row) for row in iter_jsonl(input_path))
    write_jsonl(output_path, rows)


if __name__ == "__main__":
    main()
