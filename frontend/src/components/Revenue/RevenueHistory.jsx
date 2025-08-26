import React from 'react';

// Dummy data for payout history
const payoutHistory = [
  { id: 1, amount: 60, date: '2025-07-01', status: 'Paid' },
  { id: 2, amount: 60, date: '2025-08-01', status: 'Pending' },
];

export default function RevenueHistory() {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Payout History</h2>
      <ul>
        {payoutHistory.map((p) => (
          <li key={p.id} className="mb-1">
            {p.date}: ${p.amount} - <span className={p.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'}>{p.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
