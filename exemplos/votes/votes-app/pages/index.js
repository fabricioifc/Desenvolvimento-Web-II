// voting-app/pages/index.js
import { useState, useEffect } from 'react';
import EventSource from 'eventsource';
import frameworks from '../data/frameworks';
import { recordVote } from '../lib/votes';

export default function Home() {
  const [selectedFramework, setSelectedFramework] = useState('');
  const [voted, setVoted] = useState(false);
  const [voteCounts, setVoteCounts] = useState({});

  useEffect(() => {
    const eventSource = new EventSource('/api/votes');

    eventSource.onmessage = (event) => {
      setVoteCounts(JSON.parse(event.data));
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleVote = async () => {
    if (selectedFramework && !voted) {
      const voteId = recordVote(selectedFramework);

      // Atualiza a contagem de votos manualmente após um novo voto
      setVoteCounts((prevVoteCounts) => ({
        ...prevVoteCounts,
        [selectedFramework]: (prevVoteCounts[selectedFramework] || 0) + 1,
      }));

      setVoted(true);
    }
  };

  return (
    <div>
      <h1>Vote for the Best Web Framework</h1>
      <ul>
        {frameworks.map((framework) => (
          <li key={framework.id}>
            <label>
              <input
                type="radio"
                name="framework"
                value={framework.id}
                onChange={() => setSelectedFramework(framework.id)}
                disabled={voted}
              />
              {framework.name} - {voteCounts[framework.id] || 0} votes
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleVote} disabled={voted}>
        Vote
      </button>
      {voted && <p>Thanks for voting!</p>}
    </div>
  );
}
