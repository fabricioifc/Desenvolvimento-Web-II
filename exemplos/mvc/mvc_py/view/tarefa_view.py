class TarefaView:

    def exibir_tarefas(self, tarefas):
        print("Tarefas:")
        for tarefa in tarefas:
            status = "Concluída" if tarefa.concluida else "Pendente"
            print(f"{tarefa.id}: {tarefa.titulo} - {status}")

    def exibir_mensagem(self, mensagem):
        print(f" > {mensagem}")

    def obter_input(self, prompt):
        return input(f"{prompt}: ")