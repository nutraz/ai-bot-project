// Mock implementation for governanceService
export async function fetchProposals() {
  return [
    { id: 1, title: 'Test Proposal', status: 'Active', votesFor: 5, votesAgainst: 2 },
    { id: 2, title: 'Another Proposal', status: 'Passed', votesFor: 10, votesAgainst: 1 }
  ];
}

export async function submitVote(id, vote) {
  return { success: true };
}

export async function claimPayout() {
  return { amount: 10 };
}
