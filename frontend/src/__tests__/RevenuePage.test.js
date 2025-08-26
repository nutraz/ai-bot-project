import React from 'react';
import { render, screen } from '@testing-library/react';
import RevenuePage from '../pages/RevenuePage';

describe('RevenuePage', () => {
  it('renders revenue page', () => {
    render(<RevenuePage />);
    expect(screen.getByText(/Revenue Sharing Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Payout History/i)).toBeInTheDocument();
  });
});
