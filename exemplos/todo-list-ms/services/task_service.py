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
