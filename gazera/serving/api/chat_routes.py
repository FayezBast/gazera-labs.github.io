from __future__ import annotations

import logging

from fastapi import APIRouter, HTTPException, Request

from serving.api.schemas import ChatRequest, ChatResponse

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: Request, payload: ChatRequest) -> ChatResponse:
    """Generate chat completion."""
    try:
        engine = request.app.state.engine
        logger.info(f"Generating response for {len(payload.messages)} messages")
        answer = engine.generate(
            [m.model_dump() for m in payload.messages],
            max_tokens=payload.max_tokens,
            temperature=payload.temperature,
        )
        return ChatResponse(answer=answer)
    except ValueError as e:
        logger.error(f"Invalid request: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Generation failed: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
