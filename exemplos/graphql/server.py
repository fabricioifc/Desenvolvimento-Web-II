from flask import Flask
from flask_graphql import GraphQLView
import graphene

app = Flask(__name__)

# Modelo de dados
tasks = []

# Definindo o tipo de tarefa
class Task(graphene.ObjectType):
    id = graphene.ID()
    title = graphene.String()
    description = graphene.String()

# Definindo a raiz da consulta GraphQL com filtro por title optional contendo parte do texto
class Query(graphene.ObjectType):
    tasks = graphene.List(Task, title=graphene.String())

    def resolve_tasks(self, info, title=None):
        if title:
            return [task for task in tasks if title in task.title]
        return tasks
        
# Definindo a raiz da mutação GraphQL
class CreateTask(graphene.Mutation):
    class Arguments:
        title = graphene.String()
        description = graphene.String()

    task = graphene.Field(lambda: Task)

    def mutate(self, info, title, description):
        task = Task(id=str(len(tasks) + 1), title=title, description=description)
        tasks.append(task)
        return CreateTask(task=task)

class Mutation(graphene.ObjectType):
    create_task = CreateTask.Field()

# Criando o esquema GraphQL
schema = graphene.Schema(query=Query, mutation=Mutation)

# Rota para o endpoint GraphQL
app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True),
)

if __name__ == "__main__":
    app.run(debug=True)
