from __future__ import annotations

import re
from typing import List


def normalize(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"\s+", " ", text)
    return text


def exact_match(preds: List[str], refs: List[str]) -> float:
    if not preds:
        return 0.0
    hits = 0
    for pred, ref in zip(preds, refs):
        if normalize(pred) == normalize(ref):
            hits += 1
    return hits / len(preds)
