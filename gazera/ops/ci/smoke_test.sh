#!/usr/bin/env bash
set -euo pipefail

PYTHONPATH=. python -m pytest -q
PYTHONPATH=. python data/scripts/validate_dataset.py --input data/datasets/train.jsonl || true
