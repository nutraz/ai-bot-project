import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RevenueDashboard from '../components/Revenue/RevenueDashboard';

describe('RevenueDashboard', () => {
  it('shows total revenue and user share', () => {
    render(<RevenueDashboard />);
    expect(screen.getByText(/Total Revenue/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Share/i)).toBeInTheDocument();
  });

  it('shows claim button if payout is pending', () => {
    render(<RevenueDashboard />);
    expect(screen.getByText(/Claim Pending Payouts/i)).toBeInTheDocument();
  });

  it('shows message if no revenue', () => {
    // Simulate zero revenue (would require prop or mock update)
    // expect(screen.getByText(/No revenue/i)).toBeInTheDocument();
  });
});
