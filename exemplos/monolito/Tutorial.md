### **🛠 Atividade Prática: Criando um To-Do List Monolítico**
📌 **Objetivo:** Criar um sistema simples de cadastro de tarefas com funcionalidades de **adicionar, editar, excluir e marcar como concluído**.

#### **👨‍💻 Tecnologias recomendadas (depende do nível dos alunos)**
- **Stack básica:** HTML, CSS, JavaScript (para frontend) + Python (Flask) ou Node.js (Express) para o backend.  
- **Banco de dados:** SQLite (simples e não precisa de configuração extra).  

---

## **📌 Passo 1: Configurar o Ambiente**
Antes de começar, os alunos devem garantir que têm o **Python** instalado. Eles podem verificar isso com:  
```sh
python --version
```
Se Python estiver instalado, deve retornar algo como:  
```
Python 3.x.x
```
Caso contrário, o Python pode ser baixado em: [https://www.python.org/downloads/](https://www.python.org/downloads/).

---

## **📌 Passo 2: Criar um Ambiente Virtual**
É uma boa prática criar um **ambiente virtual** para o projeto. Isso evita conflitos entre bibliotecas.  
Execute os comandos:  
```sh
# Criar um ambiente virtual
python -m venv .venv  

# Ativar o ambiente virtual (Windows)
.venv\Scripts\activate  

# Ativar o ambiente virtual (Linux/Mac)
source .venv/bin/activate  
```
O terminal mostrará algo como `(.venv)` indicando que o ambiente virtual está ativo.

---

## **📌 Passo 3: Instalar as Dependências**
Dentro do ambiente virtual, instale o Flask:  
```sh
pip install flask
```
Opcionalmente, se quiser salvar as dependências em um arquivo `requirements.txt`, use:  
```sh
pip freeze > requirements.txt
```
E para instalar a partir dele em outro ambiente:  
```sh
pip install -r requirements.txt
```

---

## **📌 Passo 4: Criar o Banco de Dados**
Crie um script para definir a estrutura do banco.  
Crie o arquivo `init_db.py` e adicione:  
```python
import sqlite3

con = sqlite3.connect("database.db")
cur = con.cursor()
cur.execute("""
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    completed INTEGER DEFAULT 0
)
""")
con.commit()
con.close()

print("Banco de dados criado com sucesso!")
```
Agora execute:  
```sh
python init_db.py
```
Isso criará um arquivo `database.db` com a tabela `tasks`.

---

## **📌 Passo 5: Criar a Aplicação Flask**
Agora, crie o arquivo `app.py` com o seguinte código:

```python
from flask import Flask, render_template, request, redirect
import socket, os

app = Flask(__name__)

import sqlite3

def connect_db():
    return sqlite3.connect("database.db")

@app.route('/oi')
def hello():
    hostname = socket.gethostname()
    port = os.environ.get('PORT', '5000')  # Pega a porta do ambiente ou usa 5000 como padrão
    return f"Hello from {hostname} on port {port}!\n"

@app.route('/')
def index():
    con = connect_db()
    cur = con.cursor()
    cur.execute("SELECT * FROM tasks")
    tasks = cur.fetchall()
    con.close()
    return render_template("index.html", tasks=tasks)

@app.route('/add', methods=['POST'])
def add_task():
    task = request.form['task']
    con = connect_db()
    cur = con.cursor()
    cur.execute("INSERT INTO tasks (task, completed) VALUES (?, ?)", (task, 0))
    con.commit()
    con.close()
    return redirect('/')

@app.route('/delete/<int:id>')
def delete_task(id):
    con = connect_db()
    cur = con.cursor()
    cur.execute("DELETE FROM tasks WHERE id=?", (id,))
    con.commit()
    con.close()
    return redirect('/')

@app.route('/complete/<int:id>')
def complete_task(id):
    con = connect_db()
    cur = con.cursor()
    cur.execute("UPDATE tasks SET completed = 1 WHERE id=?", (id,))
    con.commit()
    con.close()
    return redirect('/')

if __name__ == "__main__":
    app.run(debug=True)
```
Esse código cria uma API simples com as seguintes rotas:
- `/` → Exibe a lista de tarefas.
- `/add` → Adiciona uma nova tarefa.
- `/delete/<id>` → Exclui uma tarefa.
- `/complete/<id>` → Marca uma tarefa como concluída.

---

## **📌 Passo 6: Criar o Frontend**
Crie uma pasta chamada `templates` e dentro dela um arquivo `index.html`:

```html
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Tarefas</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: auto; text-align: center; }
        ul { list-style: none; padding: 0; }
        li { padding: 10px; border: 1px solid #ddd; margin: 5px 0; display: flex; justify-content: space-between; }
        .completed { text-decoration: line-through; color: gray; }
    </style>
</head>
<body>
    <h1>Lista de Tarefas</h1>
    <form action="/add" method="POST">
        <input type="text" name="task" required>
        <button type="submit">Adicionar</button>
    </form>
    <ul>
        {% for task in tasks %}
            <li class="{% if task[2] == 1 %}completed{% endif %}">
                {{ task[1] }}  
                <a href="/complete/{{ task[0] }}">✔️</a>
                <a href="/delete/{{ task[0] }}">❌</a>
            </li>
        {% endfor %}
    </ul>
</body>
</html>
```
Esse frontend:\
✅ Exibe as tarefas  
✅ Permite adicionar novas  
✅ Permite marcar como concluídas  
✅ Permite excluir  

---

## **📌 Passo 7: Executar a Aplicação**
Para rodar o servidor Flask, execute:  
```sh
python app.py
```
Agora acesse no navegador:  
👉 `http://127.0.0.1:5000/`  

---

Para escalar sua aplicação Flask monolítica, você pode adotar estratégias que melhorem o desempenho e permitam que mais usuários acessem simultaneamente. Vou dividir as soluções em **escalabilidade vertical** e **escalabilidade horizontal**, além de outras otimizações.  

---

# **1️⃣ Escalabilidade Vertical (Aumentar Recursos do Servidor)**
A escalabilidade **vertical** significa **melhorar o servidor** onde sua aplicação está rodando. Isso inclui:  
✅ **Usar um servidor mais potente** (mais CPU, RAM)  
✅ **Usar um banco de dados externo** (ex: PostgreSQL no RDS da AWS)  
✅ **Configurar um WSGI mais eficiente**, como **Gunicorn**  

### **🔧 Usando Gunicorn**

WSGI (Web Server Gateway Interface) é um padrão para servidores web e aplicações Python se comunicarem. **Gunicorn** é um servidor WSGI que pode melhorar a performance do Flask. Usar o Gunicorn traz os seguintes benefícios:

✅ Diferente do servidor de desenvolvimento do Flask, que processa apenas uma requisição por vez, o Gunicorn pode lidar com várias conexões simultâneas, tornando a aplicação mais eficiente.\
✅ O Gunicorn pode ser executado atrás de um proxy reverso como o Nginx ou Apache, que pode servir arquivos estáticos e lidar com tarefas de balanceamento de carga.

Em produção, ao invés de rodar `python app.py`, use **Gunicorn** para melhorar a performance:  
```sh
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```
Isso inicia 4 "workers", permitindo que várias requisições sejam processadas ao mesmo tempo.

✅ Se houver mais de 4 requisições simultâneas, elas entram na fila e esperam um worker ficar disponível.\
✅ Se o servidor tiver mais CPU/RAM, você pode aumentar o número de workers.\
✅ Se o número de requisições for muito alto e os workers demorarem para processar, a fila pode ficar sobrecarregada, causando lentidão ou erros 502/504 (Bad Gateway, Timeout).\
✅ O Nginx pode ajudar a gerenciar conexões e servir arquivos estáticos, reduzindo a carga do Gunicorn.

Se a aplicação faz muitas operações de entrada e saída (consultas SQL, chamadas HTTP externas), aumentar os workers melhora o desempenho. Fórmula Geral: **2 × CPUs + 1** (ex: 4 CPUs → 9 workers).

---

# **2️⃣ Escalabilidade Horizontal (Múltiplas Instâncias)**
A escalabilidade **horizontal** significa rodar várias cópias da aplicação para distribuir o tráfego.

### **🔧 Usando Load Balancer**
Se o tráfego aumentar, você pode rodar **múltiplas instâncias** e usar um **Load Balancer** para distribuir as requisições.  

🔹 No **Railway, Render ou Heroku**, basta aumentar as "instâncias" na configuração do serviço.  
🔹 Se estiver em um **VPS (AWS, DigitalOcean, Brdrive)**, pode usar o **NGINX** como proxy reverso.

Exemplo de configuração NGINX para distribuir o tráfego entre 2 instâncias Flask:

```nginx
upstream flask_app {
    server 127.0.0.1:5000;
    server 127.0.0.1:5001;
}

server {
    listen 80;
    location / {
        proxy_pass http://flask_app;
    }
}
```
Isso envia requisições para múltiplas instâncias Flask rodando nas portas **5000** e **5001**.

---

# **3️⃣ Usando Containers (Docker e Kubernetes)**
Outra maneira de escalar é usar **Docker** e **Kubernetes** para gerenciar múltiplas réplicas.

### **🔧 Criando um Dockerfile**
Crie um arquivo `Dockerfile` na raiz do projeto:  
```dockerfile
# Usa a versão leve do Python (Alpine)
FROM python:3.9-alpine
# Define o diretório de trabalho dentro do contêiner
WORKDIR /app
# Copia os arquivos necessários para o contêiner
COPY . .
# Instala as dependências necessárias (usa --no-cache para evitar arquivos desnecessários)
RUN pip install --no-cache-dir -r requirements.txt
# Expõe a porta 5000 para acesso externo
EXPOSE 5000
# Comando para iniciar a aplicação usando Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```
Agora, **crie e rode o container**:  
```sh
docker build -t flask-app .
docker run -p 5000:5000 flask-app
```
Se quiser escalar com **Kubernetes**, pode usar `kubectl scale` para rodar **múltiplas cópias** do container.

---

# **4️⃣ Banco de Dados Externo**
Usar **SQLite** em produção não é recomendado. Para escalar, use um banco como:  
✅ **PostgreSQL** (ex: AWS RDS, Supabase, Railway, Render)  
✅ **MySQL** (ex: PlanetScale)  

### **🔧 Exemplo de Conexão PostgreSQL**
1️⃣ Instale o driver:  
```sh
pip install psycopg2
```
2️⃣ Atualize `connect_db()` no `app.py`:  
```python
import psycopg2
def connect_db():
    return psycopg2.connect(
        dbname="meubanco",
        user="usuario",
        password="senha",
        host="servidor.externo.com",
        port=5432
    )
```
Isso melhora a escalabilidade, pois várias instâncias Flask podem acessar o mesmo banco.

---

# **5️⃣ Cache para Melhorar Performance**
Usar um **cache** evita que consultas repetidas sobrecarreguem o banco.

✅ **Redis**: Ótimo para armazenar resultados de consultas frequentes.  
✅ **Memcached**: Boa opção para melhorar tempos de resposta.  

### **🔧 Usando Redis**
Instale a biblioteca Python:
```sh
pip install redis
```
No `app.py`, adicione um cache:
```python
import redis
cache = redis.Redis(host='localhost', port=6379, db=0)

@app.route('/')
def index():
    tasks = cache.get('tasks')
    if not tasks:
        con = connect_db()
        cur = con.cursor()
        cur.execute("SELECT * FROM tasks")
        tasks = cur.fetchall()
        con.close()
        cache.set('tasks', str(tasks), ex=30)  # Expira em 30s
    return render_template("index.html", tasks=eval(tasks))
```
Isso reduz a carga no banco de dados.

---

# **6️⃣ Otimizações de Código**

Vamos fazer mudanças para testar a escalabilidade da aplicação.

### Database Init

Vamos fazer uma alteração no script `init_db.py` para criar o banco de dados em um diretório separado. Criamos um diretório `data` e alteramos o script para criar o banco de dados em `data/database.db`.

```sh
mkdir data
```

```python
import sqlite3

con = sqlite3.connect("data/database.db")
cur = con.cursor()
cur.execute("""
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    completed INTEGER DEFAULT 0
)
""")
con.commit()
con.close()

print("Banco de dados criado com sucesso!")
```

Em seguida, vamos alterar o `app.py` para conectar ao banco de dados no diretório `data`. Além disso, vamos adicionar um log para cada requisição recebida. Isso nos ajudará a identificar o servidor que está processando a requisição.

### app.py
```python
from flask import Flask, render_template, request, redirect
import socket
import os
import logging
import sqlite3

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.before_request
def log_request_info():
    hostname = socket.gethostname()
    port = os.environ.get('PORT', '5000')  # Pega a porta do ambiente ou usa 5000 como padrão
    logger.info(f"Requisição recebida em {hostname} na porta {port}")

def connect_db():
    # return sqlite3.connect("database.db")
    db_path = '/app/db/database.db'
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/env')
def env():
    return str(os.environ)

@app.route('/oi')
def hello():
    hostname = socket.gethostname()
    port = os.environ.get('PORT', '5000')  # Pega a porta do ambiente ou usa 5000 como padrão
    logger.info(f"Requisição recebida em {hostname} na porta {port}")
    return f"Hello from {hostname} on port {port}!\n"

@app.route('/')
def index():
    con = connect_db()
    cur = con.cursor()
    cur.execute("SELECT * FROM tasks")
    tasks = cur.fetchall()
    con.close()
    return render_template("index.html", tasks=tasks)

@app.route('/add', methods=['POST'])
def add_task():
    task = request.form['task']
    con = connect_db()
    cur = con.cursor()
    cur.execute("INSERT INTO tasks (task, completed) VALUES (?, ?)", (task, 0))
    con.commit()
    con.close()
    return redirect('/')

@app.route('/delete/<int:id>')
def delete_task(id):
    con = connect_db()
    cur = con.cursor()
    cur.execute("DELETE FROM tasks WHERE id=?", (id,))
    con.commit()
    con.close()
    return redirect('/')

@app.route('/complete/<int:id>')
def complete_task(id):
    con = connect_db()
    cur = con.cursor()
    cur.execute("UPDATE tasks SET completed = 1 WHERE id=?", (id,))
    con.commit()
    con.close()
    return redirect('/')

if __name__ == "__main__":
    app.run(debug=True)
```

### Nginx

Vamos adicionar um servidor de backup ao nosso cluster. Para isso, vamos usar o **Busybox** como um servidor HTTP simples. O **Busybox** é uma imagem leve que contém várias ferramentas comuns do Linux. Vamos usar o **httpd** do Busybox para servir arquivos estáticos.

```nginx
# Define o usuário sob o qual o Nginx será executado. 'nginx' é um usuário comum criado para rodar o serviço de forma segura,
# evitando que ele execute como root e reduzindo riscos de segurança.
user nginx;

# Define o número de processos trabalhadores. 'auto' permite que o Nginx determine automaticamente o número ideal baseado
# na quantidade de núcleos de CPU disponíveis, otimizando o desempenho.
worker_processes auto;

# Especifica o caminho do arquivo de log de erros e o nível de severidade. 'warn' significa que apenas mensagens de aviso
# ou mais graves serão registradas, ajudando a monitorar problemas sem sobrecarregar o log com informações triviais.
# Outros níveis possíveis são 'info' e 'error'. O log de erros é útil para diagnosticar problemas no servidor.
error_log /var/log/nginx/error.log warn;

# Define o local do arquivo PID, que armazena o ID do processo principal do Nginx. Isso é útil para gerenciar o serviço
# (ex.: parar ou reiniciar o servidor).
pid /var/run/nginx.pid;

# Bloco 'events' configura como o Nginx lida com conexões de rede.
events {
    # Define o número máximo de conexões simultâneas que cada processo trabalhador pode gerenciar. 1024 é um valor padrão
    # razoável, mas pode ser ajustado conforme a carga esperada e os recursos do servidor.
    worker_connections 1024;
}

# Bloco 'http' contém configurações globais para o protocolo HTTP.
http {
    # Inclui um arquivo externo que mapeia extensões de arquivo (ex.: .html, .jpg) para tipos MIME, permitindo que o Nginx
    # informe corretamente aos navegadores como interpretar os arquivos enviados.
    include /etc/nginx/mime.types;

    # Define o tipo MIME padrão para arquivos cuja extensão não está mapeada no mime.types. 'application/octet-stream'
    # indica um fluxo genérico de bytes, deixando a interpretação para o cliente.
    default_type application/octet-stream;

    # Ativa o uso de 'sendfile', uma chamada de sistema eficiente para transferir arquivos diretamente do disco para a rede,
    # reduzindo a sobrecarga no servidor ao evitar cópias desnecessárias na memória.
    sendfile on;

    # Define o tempo (em segundos) que uma conexão persistente (keep-alive) será mantida aberta. 65 segundos é um valor
    # equilibrado que melhora a performance ao reutilizar conexões, mas evita desperdício de recursos.
    keepalive_timeout 65;

    # Define um grupo de servidores upstream (backend) chamado 'flask_app'. O Nginx usará esses servidores para balancear
    # a carga das requisições recebidas.
    upstream flask_app {
        # Servidor primário na porta 5000. 'max_fails=3' significa que após 3 falhas consecutivas, o servidor será considerado
        # indisponível por 'fail_timeout=30s' (30 segundos), permitindo tolerância a falhas temporárias.
        server app1:5000 max_fails=3 fail_timeout=30s;

        # Segundo servidor primário, na porta 5001, com as mesmas regras de tolerância a falhas. O Nginx distribuirá as
        # requisições entre app1 e app2 usando um algoritmo de balanceamento (padrão é round-robin).
        server app2:5001 max_fails=3 fail_timeout=30s;

        # Servidor de backup, na porta 3000. Só será usado se os servidores primários (app1 e app2) estiverem indisponíveis,
        # funcionando como uma camada extra de resiliência.
        server app3:3000 backup;
    }

    # Bloco 'server' define um servidor virtual que lida com requisições HTTP.
    server {
        # O Nginx escuta na porta 80, que é a porta padrão para HTTP, permitindo que o servidor responda a requisições web.
        listen 80;

        # Define o nome do servidor. '_' é um curinga que faz o servidor aceitar requisições para qualquer domínio,
        # funcionando como um servidor padrão (catch-all).
        server_name _;

        # Bloco 'location' especifica como lidar com requisições para a raiz ('/') do site.
        location / {
            # Encaminha as requisições para o grupo upstream 'flask_app', efetivamente delegando o processamento para os
            # servidores backend definidos acima (app1, app2 ou app3).
            proxy_pass http://flask_app;

            # Define cabeçalhos HTTP enviados ao backend para preservar informações do cliente:
            # 'Host' mantém o domínio original da requisição.
            proxy_set_header Host $host;

            # 'X-Real-IP' envia o IP real do cliente ao backend.
            proxy_set_header X-Real-IP $remote_addr;

            # 'X-Forwarded-For' adiciona o IP do cliente à lista de proxies pelos quais a requisição passou.
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            # 'X-Forwarded-Proto' informa o protocolo original (http ou https), útil em cenários com HTTPS no frontend.
            proxy_set_header X-Forwarded-Proto $scheme;

            # Define o tempo máximo (em segundos) para estabelecer a conexão com o backend. 10 segundos é um valor baixo,
            # indicando que o backend deve responder rapidamente ou a requisição falhará.
            proxy_connect_timeout 10;

            # Limita o tempo para enviar dados ao backend. Ajuda a evitar travamentos se o backend estiver lento.
            proxy_send_timeout 10;

            # Limita o tempo para receber uma resposta do backend. Garante que requisições lentas sejam encerradas.
            proxy_read_timeout 10;

            # Define o tamanho máximo do corpo da requisição (ex.: uploads). '10M' (10 megabytes) restringe o tamanho dos
            # dados enviados pelo cliente, protegendo contra abusos.
            client_max_body_size 10M;
        }
    }
}
```

> **Artigo**: [Tune nginx performance](https://medium.com/@tynwthpq/tune-nginx-performance-fbba6a7f4a25)

### Docker Compose

Vamos usar o **Docker Compose** para gerenciar os containers. O Docker Compose é uma ferramenta que permite definir e executar aplicativos Docker multi-container. Ele usa um arquivo YAML para configurar os serviços, volumes e redes. No arquivo `docker-compose.yml`, definimos os serviços `app1`, `app2`, `app3` e `nginx`.

```yaml
services:
  app1:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: app1
    environment:
      - PORT=5000
    volumes:
      - ./data:/app/db  # Monta ./data do host em /app/db no container

  app2:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: app2
    environment:
      - PORT=5001
    volumes:
      - ./data:/app/db  # Monta ./data do host em /app/db no container

  app3:
    image: busybox:latest
    container_name: app3
    volumes:
      - ./backup:/var/www  # Monta o diretório app3 como raiz do servidor
    command: ["httpd", "-f", "-p", "3000", "-h", "/var/www"]  # Inicia o httpd na porta 3000

  nginx:
    image: nginx:latest
    container_name: nginx
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    ports:
      - "80:80" # Mapeia a porta 80 do host para a porta 80 do container
    depends_on:
      - app1
      - app2
      - app3
```

**Detalhes**:
- **app1** e **app2** são instâncias do Flask rodando na porta 5000 e 5001, respectivamente.
- **app3** é um servidor de backup usando o Busybox para servir arquivos estáticos na porta 3000.
- **nginx** é o servidor Nginx que balanceia a carga entre app1, app2 e app3.
- O volume `./data` é montado em `/app/db` nos containers app1 e app2 para persistir o banco de dados.
- O volume `./backup` é montado em `/var/www` no container app3 para servir arquivos estáticos.
- O volume `./nginx/nginx.conf` é montado em `/etc/nginx/nginx.conf` no container nginx para configurar o Nginx.
- O Nginx depende dos serviços app1, app2 e app3, garantindo que eles sejam iniciados primeiro.
- O Nginx escuta na porta 80 e encaminha as requisições para os servidores backend.
- Para usar `https`, adicione um certificado SSL e configure o Nginx para redirecionar o tráfego seguro.

### Dockerfile
```dockerfile
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
```

### Comandos
```sh
docker ps
docker compose ps
docker compose up -d --build
docker compose down
docker compose logs -f app1
docker compose logs -f app2
docker compose logs -f nginx
docker exec -it app1 bash -c "netstat -tuln | grep 5000"
docker exec -it app2 bash -c "netstat -tuln | grep 5001"
curl http://localhost/oi
for i in {1..10}; do curl http://localhost/oi; done
```

### Para parar um container 

```sh
docker stop app1
docker stop app2
# assim testamos o backup
```