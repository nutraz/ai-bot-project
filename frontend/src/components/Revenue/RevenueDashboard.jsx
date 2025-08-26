import React from 'react';

// Dummy data for revenue
const revenueData = {
  totalRevenue: 1200,
  userShare: 120,
  payouts: [
    { id: 1, amount: 60, date: '2025-07-01', status: 'Paid' },
    { id: 2, amount: 60, date: '2025-08-01', status: 'Pending' },
  ],
};

export default function RevenueDashboard() {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Revenue Sharing Dashboard</h2>
      <div>Total Revenue: <span className="font-semibold">${revenueData.totalRevenue}</span></div>
      <div>Your Share: <span className="font-semibold">${revenueData.userShare}</span></div>
      <h3 className="mt-4 font-semibold">Payouts</h3>
      <ul>
        {revenueData.payouts.map((p) => (
          <li key={p.id} className="mb-1">
            {p.date}: ${p.amount} - <span className={p.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'}>{p.status}</span>
          </li>
        ))}
      </ul>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Claim Pending Payouts</button>
    </div>
  );
}
