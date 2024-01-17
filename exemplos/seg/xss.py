from flask import Flask
from flask import request
from markupsafe import escape

app = Flask(__name__)

@app.route("/")
def index():
    return """
    <form action="/search">
        <input name="query" type="text" />
        <input type="submit" value="Buscar" />
    </form>
    """

# <script>alert("XSS");</script>
# <style>body { background: red; }</style>
@app.route("/search")
def search():
    nome = request.args.get("query", "")
    nome_escapado = escape(nome) # usar escape para evitar XSS
    return f"<h3>Buscando por: {nome_escapado}</h3>"

if __name__ == "__main__":
    app.run(debug=True)