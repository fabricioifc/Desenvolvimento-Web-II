# Usa a versão leve do Python (Slim)
FROM python:3.9-slim
# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Instala as dependências necessárias
RUN apt update && apt install -y net-tools bash

# Copia os arquivos necessários para o contêiner
COPY . .
# Instala as dependências necessárias (usa --no-cache para evitar arquivos desnecessários)
RUN pip install --no-cache-dir -r requirements.txt
# Comando para iniciar a aplicação usando Gunicorn
CMD ["sh", "-c", "gunicorn --workers 2 --bind 0.0.0.0:${PORT:-5000} app:app"]