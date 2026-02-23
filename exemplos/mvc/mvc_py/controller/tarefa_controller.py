from core.interfaces import TarefaViewInterface, TarefaInterface


class TarefaController(TarefaInterface):

    def __init__(self, model: TarefaInterface, view: TarefaViewInterface):
        self.model = model
        self.view = view

    def adicionar(self):
        texto = self.view.obter_input("Digite o título da tarefa")
        self.model.adicionar(texto)
        self.view.exibir_mensagem("Tarefa adicionada com sucesso!")

    def listar(self, filtro=None):
        tarefas = self.model.listar(filtro)
        self.view.exibir_tarefas(tarefas)

    def concluir(self, id):
        self.model.concluir(id)
        self.view.exibir_mensagem("Tarefa concluída!")

    def remover(self, id):
        self.model.remover(id)
        self.view.exibir_mensagem("Tarefa removida!")