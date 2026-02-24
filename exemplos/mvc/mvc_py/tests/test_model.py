import pytest
from model.tarefa_model import TarefaModel


def test_adicionar_tarefa():
    model = TarefaModel()

    model.adicionar("Estudar MVC")

    assert len(model.tarefas) == 1
    assert model.tarefas[0].titulo == "Estudar MVC"
    assert model.tarefas[0].concluida is False
    assert model.tarefas[0].id == 1


def test_listar_todas():
    model = TarefaModel()
    model.adicionar("T1")
    model.adicionar("T2")

    tarefas = model.listar()

    assert len(tarefas) == 2


def test_concluir_tarefa():
    model = TarefaModel()
    model.adicionar("Tarefa teste")

    model.concluir(1)

    assert model.tarefas[0].concluida is True


def test_listar_concluidas():
    model = TarefaModel()
    model.adicionar("T1")
    model.adicionar("T2")

    model.concluir(1)

    concluidas = model.listar("concluidas")

    assert len(concluidas) == 1
    assert concluidas[0].id == 1


def test_remover_tarefa():
    model = TarefaModel()
    model.adicionar("T1")
    model.adicionar("T2")

    model.remover(1)

    assert len(model.tarefas) == 1
    assert model.tarefas[0].id == 2