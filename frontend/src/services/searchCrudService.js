// Service to connect frontend to Motoko search CRUD canister (stub)
// Replace with actual canister integration (e.g., @dfinity/agent)

let mockResults = [
  { id: 1, title: 'OpenKeyHub Repo', snippet: 'A Web3 dev hub repository', type_: 'repo' },
  { id: 2, title: 'Alice', snippet: 'Top contributor', type_: 'user' },
  { id: 3, title: 'Upgrade Protocol', snippet: 'Proposal to upgrade protocol', type_: 'proposal' },
];

export async function createResult(title, snippet, type_) {
  const id = Math.floor(Math.random() * 1000000);
  const result = { id, title, snippet, type_ };
  mockResults.push(result);
  return result;
}

export async function getResults() {
  return mockResults;
}

export async function updateResult(id, title, snippet, type_) {
  const idx = mockResults.findIndex(r => r.id === id);
  if (idx === -1) return null;
  mockResults[idx] = { id, title, snippet, type_ };
  return mockResults[idx];
}

export async function deleteResult(id) {
  const before = mockResults.length;
  mockResults = mockResults.filter(r => r.id !== id);
  return mockResults.length < before;
}
