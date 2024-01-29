// voting-app/pages/api/reset.js
import { resetVotes } from '../../lib/votes';

export default function handler(req, res) {
  resetVotes();
  res.status(200).json({ message: 'Votes reset successfully' });
}
