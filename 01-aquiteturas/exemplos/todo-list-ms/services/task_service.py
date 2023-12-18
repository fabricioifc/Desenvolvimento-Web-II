# services/task_service.py

from flask import Flask, request, jsonify

app = Flask(__name__)
tasks = []

@app.route('/')
def index():
    routes = {
        'GET /tasks': 'Retorna todas as tarefas',
        'POST /add_task': 'Adiciona uma tarefa'
    }
    return jsonify(routes)

@app.route('/tasks', methods=['GET'])
def get_all_tasks():
    return jsonify(tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    data = request.get_json()
    description = data.get('description')
    tasks.append({'description': description, 'status': 'Pendente', 'id': len(tasks) + 1})
    return jsonify({'message': 'Tarefa adicionada com sucesso!'})

@app.route('/done_task/<task_id>', methods=['PUT'])
def done_task(task_id):
    if int(task_id) > len(tasks):
        return jsonify({'message': 'Tarefa não encontrada!'})
    tasks[int(task_id) - 1]['status'] = 'Concluída'
    return jsonify({'message': 'Tarefa concluída com sucesso!'})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
