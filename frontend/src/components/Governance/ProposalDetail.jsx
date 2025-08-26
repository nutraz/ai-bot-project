import React, { useState } from 'react';

export default function ProposalDetail({ proposal, onBack, onVote }) {
  const [vote, setVote] = useState(null);
  if (!proposal) return null;
  return (
    <div className="p-4 bg-white rounded shadow">
      <button className="mb-2 text-blue-600 underline" onClick={onBack}>Back to Proposals</button>
      <h2 className="text-xl font-bold mb-2">{proposal.title}</h2>
      <div>Status: <span className="font-semibold">{proposal.status}</span></div>
      <div className="my-2">Votes For: {proposal.votesFor} | Against: {proposal.votesAgainst}</div>
      <div className="flex gap-2 mt-4">
        <button className={`px-4 py-2 rounded ${vote === 'for' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`} onClick={() => setVote('for')}>Vote For</button>
        <button className={`px-4 py-2 rounded ${vote === 'against' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700'}`} onClick={() => setVote('against')}>Vote Against</button>
      </div>
      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded" disabled={!vote} onClick={() => onVote(vote)}>Submit Vote</button>
    </div>
  );
}
