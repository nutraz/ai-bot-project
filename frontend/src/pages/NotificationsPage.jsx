import React from "react";

export default function NotificationsPage() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
			<div className="bg-white/10 shadow-2xl rounded-3xl p-12 max-w-xl w-full flex flex-col items-center text-center backdrop-blur-2xl border border-white/20">
				<h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight animate-fade-in">
					<span role="img" aria-label="bell" className="mr-2">🔔</span>Notifications
				</h2>
				<p className="text-white/80 mb-2 text-lg">No notifications yet. Stay tuned for updates!</p>
			</div>
		</main>
	);
}
