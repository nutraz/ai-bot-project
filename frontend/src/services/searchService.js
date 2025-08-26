// Service to connect frontend to Motoko search canister (stub)
// Replace with actual canister integration (e.g., @dfinity/agent)

export async function search(query) {
  // TODO: Replace with canister call
  if (!query) return [];
  // Example mock results
  return [
    { id: 1, title: 'OpenKeyHub Repo', snippet: 'A Web3 dev hub repository', type_: 'repo' },
    { id: 2, title: 'Alice', snippet: 'Top contributor', type_: 'user' },
    { id: 3, title: 'Upgrade Protocol', snippet: 'Proposal to upgrade protocol', type_: 'proposal' },
  ];
}
