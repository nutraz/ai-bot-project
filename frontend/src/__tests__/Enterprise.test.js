import React from 'react';
import { render, screen } from '@testing-library/react';
import Enterprise from '../pages/Enterprise';

describe('Enterprise Page', () => {
  it('renders Enterprise headline and coming soon text', () => {
    render(<Enterprise />);
    expect(screen.getByText(/Enterprise Features/i)).toBeInTheDocument();
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });
});
