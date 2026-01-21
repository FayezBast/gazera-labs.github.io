#!/bin/bash
# Gazera Training Launch Script for RunPod
# Usage: ./train.sh [sft|orpo]

set -e

TRAINING_TYPE=${1:-sft}

cd /workspace/gazera

# Load environment
export $(cat .env | grep -v '^#' | xargs)

echo "============================================="
echo "  Starting Gazera Training ($TRAINING_TYPE)"
echo "============================================="
echo "GPU: $(nvidia-smi --query-gpu=name --format=csv,noheader)"
echo "CUDA: $(nvcc --version | grep release | awk '{print $5}' | cut -d',' -f1)"
echo "============================================="

# Check if training data exists
if [ "$TRAINING_TYPE" == "sft" ]; then
    DATA_FILE="data/datasets/train.jsonl"
    CONFIG_FILE="training/configs/sft_qwen25_7b_qlora.yaml"
elif [ "$TRAINING_TYPE" == "orpo" ]; then
    DATA_FILE="data/datasets/orpo_train.jsonl"
    CONFIG_FILE="training/configs/orpo_qwen25_7b_qlora.yaml"
else
    echo "❌ Unknown training type: $TRAINING_TYPE"
    echo "Usage: ./train.sh [sft|orpo]"
    exit 1
fi

if [ ! -f "$DATA_FILE" ]; then
    echo "❌ Training data not found: $DATA_FILE"
    echo "Please upload your training data first."
    exit 1
fi

echo "📊 Training data: $DATA_FILE"
echo "⚙️  Config: $CONFIG_FILE"
echo ""

# Start training
if [ "$TRAINING_TYPE" == "sft" ]; then
    echo "🚀 Starting SFT training..."
    PYTHONPATH=. python training/scripts/train_sft.py --config $CONFIG_FILE
else
    echo "🚀 Starting ORPO training..."
    PYTHONPATH=. python training/scripts/train_orpo.py --config $CONFIG_FILE
fi

echo ""
echo "============================================="
echo "  ✅ Training Complete!"
echo "============================================="
echo ""
echo "Adapter saved to: outputs/${TRAINING_TYPE}_lora"
echo ""
echo "Next steps:"
echo "  1. Merge adapter: make merge"
echo "  2. Test inference: make serve"
echo ""
