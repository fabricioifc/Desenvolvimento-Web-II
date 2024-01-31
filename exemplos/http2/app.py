from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

tasks = []

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    data = request.get_json()
    task = data.get('task')

    if task:
        tasks.append(task)
        return jsonify({'status': 'success', 'message': 'Task added successfully.'})

    return jsonify({'status': 'error', 'message': 'Invalid request.'})

if __name__ == '__main__':
    # Use Hypercorn para iniciar o servidor com suporte ao HTTP/2 e HTTPS
    app.run(host='127.0.0.1', port=5000, ssl_context=('cert.pem', 'key.pem'), debug=True)
