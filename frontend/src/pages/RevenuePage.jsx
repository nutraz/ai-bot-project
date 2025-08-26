import React from 'react';
import RevenueDashboard from '../components/Revenue/RevenueDashboard';
import RevenueHistory from '../components/Revenue/RevenueHistory';

export default function RevenuePage() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <RevenueDashboard />
      <div className="mt-6">
        <RevenueHistory />
      </div>
    </div>
  );
}
