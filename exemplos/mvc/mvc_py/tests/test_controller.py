from unittest.mock import Mock
from controller.tarefa_controller import TarefaController


def test_controller_adicionar():
    model_mock = Mock()
    view_mock = Mock()

    view_mock.obter_input.return_value = "Nova tarefa"

    controller = TarefaController(model_mock, view_mock)
    controller.adicionar()

    model_mock.adicionar.assert_called_once_with("Nova tarefa")
    view_mock.exibir_mensagem.assert_called_once_with(
        "Tarefa adicionada com sucesso!"
    )


def test_controller_listar():
    model_mock = Mock()
    view_mock = Mock()

    model_mock.listar.return_value = ["fake_task"]

    controller = TarefaController(model_mock, view_mock)
    controller.listar()

    model_mock.listar.assert_called_once()
    view_mock.exibir_tarefas.assert_called_once_with(["fake_task"])


def test_controller_concluir():
    model_mock = Mock()
    view_mock = Mock()

    controller = TarefaController(model_mock, view_mock)
    controller.concluir(1)

    model_mock.concluir.assert_called_once_with(1)
    view_mock.exibir_mensagem.assert_called_once_with("Tarefa concluída!")


def test_controller_remover():
    model_mock = Mock()
    view_mock = Mock()

    controller = TarefaController(model_mock, view_mock)
    controller.remover(1)

    model_mock.remover.assert_called_once_with(1)
    view_mock.exibir_mensagem.assert_called_once_with("Tarefa removida!")