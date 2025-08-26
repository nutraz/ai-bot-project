
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-fuchsia-900 to-gray-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-500/30 via-blue-500/20 to-transparent" />
      <div className="z-10 flex flex-col items-center gap-8 py-24 px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent drop-shadow-xl animate-pulse">
          The AI-Powered Web3 Dev Hub
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-2xl text-white/80 font-medium">
          Build, share, and monetize your open-source projects on-chain.<br />
          Collaborate, connect, and launch the next big thing—fully decentralized, with AI at your side.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Link to="/repo/create" className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-fuchsia-600 text-white font-bold text-lg shadow-lg transition-all duration-200">
            🚀 Create Repository
          </Link>
          <Link to="/repositories" className="px-8 py-4 rounded-xl bg-fuchsia-600 hover:bg-blue-600 text-white font-bold text-lg shadow-lg transition-all duration-200">
            🌐 Explore Projects
          </Link>
        </div>
        <div className="mt-10 flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="bg-white/10 rounded-2xl p-6 shadow-lg max-w-xs text-center">
            <div className="text-3xl mb-2">🤖</div>
            <div className="font-bold text-lg mb-1">AI Assistant</div>
            <div className="text-white/70 text-sm">Get code suggestions, auto-generate docs, and triage issues with AI.</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-6 shadow-lg max-w-xs text-center">
            <div className="text-3xl mb-2">🔗</div>
            <div className="font-bold text-lg mb-1">Web3 Identity</div>
            <div className="text-white/70 text-sm">Sign in with your wallet or Internet Identity. Own your code, on-chain.</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-6 shadow-lg max-w-xs text-center">
            <div className="text-3xl mb-2">💸</div>
            <div className="font-bold text-lg mb-1">Monetize & Collaborate</div>
            <div className="text-white/70 text-sm">Share, sell, and collaborate on projects with built-in revenue sharing.</div>
          </div>
        </div>
      </div>
    </main>
  );
}
