# Running Gazera on RunPod

## Quick Start

### 1. Create a RunPod Instance

1. Go to [runpod.io](https://runpod.io)
2. Click **GPU Cloud** → **Deploy**
3. Select a GPU:
   - **RTX 4090** (24GB) - Good for 7B models with QLoRA
   - **A100 40GB** - Best for faster training
   - **A6000** (48GB) - Good balance of cost/performance
4. Choose template: **RunPod Pytorch 2.1** (or any with CUDA 12.x)
5. Set disk size: **50GB+** for model caching

### 2. Setup (Run Once)

SSH into your pod or use the web terminal:

```bash
# Download and run setup
cd /workspace
git clone https://github.com/YOUR_USERNAME/gazera-labs.github.io.git repo
cd repo/gazera
chmod +x ops/runpod/*.sh
./ops/runpod/setup.sh
```

### 3. Upload Your Training Data

Your training data should be in JSONL format:

```json
{"messages": [{"role": "system", "content": "..."}, {"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]}
```

Upload to `/workspace/gazera/data/datasets/train.jsonl`

**Options to upload:**
- Use RunPod's file browser
- `wget` or `curl` from a URL
- `scp` from your local machine
- Mount a network volume

### 4. Start Training

```bash
cd /workspace/gazera

# SFT Training (default)
./ops/runpod/train.sh sft

# OR ORPO Training
./ops/runpod/train.sh orpo

# OR use make commands
make train_sft
make train_orpo
```

### 5. Monitor Training

Training logs appear in the terminal. For long training runs:

```bash
# Run in background with nohup
nohup ./ops/runpod/train.sh sft > training.log 2>&1 &

# Monitor logs
tail -f training.log

# Check GPU usage
watch -n 1 nvidia-smi
```

### 6. After Training

```bash
# Merge LoRA adapter with base model
make merge

# Test the model
make serve
# Then visit: https://YOUR_POD_ID-8000.proxy.runpod.net/docs
```

## Training Configurations

Edit configs in `training/configs/`:

### SFT Config (`sft_qwen25_7b_qlora.yaml`)
```yaml
base_model: Qwen/Qwen2.5-7B-Instruct
train_file: data/datasets/train.jsonl
eval_file: data/datasets/dev.jsonl
output_dir: outputs/sft_lora
max_seq_length: 2048
per_device_train_batch_size: 1
gradient_accumulation_steps: 16
learning_rate: 2.0e-4
num_train_epochs: 1
```

### Adjust for Your GPU

| GPU | Batch Size | Grad Accum | Effective Batch |
|-----|-----------|------------|-----------------|
| RTX 4090 (24GB) | 1 | 16 | 16 |
| A100 40GB | 2 | 8 | 16 |
| A100 80GB | 4 | 4 | 16 |

## Cost Optimization

1. **Use Spot Instances**: 50-70% cheaper, good for training
2. **Stop when not using**: Pause your pod to save money
3. **Use /workspace**: Files persist, no need to re-download
4. **Network Volumes**: For very large datasets

## Common Issues

### Out of Memory (OOM)
- Reduce `max_seq_length` to 1024
- Increase `gradient_accumulation_steps`
- Reduce batch size to 1

### Slow Training
- Check you're using GPU: `nvidia-smi`
- Use `bf16` if available (A100, 4090)
- Enable `gradient_checkpointing: true`

### Model Not Loading
- Check HF_HOME is set: `echo $HF_HOME`
- Ensure enough disk space: `df -h`
- Re-run setup script

## File Locations

```
/workspace/
├── gazera/                 # Main project
│   ├── data/datasets/      # Your training data here
│   ├── outputs/            # Trained adapters
│   │   ├── sft_lora/
│   │   └── orpo_lora/
│   └── training/configs/   # Training configs
└── .cache/huggingface/     # Model cache (persists)
```
