import React from 'react';
import { render, screen } from '@testing-library/react';
import Marketplace from '../pages/Marketplace';

describe('Marketplace Page', () => {
  it('renders Marketplace headline and coming soon text', () => {
    render(<Marketplace />);
    expect(screen.getByText(/Marketplace/i)).toBeInTheDocument();
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });
});
