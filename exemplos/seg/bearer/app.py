from flask import Flask, jsonify, request, g
import secrets
from functools import wraps

app = Flask(__name__)

# Simulando uma base de dados de usuários (em um ambiente de produção, use um banco de dados real)
users = {
    'admin': {'password': 'admin', 'role': 'admin'},
    'user': {'password': 'user', 'role': 'user'}
}

# Dicionário para armazenar os tokens associados aos usuários
tokens = {}

# Função para autenticar o usuário e gerar um Bearer Token
def authenticate(username, password):
    user = users.get(username)
    if user and user['password'] == password:
        token = secrets.token_urlsafe(16)
        tokens[token] = username
        return token

# Middleware para autenticar o usuário usando Bearer Token
def authenticate_request(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if token and token.startswith('Bearer '):
            token = token.split(' ')[1]
            username = tokens.get(token)
            if username:
                g.user = users.get(username)
                return f(*args, **kwargs)

        return jsonify({'message': 'Unauthorized'}), 401

    return decorated_function

# Rota para autenticar o usuário e gerar o Bearer Token
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    token = authenticate(username, password)
    if token:
        return jsonify({'token': token}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

# Rota protegida que requer um Bearer Token para acessar
@app.route('/products', methods=['GET'])
@authenticate_request
def get_products():
    role = g.user.get('role')
    if role == 'admin':
        # Lógica para listar produtos (simulado aqui)
        products = [{'id': 1, 'name': 'Product A'}, {'id': 2, 'name': 'Product B'}]
        return jsonify(products), 200
    else:
        return jsonify({'message': 'Permission denied'}), 403

if __name__ == '__main__':
    app.run(debug=True)

# Testando a aplicação
# 1. Autenticando o usuário e gerando o Bearer Token
    
# $ curl -X POST -H "Content-Type: application/json" -d '{"username": "admin", "password": "admin"}' http://localhost:5000/login

# 2. Acessando a rota protegida usando o Bearer Token
# $ curl -X GET -H 
