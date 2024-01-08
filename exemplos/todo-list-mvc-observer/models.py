# models.py

class Task:
    def __init__(self, id, description, done=False):
        self.id = id
        self.description = description
        self.done = done

tasks = [
    Task(1, "Comprar leite"),
    Task(2, "Estudar Python"),
    Task(3, "Fazer exercícios")
]