
import React from "react";

export default function Dashboard() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-fuchsia-50 to-pink-50">
      <div className="bg-white/80 shadow-xl rounded-2xl p-10 max-w-2xl w-full flex flex-col items-center text-center backdrop-blur-md">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
          Your Dashboard
        </h2>
        <p className="text-gray-700 mb-8">Here you can manage your projects, ideas, and notifications.</p>
        {/* List projects, ideas, notifications, etc. */}
      </div>
    </main>
  );
}
