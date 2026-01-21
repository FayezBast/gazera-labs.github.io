from __future__ import annotations

import os
from pathlib import Path
from typing import List

from fastapi import APIRouter, Request

from rag.citations.cite import build_citations
from rag.retriever.retrieve import retrieve
from serving.api.schemas import ChatRequest, ChatResponse

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parents[2]
SYSTEM_RAG_PATH = BASE_DIR / "data" / "prompts" / "system_rag.txt"


def load_system_prompt() -> str:
    return SYSTEM_RAG_PATH.read_text(encoding="utf-8")


def build_context(chunks: List[dict]) -> str:
    lines = ["SOURCES:"]
    for chunk in chunks:
        lines.append(f"[{chunk.get('title')}::{chunk.get('chunk_id')}]\n{chunk.get('text')}")
    return "\n\n".join(lines)


@router.post("/chat", response_model=ChatResponse)
def rag_chat(request: Request, payload: ChatRequest) -> ChatResponse:
    qdrant_url = os.getenv("QDRANT_URL", "http://localhost:6333")
    embed_model = os.getenv("EMBED_MODEL", "intfloat/multilingual-e5-large")

    user_text = payload.messages[-1].content
    chunks = retrieve(user_text, embed_model, qdrant_url, top_k=8)
    citations = build_citations(chunks)

    system_prompt = load_system_prompt()
    context = build_context(chunks)
    messages = [
        {"role": "system", "content": system_prompt + "\n\n" + context},
    ] + [m.model_dump() for m in payload.messages]

    engine = request.app.state.engine
    answer = engine.generate(messages, max_tokens=payload.max_tokens, temperature=payload.temperature)

    return ChatResponse(answer=answer, citations=citations)
