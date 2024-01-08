# controller.py

from models import tasks
from models import Task

def get_tasks():
    return tasks

def add_task(description):
    new_id = len(tasks) + 1
    new_task = Task(new_id, description)
    tasks.append(new_task)

def mark_task_done(task_id):
    task = next((task for task in tasks if task.id == task_id), None)
    if task:
        task.done = True