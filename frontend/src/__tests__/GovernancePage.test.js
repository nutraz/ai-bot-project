import React from 'react';
import { render, screen } from '@testing-library/react';
import GovernancePage from '../pages/GovernancePage';


jest.mock('../services/daoGovernanceService', () => ({
  fetchProposals: () => Promise.resolve([
    { id: 1, title: 'Test Proposal', status: 'Active', votesFor: 1, votesAgainst: 0 },
  ]),
  vote: jest.fn(),
}));

describe('GovernancePage', () => {
  it('renders governance page', async () => {
    render(<GovernancePage />);
    expect(await screen.findByText(/Governance Proposals/i)).toBeInTheDocument();
    expect(await screen.findByText(/Test Proposal/i)).toBeInTheDocument();
  });
});
