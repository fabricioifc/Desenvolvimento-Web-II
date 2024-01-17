@app.route('/login', methods=['POST'])
def login():
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'" # Errado
    query = f"SELECT * FROM users WHERE username = ? AND password = ?" # Correto
    result = cursor.execute(query, (username, password)).fetchone()

# Simulation of SQL Injection
# SELECT * FROM users WHERE username = '' OR 'a'='a';-- AND password = '';

