from __future__ import annotations

import re
from typing import Optional

import requests


def parse_score(text: str) -> Optional[int]:
    match = re.search(r"[1-5]", text)
    if match:
        return int(match.group(0))
    return None


def judge_with_model(api_url: str, rubric: str, prompt: str) -> int:
    payload = {
        "messages": [
            {"role": "system", "content": rubric},
            {"role": "user", "content": prompt},
        ],
        "max_tokens": 8,
        "temperature": 0.0,
    }
    response = requests.post(f"{api_url}/chat", json=payload, timeout=120)
    response.raise_for_status()
    answer = response.json().get("answer", "")
    score = parse_score(answer)
    return score or 1
