import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProposalDetail from '../components/Governance/ProposalDetail';

describe('ProposalDetail', () => {
  const proposal = {
    id: 1,
    title: 'Test Proposal',
    status: 'Active',
    votesFor: 5,
    votesAgainst: 2,
  };
  it('renders proposal details', () => {
    render(<ProposalDetail proposal={proposal} onBack={() => {}} onVote={() => {}} />);
    expect(screen.getByText(/Test Proposal/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Votes For/i)).toBeInTheDocument();
  });
  it('handles voting', () => {
    const onVote = jest.fn();
    render(<ProposalDetail proposal={proposal} onBack={() => {}} onVote={onVote} />);
    fireEvent.click(screen.getByText(/Vote For/i));
    fireEvent.click(screen.getByText(/Submit Vote/i));
    expect(onVote).toHaveBeenCalledWith('for');
  });
});
