<div align="center">

# Gazera

Arabic-first AI platform for training, grounding, and serving reliable assistants.

Gazera combines QLoRA fine-tuning, retrieval-augmented generation (RAG), citation-aware responses, FastAPI serving, and a Next.js web app in one repo.

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111%2B-009688?style=flat&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js&logoColor=white)
![License](https://img.shields.io/badge/License-Apache--2.0-blue?style=flat)

</div>

## Quick Links

- Platform docs: `gazera/README.md`
- RunPod guide: `gazera/ops/runpod/README.md`
- API server: `gazera/serving/api/main.py`
- Web app: `gazera/ui/web/`

## Why This Project

- Arabic-first quality instead of Arabic-as-translation.
- Grounded answers with document citations for higher trust.
- Full lifecycle in one codebase: data prep, training, eval, API, and UI.
- Built to run on practical hardware (for example: RTX 4090 workflows).

## What Is In This Repository

- `gazera/`: Core product and ML stack.
- `gazera/ui/web/`: Next.js web app.
- `gazera/serving/api/`: FastAPI endpoints for chat and RAG chat.
- `gazera/training/`: SFT and ORPO training scripts/configs.
- `gazera/rag/`: Chunking, indexing, retrieval, and citations.
- `gazera/eval/`: Evaluation harness and datasets.
- `index.html`: Public site entry page for this GitHub Pages repo.

## Capability Matrix

| Capability | What it does | Where |
|---|---|---|
| Arabic SFT | QLoRA fine-tuning on Arabic instruction data | `gazera/training/scripts/train_sft.py` |
| Preference tuning | ORPO training for response quality shaping | `gazera/training/scripts/train_orpo.py` |
| Grounded QA | Retrieves relevant chunks and returns citations | `gazera/rag/` + `gazera/serving/api/rag_routes.py` |
| Inference API | Serves `/chat`, `/rag/chat`, `/health` | `gazera/serving/api/` |
| Web experience | Next.js frontend for interacting with the model | `gazera/ui/web/` |
| Evaluation | Task harness for QA and grounding checks | `gazera/eval/` |

## Architecture At A Glance

```text
Data (JSONL + docs)
  -> data/scripts/* (normalize, dedupe, split, validate)
  -> training/scripts/* (SFT / ORPO with QLoRA)
  -> serving/worker/* (Transformers or vLLM engine)
  -> serving/api/* (/chat, /rag/chat)
  -> ui/web/* (Next.js frontend)
```

## Quick Start (Local)

Prerequisites:

- Python 3.11
- Node.js 18+
- Docker (for Qdrant in RAG mode)

```bash
git clone https://github.com/FayezBast/gazera-labs.github.io.git
cd gazera-labs.github.io/gazera

# Python env + deps + dev tooling
make setup

# Optional: create local env config
cp .env.example .env

# Optional: start vector DB for RAG
make rag_up
make ingest_docs

# Start API
make serve

# In a second terminal, start web UI
make ui
```

API docs will be available at `http://localhost:8000/docs`.

## API Examples

Standard chat:

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages":[{"role":"user","content":"Marhaban, arrif binafsak"}],
    "max_tokens":256,
    "temperature":0.2
  }'
```

RAG chat with citations:

```bash
curl -X POST http://localhost:8000/rag/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages":[{"role":"user","content":"What does the sample doc say?"}],
    "max_tokens":256,
    "temperature":0.2
  }'
```

## Training Workflow

```bash
cd gazera

# Supervised fine-tuning (QLoRA)
make train_sft

# Preference optimization
make train_orpo

# Merge adapter with base model
make merge
```

Configs:

- `gazera/training/configs/sft_qwen25_7b_qlora.yaml`
- `gazera/training/configs/orpo_qwen25_7b_qlora.yaml`

## RunPod Workflow

Use the RunPod guide for GPU cloud setup and scripts:

- `gazera/ops/runpod/README.md`
- `gazera/ops/runpod/setup.sh`
- `gazera/ops/runpod/train.sh`

## Repository Map

```text
gazera/
  data/        # datasets, prompts, preprocessing scripts
  training/    # SFT / ORPO training + merge
  rag/         # ingestion, retrieval, citations
  serving/     # API + inference engines
  ui/web/      # Next.js frontend
  eval/        # eval harness and datasets
  docs/        # roadmap, vision, model card, policy
```

## Safety And Public Repo Hygiene

- Keep secrets in local env files only (`.env`, `.env.*` are ignored).
- Use template files for sharing config (`.env.example`, `.env.runpod.example`).
- Do not commit credentials, private keys, or infrastructure state.

## Documentation

- Core technical README: `gazera/README.md`
- Vision: `gazera/docs/vision.md`
- Roadmap: `gazera/docs/roadmap.md`
- Model card: `gazera/docs/model_card.md`
- Contributing: `gazera/CONTRIBUTING.md`

## License

Gazera package metadata declares `Apache-2.0` in `gazera/pyproject.toml`.
