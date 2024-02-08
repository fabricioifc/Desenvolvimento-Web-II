class TodoRepository:
    def __init__(self):
        self.todos = []
    
    def add(self, todo):
        self.todos.append(todo)
    
    def list(self):
        return self.todos

class TodoModel:
    def __init__(self, name, done:bool=False):
        self.name = name
        self.done = done
        self.todos = []

    def __repr__(self):
        return f'{self.name} - {self.done}'
    
class TodoView:
    def display(self, todos):
        for idx, todo in enumerate(todos):
            print(f'{idx+1}. {todo}')
    
    def get_input(self, prompt):
        return input(prompt)
    
class TodoController:
    def __init__(self, repository, view):
        self.repository = repository
        self.view = view
    
    def add(self, name):
        if not name:
            return Exception('Name is required')
        todo = TodoModel(name)
        self.repository.add(todo)
        self.view.display(self.repository.list())
    
    def list(self):
        todos = self.repository.list()
        self.view.display(todos)

class TodoApp:
    def __init__(self):
        self.repository = TodoRepository()
        self.view = TodoView()
        self.controller = TodoController(self.repository, self.view)
    
    def run(self):
        try:
            while True:
                choice = self.view.get_input('1. Add todo\n2. List todos\n3. Exit\n')
                if choice == '1':
                    todo = self.view.get_input('Enter todo: ')
                    self.controller.add(todo)
                elif choice == '2':
                    self.controller.list()
                elif choice == '3':
                    break
                else:
                    print('Invalid choice')
        except Exception as e:
            print(e)

if __name__ == '__main__':
    app = TodoApp()
    app.run()
    