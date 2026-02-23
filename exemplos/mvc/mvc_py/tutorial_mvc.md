# Tarefas com Arquitetura MVC em Python

Neste tutorial, você vai aprender a construir um **gerenciador de tarefas no terminal** utilizando o padrão arquitetural **MVC (Model-View-Controller)** e **interfaces com classes abstratas** em Python.

# 1. O que é MVC?

O padrão **MVC** divide a aplicação em três partes:

| Camada         | Responsabilidade          |
| -------------- | ------------------------- |
| **Model**      | Regras de negócio e dados |
| **View**       | Interface com o usuário   |
| **Controller** | Intermedia Model e View   |

👉 Isso torna o código mais organizado, reutilizável e fácil de manter.

---

# 2. Estrutura do Projeto

Organize seu projeto assim:

```
projeto/
│
├── main.py
│
├── core/
│   └── interfaces.py
│
├── model/
│   ├── tarefa.py
│   └── tarefa_model.py
│
├── view/
│   └── tarefa_view.py
│
└── controller/
    └── tarefa_controller.py
```

# Criando as Interfaces (Contratos)

📄 `core/interfaces.py`

Aqui definimos os contratos que Model e View devem seguir.

```python
from abc import ABC, abstractmethod
```

### Interface do Model

```python
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
```

### Interface da View

```python
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
```

🔎 **Por que usar interfaces?**

* Forçam a implementação dos métodos
* Permitem trocar implementações facilmente
* Melhoram testabilidade

# 4. Criando o Model

## 📄 `model/tarefa.py`

Representa a entidade Tarefa:

```python
class Tarefa:
    def __init__(self, id, titulo):
        self.id = id
        self.titulo = titulo
        self.concluida = False
```

## `model/tarefa_model.py`

Responsável pelas regras de negócio.

```python
from .tarefa import Tarefa
from core.interfaces import TarefaInterface

class TarefaModel(TarefaInterface):

    def __init__(self):
        self.tarefas = []
        self.next_id = 1
```

### Adicionar tarefa

```python
def adicionar(self, titulo):
    tarefa = Tarefa(self.next_id, titulo)
    self.tarefas.append(tarefa)
    self.next_id += 1
```

### Listar tarefas

```python
def listar(self, filtro=None):
    if filtro == 'concluidas':
        return [tarefa for tarefa in self.tarefas if tarefa.concluida]
    elif filtro == 'pendentes':
        return [tarefa for tarefa in self.tarefas if not tarefa.concluida]
    else:
        return self.tarefas
```

### Concluir tarefa

```python
def concluir(self, id):
    for tarefa in self.tarefas:
        if tarefa.id == id:
            tarefa.concluida = True
            break
```

### Remover tarefa

```python
def remover(self, id):
    self.tarefas = [tarefa for tarefa in self.tarefas if tarefa.id != id]
```

# 5. Criando a View

`view/tarefa_view.py`

Responsável por interação com o usuário.

```python
from core.interfaces import TarefaViewInterface
```

```python
class TarefaView(TarefaViewInterface):
```

### Exibir tarefas

```python
def exibir_tarefas(self, tarefas):
    print("Tarefas:")
    for tarefa in tarefas:
        status = "Concluída" if tarefa.concluida else "Pendente"
        print(f"{tarefa.id}: {tarefa.titulo} - {status}")
```

### Exibir mensagem

```python
def exibir_mensagem(self, mensagem):
    print(f" > {mensagem}")
```

### Obter input

```python
def obter_input(self, prompt):
    return input(f"{prompt}: ")
```

# 6. Criando o Controller

`controller/tarefa_controller.py`

O Controller conecta Model e View.

```python
from core.interfaces import TarefaViewInterface, TarefaInterface
```

```python
class TarefaController(TarefaInterface):
```

### Construtor

```python
def __init__(self, model: TarefaInterface, view: TarefaViewInterface):
    self.model = model
    self.view = view
```

### Adicionar

```python
def adicionar(self):
    texto = self.view.obter_input("Digite o título da tarefa")
    self.model.adicionar(texto)
    self.view.exibir_mensagem("Tarefa adicionada com sucesso!")
```

### Listar

```python
def listar(self, filtro=None):
    tarefas = self.model.listar(filtro)
    self.view.exibir_tarefas(tarefas)
```

### Concluir

```python
def concluir(self, id):
    self.model.concluir(id)
    self.view.exibir_mensagem("Tarefa concluída!")
```

### Remover

```python
def remover(self, id):
    self.model.remover(id)
    self.view.exibir_mensagem("Tarefa removida!")
```

# 7. Arquivo Principal (main.py)

`main.py`

Responsável por iniciar a aplicação.

```python
from model.tarefa_model import TarefaModel
from view.tarefa_view import TarefaView
from controller.tarefa_controller import TarefaController
```

### Inicialização

```python
if __name__ == "__main__":
    model = TarefaModel()
    view = TarefaView()
    controller = TarefaController(model, view)
```

### Menu principal

```python
while True:
    print("\nMenu:")
    print("1. Adicionar tarefa")
    print("2. Listar tarefas")
    print("3. Concluir tarefa")
    print("4. Remover tarefa")
    print("5. Sair")
```

```python
escolha = view.obter_input("Escolha uma opção")
```

```python
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
```

#  8. Executando o Projeto

No terminal:

```bash
python main.py
```