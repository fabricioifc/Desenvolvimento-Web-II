from crypt import methods
from flask import Flask,jsonify,request
from flask_swagger_ui import get_swaggerui_blueprint
import json

SWAGGER_URL="/swagger"
API_URL="/static/swagger.json"

swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': 'Access API'
    }
)

app = Flask(__name__)
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)

todos = [
    { "label": "My first task", "done": False },
    { "label": "My second task", "done": False },
    { "label": "My third task", "done": True }
]

@app.route("/")
def home():
    return jsonify({
        "Message": "app up and running successfully"
    })

@app.route("/todos",methods=["GET"])
def get_todos():
    return jsonify(todos)

@app.route("/todos",methods=["POST"])
def add_new_todo():
    request_body = request.data
    decoded_object = json.loads(request_body)
    todos.append(decoded_object)
    return jsonify(todos)

if __name__=="__main__":
    app.run(debug=True)