#!/bin/bash
# Gazera RunPod Setup Script
# Run this once when your pod starts

set -e

echo "============================================="
echo "  Gazera Training Environment Setup"
echo "============================================="

# Detect where we are
if [ -f "pyproject.toml" ]; then
    # Already in gazera directory
    GAZERA_DIR=$(pwd)
elif [ -f "gazera/pyproject.toml" ]; then
    # In parent directory
    GAZERA_DIR=$(pwd)/gazera
elif [ -f "/workspace/gazera-labs.github.io/gazera/pyproject.toml" ]; then
    GAZERA_DIR="/workspace/gazera-labs.github.io/gazera"
elif [ -f "/workspace/gazera/pyproject.toml" ]; then
    GAZERA_DIR="/workspace/gazera"
else
    echo "📦 Cloning Gazera repository..."
    cd /workspace
    git clone https://github.com/gazera-labs/gazera-labs.github.io.git repo 2>/dev/null || true
    GAZERA_DIR="/workspace/repo/gazera"
fi

echo "📁 Using Gazera at: $GAZERA_DIR"
cd $GAZERA_DIR

# Install dependencies
echo "📥 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p outputs/sft_lora outputs/orpo_lora outputs/merged
mkdir -p logs
mkdir -p data/processed data/raw

# Set up environment file
if [ ! -f .env ]; then
    echo "⚙️  Creating .env file..."
    cp ops/runpod/.env.runpod.example .env
fi

# Cache the model (optional but recommended)
echo "🤖 Pre-downloading base model (this may take a while)..."
python -c "
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

model_name = 'Qwen/Qwen2.5-7B-Instruct'
print(f'Downloading {model_name}...')
tokenizer = AutoTokenizer.from_pretrained(model_name)
print('Tokenizer downloaded!')
# Model will be downloaded during training with quantization
print('Setup complete! Model will load during training.')
"

echo "============================================="
echo "  ✅ Setup Complete!"
echo "============================================="
echo ""
echo "Next steps:"
echo "  1. Upload your training data to: /workspace/gazera/data/datasets/"
echo "  2. Edit config if needed: training/configs/sft_qwen25_7b_qlora.yaml"
echo "  3. Start training: cd /workspace/gazera && make train_sft"
echo ""
