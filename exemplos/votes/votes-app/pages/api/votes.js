// voting-app/pages/api/votes.js
import { getVotesCount } from '../../lib/votes';

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const sendVotesCount = () => {
        res.write(`data: ${JSON.stringify(getVotesCount())}\n\n`);
    };

    const intervalId = setInterval(sendVotesCount, 1000);

    res.on('close', () => {
        clearInterval(intervalId);
    });
}
