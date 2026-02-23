from model.tarefa_model import TarefaModel
from view.tarefa_view import TarefaView
from controller.tarefa_controller import TarefaController

if __name__ == "__main__":
    model = TarefaModel()
    view = TarefaView()
    controller = TarefaController(model, view)

    while True:
        print("\nMenu:")
        print("1. Adicionar tarefa")
        print("2. Listar tarefas")
        print("3. Concluir tarefa")
        print("4. Remover tarefa")
        print("5. Sair")

        escolha = view.obter_input("Escolha uma opção")

        if escolha == '1':
            controller.adicionar()
        elif escolha == '2':
            controller.listar()
        elif escolha == '3':
            id = int(view.obter_input("Digite o ID da tarefa a concluir"))
            controller.concluir(id)
        elif escolha == '4':
            id = int(view.obter_input("Digite o ID da tarefa a remover"))
            controller.remover(id)
        elif escolha == '5':
            break
        else:
            view.exibir_mensagem("Opção inválida, tente novamente.")