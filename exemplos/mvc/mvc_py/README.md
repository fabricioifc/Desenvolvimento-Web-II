## MVC com Python

Para criar o ambiente virtual e instalar as dependências, siga os passos abaixo:

```bash
python -m venv .venv
source .venv/bin/activate
pip install pytest pytest-cov
```

Para rodar o exemplo, basta ter o Python instalado e executar o arquivo `main.py`:

```python
python main.py
```

Para rodar os testes unitários com pytest e gerar o relatório de cobertura, use o seguinte comando:

```bash
python -m pytest --cov=.
```