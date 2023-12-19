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
