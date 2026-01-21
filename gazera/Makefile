SHELL := /bin/bash
VENV := .venv
PYTHON := $(VENV)/bin/python
PIP := $(VENV)/bin/pip

.PHONY: setup rag_up ingest_docs train_sft merge serve ui eval demo test

setup:
	@if command -v uv >/dev/null 2>&1; then \
		uv venv $(VENV); \
		uv pip install -e .[dev]; \
	else \
		python3.11 -m venv $(VENV); \
		$(PIP) install --upgrade pip; \
		$(PIP) install -e .[dev]; \
	fi

rag_up:
	docker compose -f serving/docker/docker-compose.yml up -d qdrant

ingest_docs:
	PYTHONPATH=. $(PYTHON) rag/ingest/ingest_folder.py --input samples/docs --output data/processed/rag_store.jsonl

train_sft:
	PYTHONPATH=. $(PYTHON) training/scripts/train_sft.py --config training/configs/sft_qwen25_7b_qlora.yaml

merge:
	PYTHONPATH=. $(PYTHON) training/scripts/export_merge_lora.py \
		--base_model Qwen/Qwen2.5-7B-Instruct \
		--adapter_path outputs/sft_lora \
		--output_dir outputs/qwen25-7b-gazera-sft

serve:
	PYTHONPATH=. $(PYTHON) -m uvicorn serving.api.main:app --host 0.0.0.0 --port 8000

ui:
	cd ui/web && npm install && npm run dev

eval:
	PYTHONPATH=. $(PYTHON) eval/harness/run_eval.py

demo: rag_up
	@echo "Run: make serve (API) and make ui (Web UI)."


test:
	PYTHONPATH=. $(PYTHON) -m pytest -q
