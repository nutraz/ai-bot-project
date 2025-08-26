import React from 'react';
import { render, screen } from '@testing-library/react';
import Tokenomics from '../pages/Tokenomics';

describe('Tokenomics Page', () => {
  it('renders Tokenomics headline and coming soon text', () => {
    render(<Tokenomics />);
    expect(screen.getByText(/Tokenomics/i)).toBeInTheDocument();
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });
});
