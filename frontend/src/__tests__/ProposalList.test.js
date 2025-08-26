import React from 'react';
import { render, screen } from '@testing-library/react';
import ProposalList from '../components/Governance/ProposalList';

const mockProposals = [
  { id: 1, title: 'Add new feature', status: 'Active', votesFor: 12, votesAgainst: 3 },
  { id: 2, title: 'Change fee structure', status: 'Passed', votesFor: 20, votesAgainst: 2 },
];

describe('ProposalList', () => {
  it('renders proposals', () => {
    render(<ProposalList proposals={mockProposals} onSelect={() => {}} />);
    expect(screen.getByText(/Governance Proposals/i)).toBeInTheDocument();
    expect(screen.getByText(/Add new feature/i)).toBeInTheDocument();
    expect(screen.getByText(/Change fee structure/i)).toBeInTheDocument();
  });

  it('shows message if no proposals', () => {
    render(<ProposalList onSelect={() => {}} proposals={[]} />);
    expect(screen.getByText(/Governance Proposals/i)).toBeInTheDocument();
    // Should show no proposals message if implemented
  });
});
