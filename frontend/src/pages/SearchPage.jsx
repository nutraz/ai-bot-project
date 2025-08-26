import React, { useState } from 'react';
import { search } from '../services/searchService';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await search(query);
      setResults(res);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-fuchsia-50 to-pink-50">
      <div className="max-w-xl w-full bg-white/80 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse tracking-tight">
          <span role="img" aria-label="search" className="mr-2">🔎</span>Search
        </h1>
        <form onSubmit={handleSearch} className="w-full flex gap-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for repos, users, proposals..."
            className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-fuchsia-600 transition-all">Search</button>
        </form>
        {loading && <div className="text-blue-600">Searching...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {results.length > 0 && (
          <ul className="w-full mt-4 space-y-3">
            {results.map(r => (
              <li key={r.id} className="p-4 rounded-lg bg-gradient-to-r from-blue-100 via-fuchsia-100 to-pink-100 shadow">
                <div className="font-bold text-lg">{r.title} <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded ml-2">{r.type_}</span></div>
                <div className="text-gray-700 text-sm mt-1">{r.snippet}</div>
              </li>
            ))}
          </ul>
        )}
        {results.length === 0 && !loading && (
          <p className="text-gray-600 text-lg mb-2">Try searching for a repo, user, or proposal.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
