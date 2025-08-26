
import React from "react";

export default function Help() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-fuchsia-900 to-pink-900">
      <div className="bg-white/10 shadow-2xl rounded-3xl p-12 max-w-2xl w-full flex flex-col items-center text-center backdrop-blur-2xl border border-white/20">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
          Help & FAQ
        </h2>
        <p className="text-white/80 mb-8">Platform guide, tutorials, support info.</p>
        {/* Add FAQ accordion or support links here */}
      </div>
    </main>
  );
}
