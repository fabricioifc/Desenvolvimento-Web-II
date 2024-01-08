# app.py

from flask import Flask, render_template, request, redirect, flash
from controller import get_tasks, add_task, mark_task_done


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_key'  # Chave secreta para uso do flash

@app.route("/")
def index():
    return render_template("index.html", tasks=get_tasks())

@app.route("/add_task", methods=["POST"])
def add():
    task_description = request.form.get("task")
    add_task(task_description)
    flash(f'Tarefa "{task_description}" adicionada com sucesso!', 'success')
    return redirect("/")

# @app.route("/mark_done/<int:task_id>", methods=["POST"])
@app.route("/mark_done/<int:task_id>")
def mark_done(task_id):
    mark_task_done(task_id)
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)