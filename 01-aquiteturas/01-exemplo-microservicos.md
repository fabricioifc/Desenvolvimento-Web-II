## Criando uma aplicação web com Python e Flask (Microservices)

Nesta seção, vamos criar uma aplicação web com Python e Flask para uma lista de tarefas (TODO list). A aplicação web será composta por dois microserviços: um microserviço para gerenciar as tarefas e outro microserviço para gerenciar os usuários.

A estrutura de pastas da aplicação web será a seguinte:

```bash
exemplos/todo-list-ms/
├── services
│   ├── task_service.py
│   └── user_service.py
└── ui
    ├── app.py
    └── templates
        └── index.html
```

Para criar a aplicação web, vamos seguir os seguintes passos:

1. Criar a pasta `todo-list-ms`:

```bash
mkdir -p exemplos/todo-list-ms
cd exemplos/todo-list-ms
```

2. Criar um ambiente virtual para a aplicação web:

```bash
python3 -m venv .venv
```

3. Ativar o ambiente virtual:

```bash
source .venv/bin/activate
```

4. Instalar as dependências:

```bash
pip install flask requests
```

5. Criar as pastas:

```bash
mkdir -p services
mkdir -p ui/templates
```

### 1.1. Criando a camada de apresentação

A camada de apresentação é responsável por apresentar a interface do usuário. Para criar a camada de apresentação, vamos utilizar o framework Flask. O Flask é um framework web minimalista para Python. O Flask fornece ferramentas, bibliotecas e tecnologias que permitem criar aplicações web com Python de forma simples e rápida.

Para criar a camada de apresentação, vamos seguir os seguintes passos:

1. Criar o microserviço da camada de apresentação:

```bash
touch ui/app.py
```

2. Criar o arquivo `ui/templates/index.html`:

```bash
touch ui/templates/index.html
```

3. Implementar o microserviço da camada de apresentação:

```python
# ui/app.py

from flask import Flask, render_template, request, redirect, url_for
import requests

app = Flask(__name__)

@app.route('/')
def index():
    task_service_url = 'http://localhost:5001/tasks'
    tasks = requests.get(task_service_url).json()
    return render_template('index.html', tasks=tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    task_service_url = 'http://localhost:5001/add_task'
    task_description = request.form['task_description']
    requests.post(task_service_url, json={'description': task_description})
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

```html
<!-- templates/index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ToDo List</title>
</head>
<body>
    <h1>ToDo List</h1>
    <ul>
        {% for task in tasks %}
            <li>{{ task.description }} - {{ task.status }}</li>
        {% endfor %}
    </ul>
    <form method="post" action="/add_task">
        <label for="task_description">Nova Tarefa:</label>
        <input type="text" id="task_description" name="task_description" required>
        <button type="submit">Adicionar Tarefa</button>
    </form>
</body>
</html>
```

4. Executar o microserviço da camada de apresentação:

```bash
python ui/app.py
```

5. Acessar o microserviço da camada de apresentação:

```bash
http://localhost:5000
```

### 1.2. Criando a camada de negócios

A camada de negócios é responsável por implementar as regras de negócio. Para criar a camada de negócios, vamos utilizar o framework Flask. O Flask é um framework web minimalista para Python. O Flask fornece ferramentas, bibliotecas e tecnologias que permitem criar aplicações web com Python de forma simples e rápida.

Para criar a camada de negócios, vamos seguir os seguintes passos:

1. Criar o microserviço da camada de negócios:

```bash
touch services/task_service.py
```

2. Implementar o microserviço da camada de negócios:

```python
# services/task_service.py

from flask import Flask, request, jsonify

app = Flask(__name__)
tasks = []

@app.route('/tasks', methods=['GET'])
def get_all_tasks():
    return jsonify(tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    data = request.get_json()
    description = data.get('description')
    tasks.append({'description': description, 'status': 'Pendente'})
    return jsonify({'message': 'Tarefa adicionada com sucesso!'})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
```

3. Executar o microserviço da camada de negócios:

```bash
python services/task_service.py
```

4. Acessar o microserviço da camada de negócios:

```bash
http://localhost:5001
```

### 1.3. Criando a camada de dados

A camada de dados é responsável por armazenar os dados da aplicação web. Para criar a camada de dados, vamos utilizar o framework Flask. O Flask é um framework web minimalista para Python. O Flask fornece ferramentas, bibliotecas e tecnologias que permitem criar aplicações web com Python de forma simples e rápida.

Para criar a camada de dados, vamos seguir os seguintes passos:

1. Criar o microserviço da camada de dados:

```bash
touch services/user_service.py
```

2. Implementar o microserviço da camada de dados:

```python
# services/user_service.py

from flask import Flask, request, jsonify

app = Flask(__name__)
users = []

@app.route('/users', methods=['GET'])
def get_all_users():
    return jsonify(users)

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    name = data.get('name')
    users.append({'name': name})
    return jsonify({'message': 'Usuário adicionado com sucesso!'})

if __name__ == '__main__':
    app.run(debug=True, port=5002)
```

3. Executar o microserviço da camada de dados:

```bash
python services/user_service.py
```

4. Acessar o microserviço da camada de dados:

```bash
http://localhost:5002
```

#### Adicionando um balanceador de carga com nginx e docker (Load Balancer)

Para adicionar um balanceador de carga com nginx e docker, vamos seguir os seguintes passos:

1. Criar o arquivo `requirements.txt` com `Flask` e `requests`:

```bash
# services
touch services/requirements.txt
echo "Flask" >> services/requirements.txt
echo "requests" >> services/requirements.txt

#ui
touch ui/requirements.txt
echo "Flask" >> ui/requirements.txt
echo "requests" >> ui/requirements.txt
```

2. Criar o arquivo `Dockerfile` para a camada de serviços:

```bash
touch services/Dockerfile
```

```dockerfile
# services/Dockerfile
FROM python:3.8-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5001

CMD ["python", "task_service.py"]
```

3. Adicionar o arquivo `Dockerfile` para a camada de apresentação:

```bash
touch ui/Dockerfile
```

```dockerfile
# ui/Dockerfile

FROM python:3.8-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
```

4. Criar o arquivo `docker-compose.yml`:

```bash
touch docker-compose.yml
```

```yml
# docker-compose.yml
version: '3'

services:
  ui:
    build:
      context: ./ui
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.ui.rule=Host(`ui.localhost`)"
    networks:
      - web

  task-service:
    build:
      context: ./services
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.task-service.rule=Host(`task-service.localhost`)"
    networks:
      - web

  traefik:
    image: traefik:v2.5
    command:
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
      - "8080:8080"
    networks:
      - web
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock

networks:
  web:
    external: true
```

5. Criar o arquivo `nginx.conf`:

```bash
touch nginx.conf
```

```conf
# nginx/nginx.conf

events {
    worker_connections 1024;
}

http {
    upstream backend {
        server ui:5000;
        server task-service:5001;
        # Adicione mais servidores conforme necessário
        # server outro_servidor:porta;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

