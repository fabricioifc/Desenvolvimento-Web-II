# --- Servidor rodando na porta 5000
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
# --- Cliente rodando em http://localhost:5500 terá acesso a API
CORS(app, origins=['http://localhost:5500'])

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Dados da API acessados com sucesso!'}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)