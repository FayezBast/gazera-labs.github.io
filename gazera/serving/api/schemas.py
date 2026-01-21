from __future__ import annotations

from typing import List, Optional

from pydantic import BaseModel, Field


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]
    max_tokens: int = 512
    temperature: float = 0.2


class Citation(BaseModel):
    title: str
    chunk_id: str
    quote: str


class ChatResponse(BaseModel):
    answer: str
    citations: Optional[List[Citation]] = None
