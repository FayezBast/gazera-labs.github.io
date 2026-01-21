from data.scripts.validate_dataset import validate_row


def test_validate_row_ok() -> None:
    row = {
        "messages": [
            {"role": "system", "content": "أنت مساعد."},
            {"role": "user", "content": "ما هي عاصمة مصر؟"},
            {"role": "assistant", "content": "القاهرة"},
        ]
    }
    errors = validate_row(row, max_chars=2000)
    assert errors == []


def test_validate_row_missing_arabic() -> None:
    row = {
        "messages": [
            {"role": "user", "content": "Hello"},
            {"role": "assistant", "content": "Hi"},
        ]
    }
    errors = validate_row(row, max_chars=2000)
    assert "no_arabic" in errors
