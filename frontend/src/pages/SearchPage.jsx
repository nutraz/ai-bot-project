import React from 'react';

const SearchPage = () => (
  <div className="p-6 min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-fuchsia-50 to-pink-50">
    <div className="max-w-xl w-full bg-white/80 rounded-2xl shadow-xl p-8 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse tracking-tight">
        <span role="img" aria-label="search" className="mr-2">🔎</span>Search Results
      </h1>
      <p className="text-gray-600 text-lg mb-2">Search functionality coming soon.</p>
    </div>
  </div>
);

export default SearchPage;
