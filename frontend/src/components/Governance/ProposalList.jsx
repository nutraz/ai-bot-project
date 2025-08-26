import React from 'react';

export default function ProposalList({ proposals, onSelect }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Governance Proposals</h2>
      <ul>
        {proposals.map((p) => (
          <li key={p.id} className="mb-2 border-b pb-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{p.title}</span>
              <span className={`text-xs px-2 py-1 rounded ${p.status === 'Active' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{p.status}</span>
            </div>
            <div className="text-sm mt-1">For: {p.votesFor} | Against: {p.votesAgainst}</div>
            {onSelect && <button className="mt-2 text-blue-600 underline" onClick={() => onSelect(p)}>View & Vote</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
