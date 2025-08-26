import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Repositories", path: "/repositories" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Profile", path: "/profile" },
  { name: "Help", path: "/help" },
];

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-pink-900/80 backdrop-blur-xl shadow-2xl z-40 flex flex-col border-r border-white/10">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <span className="font-extrabold text-2xl bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
          <span className="inline-block align-middle mr-2">⚡</span>AI Bot
        </span>
        <button
          onClick={toggleTheme}
          className="ml-2 p-2 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white shadow-lg border border-white/20 hover:scale-110 transition-transform"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
      <nav className="flex-1 py-8 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 tracking-wide shadow-md hover:scale-105 hover:bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:text-white ${
              location.pathname === item.path
                ? "bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white shadow-lg border border-white/20"
                : "text-white/80 bg-white/5 border border-white/10"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
