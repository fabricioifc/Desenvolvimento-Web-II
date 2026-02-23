from abc import ABC, abstractmethod


class TarefaInterface(ABC):

    @abstractmethod
    def adicionar(self, titulo):
        raise NotImplementedError

    @abstractmethod
    def listar(self, filtro=None):
        raise NotImplementedError

    @abstractmethod
    def concluir(self, id):
        raise NotImplementedError

    @abstractmethod
    def remover(self, id):
        raise NotImplementedError


class TarefaViewInterface(ABC):

    @abstractmethod
    def exibir_tarefas(self, tarefas):
        raise NotImplementedError

    @abstractmethod
    def exibir_mensagem(self, mensagem):
        raise NotImplementedError

    @abstractmethod
    def obter_input(self, prompt):
        raise NotImplementedError