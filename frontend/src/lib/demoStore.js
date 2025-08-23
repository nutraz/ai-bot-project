// Simple client-side demo store using localStorage

const KEY = 'okh:repos';

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

function write(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch (_) {
    // ignore quota or serialization errors in demo mode
  }
}

export function getRepos() {
  return read();
}

export function clearRepos() {
  write([]);
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function addRepo(partial) {
  const now = new Date().toISOString();
  const repo = {
    id: uid(),
    name: partial?.name || 'untitled',
    desc: partial?.desc || '',
    stars: partial?.stars ?? Math.floor(Math.random() * 1000),
    createdAt: now,
    updatedAt: now,
    status: 'active',
  };
  const list = read();
  list.unshift(repo);
  write(list);
  return repo;
}

export function removeRepo(id) {
  const list = read().filter((r) => r.id !== id);
  write(list);
}

export function seedDemoRepos() {
  const list = read();
  if (list.length > 0) return list;
  const seeded = [
    { name: 'openkeyhub/okh-core', desc: 'Core canisters and repo manager', stars: 1234 },
    { name: 'openkeyhub/okh-ui', desc: 'Beautiful, composable frontend', stars: 842 },
    { name: 'openkeyhub/okh-agents', desc: 'Automation and CI bots', stars: 512 },
  ].map((r) => addRepo(r));
  return seeded;
}
