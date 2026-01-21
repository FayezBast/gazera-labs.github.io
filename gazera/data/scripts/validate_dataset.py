#!/usr/bin/env python3
"""Validate chat JSONL schema and basic Arabic checks."""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Dict, Iterable, List

ARABIC_RE = re.compile(r"[\u0600-\u06FF]")
ALLOWED_ROLES = {"system", "user", "assistant"}


def iter_jsonl(path: Path) -> Iterable[Dict[str, object]]:
    with path.open("r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            yield json.loads(line)


def validate_row(row: Dict[str, object], max_chars: int) -> List[str]:
    errors: List[str] = []
    messages = row.get("messages")
    if not isinstance(messages, list) or not messages:
        return ["missing_messages"]

    for msg in messages:
        role = msg.get("role")
        content = str(msg.get("content", ""))
        if role not in ALLOWED_ROLES:
            errors.append("bad_role")
        if not content.strip():
            errors.append("empty_content")
        if len(content) > max_chars:
            errors.append("too_long")

    if messages[-1].get("role") != "assistant":
        errors.append("last_not_assistant")

    user_text = " ".join(
        str(msg.get("content", "")) for msg in messages if msg.get("role") == "user"
    )
    if not ARABIC_RE.search(user_text):
        errors.append("no_arabic")
    return errors


def main() -> None:
    parser = argparse.ArgumentParser(description="Validate JSONL chat dataset.")
    parser.add_argument("--input", required=True)
    parser.add_argument("--max-chars", type=int, default=4000)
    args = parser.parse_args()

    errors_count: Dict[str, int] = {}
    total = 0
    for row in iter_jsonl(Path(args.input)):
        total += 1
        errors = validate_row(row, args.max_chars)
        for err in set(errors):
            errors_count[err] = errors_count.get(err, 0) + 1

    if errors_count:
        print(f"Found {len(errors_count)} issue types in {total} rows")
        for err, count in sorted(errors_count.items()):
            print(f"- {err}: {count}")
        raise SystemExit(1)
    print(f"Validation passed for {total} rows")


if __name__ == "__main__":
    main()
