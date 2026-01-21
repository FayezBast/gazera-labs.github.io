# Contributing to Gazera

Thank you for considering contributing to Gazera! This document provides guidelines for contributing to the project.

## Getting Started

1. **Fork the repository** and clone it locally
2. **Set up your development environment**:
   ```bash
   cd gazera
   make setup
   ```
3. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Guidelines

### Code Style

- Follow PEP 8 style guidelines for Python code
- Use type hints for all function parameters and return values
- Add docstrings to all public functions and classes
- Keep functions focused and single-purpose
- Maximum line length: 120 characters

### Code Quality Tools

We use the following tools to maintain code quality:

```bash
# Format code
black gazera/

# Lint code
ruff check gazera/

# Type check
mypy gazera/

# Run tests
make test
```

### Commit Messages

- Use clear, descriptive commit messages
- Start with a verb in present tense (e.g., "Add", "Fix", "Update")
- Reference issue numbers when applicable (e.g., "Fix #123")
- Keep the first line under 72 characters

Example:
```
Add Arabic text normalization for preprocessing

- Implement Unicode normalization
- Add diacritic removal option
- Update tests for new functionality
```

### Testing

- Write tests for new functionality
- Ensure all existing tests pass before submitting a PR
- Aim for meaningful test coverage of core logic
- Place tests in the `tests/` directory

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_chunk_arabic.py

# Run with coverage
pytest --cov=gazera
```

## Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Add/update tests** to cover your changes
3. **Run the test suite** and ensure all tests pass
4. **Update the README.md** if needed for new features
5. **Submit your PR** with a clear description of changes

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] All tests pass
```

## Areas to Contribute

### Priority Areas

1. **Arabic NLP improvements**
   - Better tokenization
   - Improved text chunking
   - Diacritic handling

2. **RAG enhancements**
   - Better retrieval algorithms
   - Citation extraction improvements
   - Multi-document synthesis

3. **Training optimizations**
   - Memory efficiency
   - Training speed improvements
   - Hyperparameter tuning

4. **Evaluation**
   - New evaluation datasets
   - Better metrics
   - Automated benchmarking

5. **Documentation**
   - Usage examples
   - API documentation
   - Tutorials

### Good First Issues

Look for issues labeled `good-first-issue` in the issue tracker for beginner-friendly contributions.

## Data Contributions

If contributing datasets or training data:

- Ensure you have rights to share the data
- Follow the data format in `data/datasets/`
- Run validation: `python data/scripts/validate_dataset.py --input your_data.jsonl`
- Document data sources and licenses
- Remove any sensitive or personal information

## Reporting Issues

### Bug Reports

Include:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Python version, CUDA version)
- Error messages and stack traces

### Feature Requests

Include:
- Clear use case description
- How it benefits the project
- Potential implementation approach (if you have ideas)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect differing viewpoints and experiences

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

## Questions?

Feel free to:
- Open an issue for general questions
- Join discussions in existing issues
- Reach out to maintainers

## License

By contributing to Gazera, you agree that your contributions will be licensed under the Apache 2.0 License.

---

Thank you for helping make Gazera better! 🚀
