import React from 'react';
import { render, screen } from '@testing-library/react';
import ChainFusion from '../pages/ChainFusion';

describe('Chain Fusion Page', () => {
  it('renders Chain Fusion headline and coming soon text', () => {
    render(<ChainFusion />);
    expect(screen.getByText(/Chain Fusion/i)).toBeInTheDocument();
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });
});
