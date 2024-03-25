import requests
import argparse

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

def get_tasks(title=None):
    endpoint = "http://localhost:5000/graphql"

    query = """
    query {
        tasks(title: "%s") {
            id
            title
            description
        }
    }
    """ % (title or "")

    response = requests.post(endpoint, json={"query": query})

    if response.status_code == 200:
        return response.json()["data"]["tasks"]
    else:
        print(f"Erro ao buscar as tarefas: {response.status_code}")
        return []

if __name__ == "__main__":
    args = argparse.ArgumentParser()
    args.add_argument("--title", type=str, help="Título da tarefa")
    args.add_argument("--description", type=str, help="Descrição da tarefa")
    args = args.parse_args()

    if args.title and args.description:
        task = create_task(args.title, args.description)
        print(f"Tarefa criada: {task}")
    elif args.title:
        tasks = get_tasks(args.title)
        for task in tasks:
            print(f"{task['id']}: {task['title']} - {task['description']}")
    else:
        tasks = get_tasks()
        for task in tasks:
            print(f"{task['id']}: {task['title']} - {task['description']}")