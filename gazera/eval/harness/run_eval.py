#!/usr/bin/env python3
"""Run a lightweight evaluation harness."""
from __future__ import annotations

import argparse
import csv
import json
import os
from datetime import datetime
from pathlib import Path
from typing import Dict, List

import requests

from eval.harness.judges import judge_with_model
from eval.harness.metrics import exact_match

BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "eval" / "datasets"
PROMPTS_DIR = BASE_DIR / "eval" / "harness" / "prompts"


def load_jsonl(path: Path) -> List[Dict[str, object]]:
    rows = []
    with path.open("r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            rows.append(json.loads(line))
    return rows


def call_api(api_url: str, messages: List[Dict[str, str]]) -> str:
    payload = {"messages": messages, "max_tokens": 256, "temperature": 0.0}
    response = requests.post(f"{api_url}/chat", json=payload, timeout=120)
    response.raise_for_status()
    return response.json().get("answer", "")


def call_rag(api_url: str, messages: List[Dict[str, str]]) -> Dict[str, object]:
    payload = {"messages": messages, "max_tokens": 256, "temperature": 0.0}
    response = requests.post(f"{api_url}/rag/chat", json=payload, timeout=120)
    response.raise_for_status()
    return response.json()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--api-url", default=os.getenv("API_URL", "http://localhost:8000"))
    args = parser.parse_args()

    qa_path = DATA_DIR / "qa_ar.jsonl"
    rag_path = DATA_DIR / "rag_grounding.jsonl"

    qa_rows = load_jsonl(qa_path)
    rag_rows = load_jsonl(rag_path)

    rubric_inst = (PROMPTS_DIR / "rubric_arabic_instruction.txt").read_text(encoding="utf-8")
    rubric_rag = (PROMPTS_DIR / "rubric_rag_grounding.txt").read_text(encoding="utf-8")

    qa_preds = []
    qa_refs = []
    qa_scores = []
    for row in qa_rows:
        question = row["question"]
        answer = call_api(args.api_url, [{"role": "user", "content": question}])
        qa_preds.append(answer)
        qa_refs.append(row["answer"])
        score = judge_with_model(args.api_url, rubric_inst, f"سؤال: {question}\nإجابة: {answer}")
        qa_scores.append(score)

    rag_scores = []
    rag_citation_hits = []
    for row in rag_rows:
        question = row["question"]
        response = call_rag(args.api_url, [{"role": "user", "content": question}])
        answer = response.get("answer", "")
        citations = response.get("citations") or []
        has_citation = bool(citations) and "المصادر" in answer
        rag_citation_hits.append(1 if has_citation else 0)
        score = judge_with_model(args.api_url, rubric_rag, f"سؤال: {question}\nإجابة: {answer}")
        rag_scores.append(score)

    metrics = {
        "qa_exact_match": exact_match(qa_preds, qa_refs),
        "qa_judge_avg": sum(qa_scores) / max(1, len(qa_scores)),
        "rag_judge_avg": sum(rag_scores) / max(1, len(rag_scores)),
        "rag_citation_rate": sum(rag_citation_hits) / max(1, len(rag_citation_hits)),
    }

    report_dir = BASE_DIR / "eval" / "reports"
    report_dir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.utcnow().strftime("%Y%m%d")
    report_path = report_dir / f"report_{stamp}.md"
    metrics_path = report_dir / "metrics.csv"

    with report_path.open("w", encoding="utf-8") as handle:
        handle.write("# Gazera Eval Report\n\n")
        for key, value in metrics.items():
            handle.write(f"- {key}: {value:.3f}\n")

    with metrics_path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(["metric", "value"])
        for key, value in metrics.items():
            writer.writerow([key, value])

    print(f"Report written to {report_path}")


if __name__ == "__main__":
    main()
