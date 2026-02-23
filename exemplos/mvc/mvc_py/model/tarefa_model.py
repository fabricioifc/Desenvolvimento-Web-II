from .tarefa import Tarefa

class TarefaModel:

    def __init__(self):
        self.tarefas = []
        self.next_id = 1

    def adicionar(self, titulo):
        tarefa = Tarefa(self.next_id, titulo)
        self.tarefas.append(tarefa)
        self.next_id += 1

    def listar(self, filtro=None):
        if filtro == 'concluidas':
            return [tarefa for tarefa in self.tarefas if tarefa.concluida]
        elif filtro == 'pendentes':
            return [tarefa for tarefa in self.tarefas if not tarefa.concluida]
        else:
            return self.tarefas
    
    def concluir(self, id):
        for tarefa in self.tarefas:
            if tarefa.id == id:
                tarefa.concluida = True
                break

    def remover(self, id):
        self.tarefas = [tarefa for tarefa in self.tarefas if tarefa.id != id]