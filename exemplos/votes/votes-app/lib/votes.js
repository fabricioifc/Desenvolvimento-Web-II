// voting-app/lib/votes.js
// import {LowSync} from 'lowdb';
// import {JSONFileSync} from 'lowdb/node';

const LowSync = require('lowdb').LowSync;
const JSONFileSync = require('lowdb/adapters/JSONFileSync');

const db = new LowSync(new JSONFileSync('votes.json'), {})

// Inicializa o banco de dados se ainda não estiver
db.defaults({ votes: {} }).write();

export function getVotesCount() {
  const voteCounts = {};

  for (const voteId in db.get('votes').value()) {
    const frameworkId = db.get('votes').get(voteId).value();
    voteCounts[frameworkId] = (voteCounts[frameworkId] || 0) + 1;
  }

  return voteCounts;
}

export function recordVote(frameworkId) {
  const id = Date.now().toString();
  db.get('votes').set(id, frameworkId).write();
  return id;
}

export function resetVotes() {
  db.get('votes').assign({}).write();
}
