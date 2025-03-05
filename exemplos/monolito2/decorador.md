### O que é um decorador?
Um decorador é uma função que "embrulha" outra função, adicionando funcionalidade extra. O símbolo `@` é usado para aplicar o decorador a uma função específica.

### Exemplo básico
No seu exemplo, `@tempo_requisicao` poderia ser um decorador para medir o tempo de execução da função `ola()`. Veja como isso funcionaria:

```python
import time

# Definindo o decorador
def tempo_requisicao(funcao):
    def wrapper():
        inicio = time.time()  # Marca o tempo inicial
        resultado = funcao()  # Executa a função original
        fim = time.time()     # Marca o tempo final
        print(f"A função '{funcao.__name__}' levou {fim - inicio:.4f} segundos")
        return resultado
    return wrapper

# Usando o decorador com @
@tempo_requisicao
def ola():
    time.sleep(1)  # Simula uma pausa de 1 segundo
    return "olá"

# Testando
print(ola())
```

**Saída esperada:**
```
A função 'ola' levou 1.0023 segundos
olá
```

### Como funciona?
1. `@tempo_requisicao` aplica o decorador `tempo_requisicao` à função `ola`.
2. O decorador "embrulha" a função `ola` com `wrapper`, que adiciona a medição de tempo antes e depois da execução.
3. O resultado da função original (`"olá"`) é retornado normalmente.

### Outro exemplo prático
Um decorador para verificar se o usuário está "logado":

```python
def requer_login(funcao):
    def wrapper(usuario):
        if usuario.get("logado", False):
            return funcao(usuario)
        else:
            return "Erro: Usuário não está logado"
    return wrapper

@requer_login
def acessar_perfil(usuario):
    return f"Bem-vindo, {usuario['nome']}"

# Testando
usuario_nao_logado = {"nome": "João", "logado": False}
usuario_logado = {"nome": "Maria", "logado": True}

print(acessar_perfil(usuario_nao_logado))  # Erro: Usuário não está logado
print(acessar_perfil(usuario_logado))      # Bem-vindo, Maria
```