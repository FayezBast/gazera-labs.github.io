from __future__ import annotations

from fastapi import FastAPI

from serving.api.chat_routes import router as chat_router
from serving.api.rag_routes import router as rag_router
from serving.worker import get_engine

app = FastAPI(title="Gazera API")
app.include_router(chat_router)
app.include_router(rag_router, prefix="/rag")


@app.on_event("startup")
def startup() -> None:
    app.state.engine = get_engine()


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}
