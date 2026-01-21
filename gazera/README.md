# Gazera

Arabic-first LLM system built around Qwen2.5-7B-Instruct with QLoRA fine-tuning, RAG + citations, FastAPI/vLLM serving, and a minimal web UI.

## Quickstart (RunPod RTX 4090)

1) Start a RunPod RTX 4090 instance with CUDA 12.x and Python 3.11.
2) Clone the repo and enter the project:

```bash
cd gazera
make setup
```

3) (Optional) Normalize + dedupe + split your dataset:

```bash
python data/scripts/normalize_arabic.py --input data/raw/your.jsonl --output data/processed/normalized.jsonl
python data/scripts/dedupe_minhash.py --input data/processed/normalized.jsonl --output data/processed/deduped.jsonl
python data/scripts/split_dataset.py --input data/processed/deduped.jsonl \
  --train data/datasets/train.jsonl --dev data/datasets/dev.jsonl --test data/datasets/test.jsonl
```

4) Train QLoRA SFT:

```bash
make train_sft
```

5) Merge adapters:

```bash
make merge
```

6) Serve API:

```bash
make serve
```

7) Start UI:

```bash
make ui
```

## Data Format

The training dataset uses JSONL with a `messages` list:

```json
{"messages": [{"role": "system", "content": "..."}, {"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]}
```

Use `data/scripts/validate_dataset.py` to enforce schema and Arabic checks.

## RAG Ingestion

1) Run Qdrant:

```bash
make rag_up
```

2) Ingest docs from `samples/docs` (or your own folder):

```bash
make ingest_docs
python rag/retriever/retrieve.py --index data/processed/rag_store.jsonl
```

3) Ask RAG questions via `POST /rag/chat`.

## Evaluation

```bash
make eval
```

Reports appear in `eval/reports/`.

## Configuration

- `training/configs/sft_qwen25_7b_qlora.yaml` contains the 4090 defaults.
- `.env.example` lists environment variables for model paths and Qdrant.

## Troubleshooting

- **bitsandbytes errors**: ensure CUDA + compatible PyTorch installed, and try `pip install bitsandbytes` after setting `CUDA_HOME`.
- **vLLM missing**: the API falls back to Transformers. Install vLLM to enable `serving/worker/engine_vllm.py`.
- **CUDA OOM**: reduce `max_seq_length`, increase `gradient_accumulation_steps`, or lower batch size.

## Notes

- GGUF export is intentionally not implemented; use `llama.cpp` to convert the merged model.
- This repo ships small sample datasets for smoke tests only.
