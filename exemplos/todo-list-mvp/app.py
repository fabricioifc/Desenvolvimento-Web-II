# main_app.py
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

class TaskModel:
    def __init__(self):
        self.tasks = []
        self.task_id_counter = 1

    def add_task(self, description):
        task = {'id': self.task_id_counter, 'description': description, 'completed': False}
        self.tasks.append(task)
        self.task_id_counter += 1

    def get_tasks(self):
        return self.tasks

    def mark_task_as_completed(self, task_id):
        for task in self.tasks:
            if task['id'] == int(task_id):
                task['completed'] = not task['completed']

class TaskView:
    def render(self, tasks):
        return render_template('index.html', tasks=tasks)

class TaskPresenter:
    def __init__(self, model, view):
        self.model = model
        self.view = view

    def show_tasks(self):
        tasks = self.model.get_tasks()
        return self.view.render(tasks)

    def add_task(self, description):
        self.model.add_task(description)

    def mark_task_as_completed(self, task_id):
        self.model.mark_task_as_completed(task_id)

model = TaskModel()
view = TaskView()
presenter = TaskPresenter(model, view)

@app.route('/')
def index():
    return presenter.show_tasks()

@app.route('/add_task', methods=['POST'])
def add_task():
    description = request.form['task']
    model.add_task(description)
    return redirect(url_for('index'))

@app.route('/mark_completed/<task_id>', methods=['POST'])
def mark_completed(task_id):
    model.mark_task_as_completed(task_id)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
