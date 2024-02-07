class TodoApp:
    def __init__(self):
        self.todos = []
    
    def add(self, name:str, done:bool=False):
        self.todos.append({'name': name, 'done': done})
    
    def list(self):
        return self.todos
    
    def show_todo_list(self):
        todos = self.list()
        for idx, todo in enumerate(todos):
            print(f'{idx+1}. {todo["name"]} - {todo["done"]}')
    
    def run(self):
        while True:
            choice = input('1. Add todo\n2. List todos\n3. Exit\n')
            if choice == '1':
                todo = input('Enter todo: ')
                self.add(todo)
            elif choice == '2':
                self.show_todo_list()
            elif choice == '3':
                break
            else:
                print('Invalid choice')

if __name__ == '__main__':
    app = TodoApp()
    app.run()
