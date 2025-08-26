

import React from "react";

export default function Dashboard() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#101014] overflow-hidden">
      <main className="flex flex-col items-center justify-center w-full min-h-screen px-4 py-24">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-8 drop-shadow-2xl tracking-tight text-center" style={{letterSpacing: '-0.03em'}}>
            Your Dashboard
          </h1>
          <div className="bg-white/10 shadow-2xl rounded-3xl p-12 w-full flex flex-col items-center text-center backdrop-blur-2xl border border-white/20">
            <p className="text-white/80 mb-8 text-lg">
              Manage your projects, ideas, and notifications in one place.
            </p>
            {/* Add animated stats, project cards, quick links here */}
          </div>
        </div>
      </main>
    </div>
  );
}
