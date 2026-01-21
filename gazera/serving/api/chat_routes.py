from __future__ import annotations

from fastapi import APIRouter, Request

from serving.api.schemas import ChatRequest, ChatResponse

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: Request, payload: ChatRequest) -> ChatResponse:
    engine = request.app.state.engine
    answer = engine.generate(
        [m.model_dump() for m in payload.messages],
        max_tokens=payload.max_tokens,
        temperature=payload.temperature,
    )
    return ChatResponse(answer=answer)
