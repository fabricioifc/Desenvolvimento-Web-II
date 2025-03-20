// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Configuração para permitir CORS
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Armazena os eventos para serem enviados aos clientes
const events = [];
// Armazena os callbacks das requisições pendentes
const waitingClients = [];

// Endpoint para long polling
app.get("/poll", (req, res) => {
  // Obtém o último evento que o cliente já viu
  const lastEventId = parseInt(req.query.lastEventId) || 0;

  // Verifica se há eventos novos para este cliente
  const newEvents = events.filter((event) => event.id > lastEventId);

  if (newEvents.length > 0) {
    // Se houver eventos novos, retorna imediatamente
    res.json({
      events: newEvents,
      lastEventId: events[events.length - 1].id,
    });
  } else {
    // Se não houver eventos novos, mantém a conexão aberta
    const clientCallback = {
      res,
      timestamp: Date.now(),
    };

    waitingClients.push(clientCallback);

    // Timeout de 30 segundos para liberar a conexão se não houver eventos
    setTimeout(() => {
      // Verifica se este cliente ainda está esperando
      const index = waitingClients.indexOf(clientCallback);
      if (index !== -1) {
        // Remove o cliente da lista de espera
        waitingClients.splice(index, 1);
        // Retorna uma resposta vazia mas com o lastEventId atual para manter continuidade
        res.json({
          events: [],
          lastEventId:
            events.length > 0 ? events[events.length - 1].id : lastEventId,
        });
      }
    }, 30000); // 30 segundos

    // Quando o cliente desconecta, remove da lista
    req.on("close", () => {
      const index = waitingClients.indexOf(clientCallback);
      if (index !== -1) {
        waitingClients.splice(index, 1);
      }
    });
  }
});

// Endpoint para criar um novo evento
app.post("/event", (req, res) => {
  const newEvent = {
    id: events.length + 1,
    message: req.body.message || `Evento ${events.length + 1}`,
    timestamp: new Date().toISOString(),
  };

  events.push(newEvent);

  // Notifica todos os clientes que estão esperando
  waitingClients.forEach((client) => {
    client.res.json({
      events: [newEvent],
      lastEventId: newEvent.id,
    });
  });

  // Limpa a lista de clientes em espera
  waitingClients.length = 0;

  res.json({ status: "success", event: newEvent });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
