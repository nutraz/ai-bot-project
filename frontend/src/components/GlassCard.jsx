import React from "react";

export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-lg shadow-2xl border border-white/20 p-6 ${className}`}
      style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
    >
      {children}
    </div>
  );
}
