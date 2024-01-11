from flask import Flask, render_template, request, jsonify
import time

app = Flask(__name__)

# Lista de mensagens no chat
chat_messages = []

@app.route('/')
def index():
    return render_template('index.html', messages=chat_messages)

@app.route('/send_message', methods=['POST'])
def send_message():
    # Obtém a mensagem do corpo da requisição POST
    message = request.form.get('message')

    # Adiciona a mensagem à lista de mensagens no chat
    chat_messages.append({'timestamp': time.time(), 'message': message})

    return jsonify({'status': 'OK'})

@app.route('/get_messages', methods=['GET'])
def get_messages():
    # Obtém o timestamp da última mensagem recebida
    last_timestamp = float(request.args.get('last_timestamp', 0))

    # Filtra mensagens que foram enviadas após o último timestamp
    new_messages = [msg for msg in chat_messages if msg['timestamp'] > last_timestamp]

    return jsonify({'messages': new_messages})

if __name__ == '__main__':
    app.run(debug=True)
