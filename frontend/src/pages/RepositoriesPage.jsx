import React, { useEffect, useState } from 'react'
import { getRepos, addRepo, removeRepo, seedDemoRepos, clearRepos } from '../lib/demoStore'

const RepositoriesPage = () => {
	const [repos, setRepos] = useState([])
	const [name, setName] = useState('')
	const [desc, setDesc] = useState('')

	useEffect(() => {
		setRepos(getRepos())
	}, [])

	const onCreate = (e) => {
		e.preventDefault()
		if (!name.trim()) return
		addRepo({ name, desc })
		setRepos(getRepos())
		setName('')
		setDesc('')
	}

	const onRemove = (id) => {
		removeRepo(id)
		setRepos(getRepos())
	}

	return (
		<div className="max-w-6xl mx-auto p-6">
				<div className="flex items-center justify-between gap-3">
					<h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse tracking-tight">
						<span role="img" aria-label="rocket" className="mr-2">🚀</span>
						Repositories
					</h1>
					<div className="flex gap-2">
						<button
							onClick={() => { seedDemoRepos(); setRepos(getRepos()) }}
							className="rounded-lg border px-3 py-2 text-sm hover:bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white font-bold shadow-lg transition-transform transform hover:scale-105 hover:from-fuchsia-500 hover:to-pink-500"
							title="Seed a few sample repositories"
						>
							<span role="img" aria-label="sparkles" className="mr-1">✨</span>Seed demo
						</button>
						<button
							onClick={() => { clearRepos(); setRepos(getRepos()) }}
							className="rounded-lg border px-3 py-2 text-sm hover:bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold shadow-lg transition-transform transform hover:scale-105 hover:from-blue-500 hover:to-fuchsia-500"
							title="Clear local demo data"
						>
							<span role="img" aria-label="reset" className="mr-1">🔄</span>Reset demo
						</button>
					</div>
				</div>
			<form onSubmit={onCreate} className="mt-6 grid gap-3 md:grid-cols-3">
				<input value={name} onChange={(e)=>setName(e.target.value)} placeholder="owner/name" className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
				<input value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="description (optional)" className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none transition-all" />
				<button type="submit" className="rounded-lg bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white px-4 py-2 font-extrabold shadow-lg hover:from-fuchsia-600 hover:to-pink-600 hover:scale-105 transition-transform">Create</button>
			</form>

			<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
				{repos.length === 0 && (
					<div className="text-gray-600 text-lg animate-pulse flex items-center gap-2">
						<span role="img" aria-label="search">🔍</span>No repositories yet. Use <span className="font-bold text-blue-500">Seed demo</span> or create one above.
					</div>
				)}
				{repos.map((r) => (
					<div key={r.id} className="rounded-2xl border-2 border-gradient-to-r from-blue-400 to-fuchsia-400 bg-white p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 group relative overflow-hidden">
						<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-100 via-fuchsia-100 to-pink-100 pointer-events-none z-0" />
						<div className="flex items-start justify-between relative z-10">
							<div>
								<div className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-fuchsia-500 to-pink-500 drop-shadow-lg">{r.name}</div>
								{r.desc && <p className="text-base text-gray-600 mt-1 italic">{r.desc}</p>}
							</div>
							<button onClick={()=>onRemove(r.id)} className="text-red-600 font-bold hover:underline hover:scale-110 transition-transform">Remove</button>
						</div>
						<div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
							<span role="img" aria-label="star">⭐</span>Stars: {r.stars} · <span role="img" aria-label="clock">⏰</span>Updated: {new Date(r.updatedAt || r.createdAt).toLocaleString()}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default RepositoriesPage
