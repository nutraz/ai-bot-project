import React from "react";

export default function Settings() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
      <div className="bg-white/10 shadow-2xl rounded-3xl p-12 max-w-xl w-full flex flex-col items-center text-center backdrop-blur-2xl border border-white/20">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
          Account Settings
        </h2>
        <p className="text-white/80 mb-6">Manage your account, security, notifications, and wallet.</p>
        {/* Add settings forms and controls here */}
      </div>
    </main>
  );
}
