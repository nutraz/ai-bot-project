import React, { useEffect, useState } from 'react'
import { getRepos, addRepo, removeRepo } from '../lib/demoStore'

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
			<h1 className="text-2xl font-bold">Repositories</h1>
			<form onSubmit={onCreate} className="mt-6 grid gap-3 md:grid-cols-3">
				<input value={name} onChange={(e)=>setName(e.target.value)} placeholder="owner/name" className="border rounded-lg px-3 py-2" />
				<input value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="description (optional)" className="border rounded-lg px-3 py-2" />
				<button type="submit" className="rounded-lg bg-blue-600 text-white px-4 py-2 font-semibold hover:bg-blue-700">Create</button>
			</form>

			<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
				{repos.length === 0 && (
					<div className="text-gray-600">No repositories yet. Use Try Demo or create one above.</div>
				)}
				{repos.map((r) => (
					<div key={r.id} className="rounded-xl border bg-white p-5">
						<div className="flex items-start justify-between">
							<div>
								<div className="font-semibold text-gray-900">{r.name}</div>
								{r.desc && <p className="text-sm text-gray-600 mt-1">{r.desc}</p>}
							</div>
							<button onClick={()=>onRemove(r.id)} className="text-red-600 hover:underline">Remove</button>
						</div>
						<div className="mt-3 text-xs text-gray-500">Stars: {r.stars} · Updated: {new Date(r.updatedAt || r.createdAt).toLocaleString()}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default RepositoriesPage
