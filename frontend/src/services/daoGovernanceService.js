// Service to connect frontend to Motoko DAO Governance canister (stub)
// Replace with actual canister integration (e.g., @dfinity/agent)

export async function fetchProposals() {
  // TODO: Replace with canister call
  return [
    { id: 1, title: 'Upgrade Protocol', description: 'Proposal to upgrade protocol', votesFor: 10, votesAgainst: 2, status: 'Active' },
    { id: 2, title: 'Add Chain', description: 'Proposal to add new chain', votesFor: 5, votesAgainst: 1, status: 'Active' },
  ];
}

export async function createProposal(title, description) {
  // TODO: Replace with canister call
  return { id: Math.random(), title, description, votesFor: 0, votesAgainst: 0, status: 'Active' };
}

export async function vote(proposalId, support) {
  // TODO: Replace with canister call
  return true;
}
