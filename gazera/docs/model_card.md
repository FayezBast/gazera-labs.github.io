# Model Card: Gazera Qwen2.5-7B SFT

## Base Model
- Qwen/Qwen2.5-7B-Instruct

## Intended Use
Arabic-first assistant for general instruction following and grounded QA with citations.

## Training Data
- JSONL chat format with Arabic normalization, deduplication, and train/dev/test splits.

## Limitations
- May fail on out-of-domain topics without RAG sources.
- Safety is enforced by policy prompts and data filters, but not guaranteed.

## Evaluation
- Small Arabic QA set and RAG grounding checks in `eval/`.
