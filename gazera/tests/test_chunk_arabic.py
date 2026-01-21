from rag.ingest.chunk_arabic import chunk_text


def test_chunk_text_size() -> None:
    text = "جملة قصيرة. " * 200
    chunks = chunk_text(text, chunk_size=1200, overlap=200)
    assert len(chunks) >= 1
    assert all(len(chunk) <= 1400 for chunk in chunks)
