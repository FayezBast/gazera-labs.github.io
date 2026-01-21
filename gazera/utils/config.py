"""Configuration management for Gazera."""
from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path
from typing import Optional


@dataclass
class Config:
    """Global configuration for Gazera."""
    
    # Model settings
    model_path: str
    merged_model_path: Optional[str]
    adapter_path: Optional[str]
    
    # RAG settings
    qdrant_url: str
    embed_model: str
    
    # API settings
    api_url: str
    api_host: str
    api_port: int
    
    # Paths
    data_dir: Path
    output_dir: Path
    log_dir: Path
    
    @classmethod
    def from_env(cls) -> Config:
        """Load configuration from environment variables."""
        return cls(
            # Model settings
            model_path=os.getenv("MODEL_PATH", "Qwen/Qwen2.5-7B-Instruct"),
            merged_model_path=os.getenv("MERGED_MODEL_PATH"),
            adapter_path=os.getenv("ADAPTER_PATH"),
            
            # RAG settings
            qdrant_url=os.getenv("QDRANT_URL", "http://localhost:6333"),
            embed_model=os.getenv("EMBED_MODEL", "intfloat/multilingual-e5-large"),
            
            # API settings
            api_url=os.getenv("API_URL", "http://localhost:8000"),
            api_host=os.getenv("API_HOST", "0.0.0.0"),
            api_port=int(os.getenv("API_PORT", "8000")),
            
            # Paths
            data_dir=Path(os.getenv("DATA_DIR", "data")),
            output_dir=Path(os.getenv("OUTPUT_DIR", "outputs")),
            log_dir=Path(os.getenv("LOG_DIR", "logs")),
        )
    
    def ensure_dirs(self) -> None:
        """Create directories if they don't exist."""
        self.data_dir.mkdir(parents=True, exist_ok=True)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.log_dir.mkdir(parents=True, exist_ok=True)
