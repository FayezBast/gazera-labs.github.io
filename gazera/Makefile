SHELL := /bin/bash
VENV := .venv
PYTHON := $(VENV)/bin/python
PIP := $(VENV)/bin/pip

.PHONY: setup rag_up rag_down ingest_docs train_sft train_orpo merge serve ui eval demo test clean lint format typecheck all-checks help

# Default target
.DEFAULT_GOAL := help

setup:
	@echo "Setting up Gazera development environment..."
	@if command -v uv >/dev/null 2>&1; then \
		uv venv $(VENV); \
		uv pip install -e .[dev]; \
	else \
		python3.11 -m venv $(VENV); \
		$(PIP) install --upgrade pip; \
		$(PIP) install -e .[dev]; \
	fi
	@echo "Installing pre-commit hooks..."
	@if [ -f .pre-commit-config.yaml ]; then \
		$(VENV)/bin/pre-commit install 2>/dev/null || true; \
	fi
	@echo "Setup complete! Activate with: source $(VENV)/bin/activate"

rag_up:
	docker compose -f serving/docker/docker-compose.yml up -d qdrant

rag_down:
	docker compose -f serving/docker/docker-compose.yml down

ingest_docs:
	PYTHONPATH=. $(PYTHON) rag/ingest/ingest_folder.py --input samples/docs --output data/processed/rag_store.jsonl

train_sft:
	PYTHONPATH=. $(PYTHON) training/scripts/train_sft.py --config training/configs/sft_qwen25_7b_qlora.yaml

train_orpo:
	PYTHONPATH=. $(PYTHON) training/scripts/train_orpo.py --config training/configs/orpo_qwen25_7b_qlora.yaml

merge:
	PYTHONPATH=. $(PYTHON) training/scripts/export_merge_lora.py \
		--base_model Qwen/Qwen2.5-7B-Instruct \
		--adapter_path outputs/sft_lora \
		--output_dir outputs/qwen25-7b-gazera-sft

serve:
	PYTHONPATH=. $(PYTHON) -m uvicorn serving.api.main:app --host 0.0.0.0 --port 8000 --reload

serve-prod:
	PYTHONPATH=. $(PYTHON) -m uvicorn serving.api.main:app --host 0.0.0.0 --port 8000 --workers 2

ui:
	cd ui/web && npm install && npm run dev

eval:
	PYTHONPATH=. $(PYTHON) eval/harness/run_eval.py

demo: rag_up
	@echo "Run: make serve (API) and make ui (Web UI)."

test:
	PYTHONPATH=. $(PYTHON) -m pytest -q

test-cov:
	PYTHONPATH=. $(PYTHON) -m pytest --cov=gazera --cov-report=html --cov-report=term-missing

lint:
	@echo "Running ruff linter..."
	$(VENV)/bin/ruff check . --fix || true

format:
	@echo "Formatting code with black..."
	$(VENV)/bin/black . || true
	@echo "Sorting imports with ruff..."
	$(VENV)/bin/ruff check . --select I --fix || true

typecheck:
	@echo "Running mypy type checker..."
	$(VENV)/bin/mypy gazera --ignore-missing-imports || true

all-checks: format lint typecheck test
	@echo "All checks completed!"

clean:
	rm -rf $(VENV)
	rm -rf __pycache__ **/__pycache__ **/**/__pycache__
	rm -rf .pytest_cache .mypy_cache .ruff_cache
	rm -rf *.egg-info
	rm -rf .coverage htmlcov/
	find . -name "*.pyc" -delete
	find . -name "*.pyo" -delete

help:
	@echo "Gazera Makefile Commands:"
	@echo "  setup       - Create virtual environment and install dependencies"
	@echo "  rag_up      - Start Qdrant vector database"
	@echo "  rag_down    - Stop Qdrant vector database"
	@echo "  ingest_docs - Ingest documents for RAG"
	@echo "  train_sft   - Train SFT model with QLoRA"
	@echo "  train_orpo  - Train ORPO model with QLoRA"
	@echo "  merge       - Merge LoRA adapters with base model"
	@echo "  serve       - Start API server (dev mode)"
	@echo "  serve-prod  - Start API server (production mode)"
	@echo "  ui          - Start web UI"
	@echo "  eval        - Run evaluation harness"
	@echo "  test        - Run tests"
	@echo "  test-cov    - Run tests with coverage"
	@echo "  lint        - Run linter"
	@echo "  format      - Format code"
	@echo "  typecheck   - Run type checker"
	@echo "  all-checks  - Run format, lint, typecheck, and tests"
	@echo "  clean       - Remove build artifacts"
	@echo "  help        - Show this help message"
