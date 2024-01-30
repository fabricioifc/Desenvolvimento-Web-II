const app = require('express')();

app.get('/', (req, res) => res.send("Hello World!"));
app.get('/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    send(res);
});

const port = process.env.PORT || 8000;

let i = 0;
const send = (res) => {
    res.write("data: "+`Hello World from Server Side -> [${i++}]\n\n`);
    setTimeout(() => send(res), 1000);
}

app.listen(port, () => console.log(`Server running on port ${port}`));

// Para rodar o exemplo, execute o comando:
// node index.js
// Acesse o endereço http://localhost:8000/stream
// O servidor irá enviar mensagens a cada segundo.
// Tente abrir o endereço em mais de uma aba do navegador.
// ou
// curl -N http://localhost:8000/stream

