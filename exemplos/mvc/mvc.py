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
    def __init__(self, model, view):
        self.model = model
        self.view = view
    
    def add(self, name):
        self.model.todos.append(TodoModel(name))
    
    def list(self):
        self.view.display(self.model.todos)

class TodoApp:
    def __init__(self):
        self.model = TodoModel('First todo')
        self.view = TodoView()
        self.controller = TodoController(self.model, self.view)
    
    def run(self):
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

if __name__ == '__main__':
    app = TodoApp()
    app.run()
    