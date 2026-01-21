from __future__ import annotations

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from serving.api.chat_routes import router as chat_router
from serving.api.rag_routes import router as rag_router
from serving.worker import get_engine

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Gazera API",
    description="Arabic-first LLM API with RAG support",
    version="0.1.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
app.include_router(rag_router, prefix="/rag")


@app.on_event("startup")
def startup() -> None:
    """Initialize inference engine on startup."""
    try:
        logger.info("Starting Gazera API...")
        app.state.engine = get_engine()
        logger.info("Gazera API started successfully")
    except Exception as e:
        logger.error(f"Failed to start API: {e}")
        raise


@app.get("/health")
def health() -> dict:
    """Health check endpoint."""
    return {"status": "ok", "service": "gazera-api"}
