from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from datetime import timedelta

app = Flask(__name__)

# Configuração básica para JWT
app.config['JWT_SECRET_KEY'] = 'minha_chave_secreta_aqui'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=1)
jwt = JWTManager(app)

# Simulando uma base de dados de usuários (em um ambiente de produção, use um banco de dados real)
users = {
    1: {
        'name': 'professor',
        'username': 'admin',
        'password': 'admin',
    }
}

# Rota para autenticar o usuário e gerar o token JWT
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Verificar as credenciais do usuário (em um ambiente de produção, use uma lógica mais robusta)
    user = next((user_data for user_data in users.values() if user_data['username'] == username), None)
    if user and user['password'] == password:
        # Gerar token JWT
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200

    return jsonify({'message': 'Invalid credentials'}), 401

# Rota protegida que requer um token JWT para acessar
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    # Obter a identidade do token JWT
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    app.run(debug=True)
