class TarefaController:

    def __init__(self, model, view):
        self.model = model
        self.view = view

    def adicionar_tarefa(self):
        texto = self.view.obter_input("Digite o título da tarefa")
        self.model.adicionar(texto)
        self.view.exibir_mensagem("Tarefa adicionada com sucesso!")

    def listar_tarefas(self, filtro=None):
        tarefas = self.model.listar(filtro)
        self.view.exibir_tarefas(tarefas)

    def concluir_tarefa(self, id):
        self.model.concluir(id)
        self.view.exibir_mensagem("Tarefa concluída!")

    def remover_tarefa(self, id):
        self.model.remover(id)
        self.view.exibir_mensagem("Tarefa removida!")