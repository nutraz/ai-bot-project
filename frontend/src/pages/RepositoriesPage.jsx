
import React, { useEffect, useState } from "react";
import { getRepos, addRepo, removeRepo, seedDemoRepos, clearRepos } from "../lib/demoStore";

function RepositoriesPage() {
	const [repos, setRepos] = useState([]);
	const [name, setName] = useState("");
	const [desc, setDesc] = useState("");

	useEffect(() => {
		setRepos(getRepos());
	}, []);

	const onCreate = (e) => {
		e.preventDefault();
		if (!name.trim()) return;
		addRepo({ name, desc });
		setRepos(getRepos());
		setName("");
		setDesc("");
	};

	const onRemove = (id) => {
		removeRepo(id);
		setRepos(getRepos());
	};

	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center bg-[#101014] overflow-hidden">
			<main className="flex flex-col items-center justify-center w-full min-h-screen px-4 py-24">
				<div className="w-full max-w-5xl mx-auto flex flex-col items-center">
					<h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-8 drop-shadow-2xl tracking-tight text-center" style={{letterSpacing: '-0.03em'}}>
						<span role="img" aria-label="rocket" className="mr-2">�</span>Repositories
					</h1>
					<form onSubmit={onCreate} className="mb-10 grid gap-4 md:grid-cols-3 w-full">
						<input value={name} onChange={(e)=>setName(e.target.value)} placeholder="owner/name" className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-white/10 text-white placeholder:text-white/60" />
						<input value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="description (optional)" className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none transition-all bg-white/10 text-white placeholder:text-white/60" />
						<button type="submit" className="rounded-lg bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white px-6 py-3 font-extrabold shadow-lg hover:from-fuchsia-600 hover:to-pink-600 hover:scale-105 transition-transform">Create</button>
					</form>
					<div className="flex gap-4 mb-10">
						<button
							onClick={() => { seedDemoRepos(); setRepos(getRepos()) }}
							className="rounded-lg border px-4 py-2 text-base bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
							title="Seed a few sample repositories"
						>
							<span role="img" aria-label="sparkles" className="mr-1">✨</span>Seed demo
						</button>
						<button
							onClick={() => { clearRepos(); setRepos(getRepos()) }}
							className="rounded-lg border px-4 py-2 text-base bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
							title="Clear local demo data"
						>
							<span role="img" aria-label="reset" className="mr-1">🔄</span>Reset demo
						</button>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
						{repos.length === 0 && (
							<div className="text-white/70 text-lg animate-pulse flex items-center gap-2">
								<span role="img" aria-label="search">🔍</span>No repositories yet. Use <span className="font-bold text-blue-400">Seed demo</span> or create one above.
							</div>
						)}
						{repos.map((r) => (
							<div key={r.id} className="rounded-3xl border-2 border-gradient-to-r from-blue-400 to-fuchsia-400 bg-white/10 p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-300 group relative overflow-hidden backdrop-blur-xl">
								<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-200/20 via-fuchsia-200/20 to-pink-200/20 pointer-events-none z-0" />
								<div className="flex items-start justify-between relative z-10">
									<div>
										<div className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-fuchsia-400 to-pink-400 drop-shadow-lg">{r.name}</div>
										{r.desc && <p className="text-base text-white/80 mt-1 italic">{r.desc}</p>}
									</div>
									<button onClick={()=>onRemove(r.id)} className="text-red-400 font-bold hover:underline hover:scale-110 transition-transform">Remove</button>
								</div>
								<div className="mt-3 text-xs text-white/60 flex items-center gap-2">
									<span role="img" aria-label="star">⭐</span>Stars: {r.stars} · <span role="img" aria-label="clock">⏰</span>Updated: {new Date(r.updatedAt || r.createdAt).toLocaleString()}
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}

export default RepositoriesPage;
