import React from 'react';
import { render, screen } from '@testing-library/react';
import RevenueHistory from '../components/Revenue/RevenueHistory';

describe('RevenueHistory', () => {
  it('renders payout history', () => {
    render(<RevenueHistory />);
    expect(screen.getByText(/Payout History/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Paid|Pending/).length).toBeGreaterThan(0);
  });
});
