import requests

def create_task(title, description):
    endpoint = "http://localhost:5000/graphql"

    mutation = """
    mutation {
        createTask(title: "%s", description: "%s") {
            task {
                id
                title
                description
            }
        }
    }
    """ % (title, description)

    response = requests.post(endpoint, json={"query": mutation})

    if response.status_code == 200:
        return response.json()["data"]["createTask"]["task"]
    else:
        print(f"Erro ao criar a tarefa: {response.status_code}")
        return None

def get_tasks():
    endpoint = "http://localhost:5000/graphql"

    query = """
    query {
        tasks {
            id
            title
            description
        }
    }
    """

    response = requests.post(endpoint, json={"query": query})

    if response.status_code == 200:
        return response.json()["data"]["tasks"]
    else:
        print(f"Erro ao obter as tarefas: {response.status_code}")
        return None

# Exemplo de uso
new_task = create_task("Estudar GraphQL", "Aprender os conceitos básicos do GraphQL")
print(f"Tarefa criada: {new_task}")

all_tasks = get_tasks()
print("\nLista de Tarefas:")
for task in all_tasks:
    print(f"{task['id']}: {task['title']} - {task['description']}")
