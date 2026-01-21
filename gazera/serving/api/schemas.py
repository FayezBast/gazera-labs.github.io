from __future__ import annotations

from typing import List, Literal, Optional

from pydantic import BaseModel, Field, field_validator


class Message(BaseModel):
    """Chat message with role and content."""
    role: Literal["system", "user", "assistant"] = Field(
        ...,
        description="Role of the message sender"
    )
    content: str = Field(
        ...,
        min_length=1,
        description="Message content"
    )

    @field_validator("content")
    @classmethod
    def content_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("content cannot be empty or whitespace")
        return v


class ChatRequest(BaseModel):
    """Request for chat completion."""
    messages: List[Message] = Field(
        ...,
        min_length=1,
        description="List of chat messages"
    )
    max_tokens: int = Field(
        default=512,
        ge=1,
        le=4096,
        description="Maximum tokens to generate"
    )
    temperature: float = Field(
        default=0.2,
        ge=0.0,
        le=2.0,
        description="Sampling temperature"
    )


class Citation(BaseModel):
    """Citation reference for RAG responses."""
    title: str = Field(..., description="Document title")
    chunk_id: str = Field(..., description="Chunk identifier")
    quote: str = Field(..., description="Quoted text excerpt")


class ChatResponse(BaseModel):
    """Response from chat completion."""
    answer: str = Field(..., description="Generated answer")
    citations: Optional[List[Citation]] = Field(
        default=None,
        description="Optional citations for RAG responses"
    )
