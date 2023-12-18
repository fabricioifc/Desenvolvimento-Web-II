## Crianção de uma aplicação web monolítica

Nesta seção, vamos criar uma aplicação web monolítica com Python e Flask. Para isso, vamos seguir os seguintes passos:

0. Criação do ambiente virtual:

```bash
$ sudo apt install -y python3-pip # Caso não esteja instalado
$ sudo apt install -y python3-venv # Caso não esteja instalado
$ sudo apt install -y iputils-ping # Caso não esteja instalado
$ python3 -m venv .venv
$ source .venv/bin/activate
```

1. Instalação das dependências:

```bash
$ pip install --upgrade pip
$ pip install flask
```

2. Criação do arquivo `app.py`:

```bash
$ touch app.py
```

Adicionem o seguinte código no arquivo `app.py`:

```python
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Lista de tarefas (poderia ser substituída por um banco de dados em um aplicativo real)
tasks = []

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/add', methods=['POST'])
def add():
    task = request.form.get('task')
    if task:
        tasks.append(task)
    return redirect(url_for('index'))

@app.route('/delete/<int:task_id>')
def delete(task_id):
    if 0 <= task_id < len(tasks):
        del tasks[task_id]
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
```

3. Criação do arquivo `templates/index.html`:

```bash
$ mkdir templates
$ touch templates/index.html
```

Adicionem o seguinte código no arquivo `templates/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Tarefas</title>
</head>
<body>
    <h1>Lista de Tarefas</h1>
    <ul>
        {% for task in tasks %}
            <li>{{ task }} <a href="{{ url_for('delete', task_id=loop.index-1) }}">[X]</a></li>
        {% endfor %}
    </ul>
    <form action="{{ url_for('add') }}" method="post">
        <label for="task">Nova Tarefa:</label>
        <input type="text" name="task" required>
        <button type="submit">Adicionar</button>
    </form>
</body>
</html>
```

1. Execução da aplicação:

```bash
$ python app.py
```

5. Acesse a aplicação no navegador:

```bash
http://localhost:5000
```

Podemos também executar a aplicação com o `gunicorn`. Essa é uma boa prática para a implantação de aplicações web em produção. O gunicorn é um servidor HTTP WSGI para Python. O WSGI é um padrão de interface entre servidores e aplicações web para a linguagem de programação Python. Para executar a aplicação com o `gunicorn`, vamos seguir os seguintes passos:

6. Instalando o `gunicorn`:

```bash
$ pip install gunicorn
```

7. Executando a aplicação com o `gunicorn`:

```bash
$ gunicorn app:app
```

8. Acesse a aplicação no navegador:

```bash
http://localhost:8000
```

Agora, vamos configurar o `nginx` como um proxy reverso para o `gunicorn`. O nginx é um servidor HTTP e proxy reverso, bem como um servidor de proxy de e-mail. Para configurar o `nginx`, vamos seguir os seguintes passos:

9. Instalando o `nginx`:

```bash
$ sudo apt install nginx # Ubuntu/Debian
$ sudo yum install nginx # CentOS/RHEL
$ sudo pacman -S nginx # Arch Linux
```

10. Configurando o `nginx` no Ubuntu:
    
```bash
$ sudo rm /etc/nginx/sites-enabled/default
$ sudo touch /etc/nginx/sites-available/flask
$ sudo ln -s /etc/nginx/sites-available/flask /etc/nginx/sites-enabled/flask
```

11. Adicionem o seguinte código no arquivo `/etc/nginx/sites-available/flask`:

```bash
server {
    listen 80;
    server_name localhost monolito.ifc.edu.br;

    location / {
        proxy_pass http://localhost:8000;
    }
}
```

12. Alterando o arquivo `/etc/hosts` na máquina local:

```bash
$ sudo nano /etc/hosts
```

Altere a seguinte linha no arquivo `/etc/hosts`:

```bash
# vincular ao endereço IP do docker
172.17.0.3 monolito.ifc.edu.br
```

13. Reiniciando o `nginx`:

```bash
$ sudo nginx -t # Testa a configuração do nginx
$ sudo sevice nginx restart # Reinicia o nginx
$ ping monolito.ifc.edu.br # Testa a configuração do nginx
```

14. Rodar a aplicação com o `gunicorn`:

```bash
$ gunicorn app:app
```

15. Acesse a aplicação no navegador:

```bash
http://monolito.ifc.edu.br
```