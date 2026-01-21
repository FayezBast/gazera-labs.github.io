FROM python:3.11-slim

WORKDIR /app
COPY pyproject.toml /app/pyproject.toml
RUN pip install --no-cache-dir --upgrade pip && pip install --no-cache-dir .

COPY . /app
ENV PYTHONUNBUFFERED=1
CMD ["python", "-m", "uvicorn", "serving.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
