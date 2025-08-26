import React, { useEffect, useState } from "react";
import { getRepos, addRepo, removeRepo, seedDemoRepos, clearRepos } from "../lib/demoStore";
import { PlusCircle, GitBranch, Star, Clock, Trash2, Sparkles, RotateCcw, Search } from "lucide-react";

function RepositoriesPage() {
	const [repos, setRepos] = useState([]);
	const [name, setName] = useState("");
	const [desc, setDesc] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

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

	const filteredRepos = repos.filter(repo => 
		repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		(repo.desc && repo.desc.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
			<div className="container mx-auto px-4 py-8">
				{/* Header Section */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
						<GitBranch className="inline-block h-12 w-12 mr-4 text-blue-600" />
						Repositories
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Create, manage, and explore repositories on the decentralized web. 
						All code is verifiable on-chain.
					</p>
				</div>

				{/* Search Bar */}
				<div className="max-w-md mx-auto mb-8">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input
							type="text"
							placeholder="Search repositories..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
						/>
					</div>
				</div>

				{/* Create Repository Form */}
				<div className="max-w-4xl mx-auto mb-12">
					<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
						<h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
							<PlusCircle className="h-6 w-6 mr-2 text-blue-600" />
							Create New Repository
						</h2>
						<form onSubmit={onCreate} className="grid gap-4 md:grid-cols-3">
							<div>
								<label htmlFor="repo-name" className="block text-sm font-medium text-gray-700 mb-2">Repository Name</label>
								<input 
									id="repo-name"
									value={name} 
									onChange={(e) => setName(e.target.value)} 
									placeholder="owner/repository-name" 
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									required
								/>
							</div>
							<div>
								<label htmlFor="repo-desc" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
								<input 
									id="repo-desc"
									value={desc} 
									onChange={(e) => setDesc(e.target.value)} 
									placeholder="Brief description (optional)" 
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
								/>
							</div>
							<div className="flex items-end">
								<button 
									type="submit" 
									className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
								>
									Create Repository
								</button>
							</div>
						</form>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex justify-center gap-4 mb-12">
					<button
						onClick={() => { seedDemoRepos(); setRepos(getRepos()) }}
						className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
						title="Add sample repositories to explore"
					>
						<Sparkles className="h-5 w-5" />
						Seed Demo Data
					</button>
					<button
						onClick={() => { clearRepos(); setRepos(getRepos()) }}
						className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
						title="Clear all repositories"
					>
						<RotateCcw className="h-5 w-5" />
						Reset All
					</button>
				</div>

				{/* Repositories Grid */}
				{filteredRepos.length === 0 ? (
					<div className="text-center py-16">
						<GitBranch className="h-24 w-24 text-gray-300 mx-auto mb-6" />
						<h3 className="text-2xl font-semibold text-gray-700 mb-2">
							{searchTerm ? 'No repositories found' : 'No repositories yet'}
						</h3>
						<p className="text-gray-500 mb-8 max-w-md mx-auto">
							{searchTerm 
								? `No repositories match "${searchTerm}". Try a different search term.`
								: 'Get started by creating your first repository or seeding demo data.'
							}
						</p>
						{!searchTerm && (
							<button
								onClick={() => { seedDemoRepos(); setRepos(getRepos()) }}
								className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
							>
								<Sparkles className="h-5 w-5" />
								Seed Demo Data
							</button>
						)}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredRepos.map((repo) => (
							<div 
								key={repo.id} 
								className="group bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
							>
								<div className="flex items-start justify-between mb-4">
									<div className="flex-1">
										<h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
											{repo.name}
										</h3>
										{repo.desc && (
											<p className="text-gray-600 mt-2 text-sm leading-relaxed">
												{repo.desc}
											</p>
										)}
									</div>
									<button 
										onClick={() => onRemove(repo.id)}
										className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
										title="Delete repository"
									>
										<Trash2 className="h-5 w-5" />
									</button>
								</div>
								
								<div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
									<div className="flex items-center gap-1">
										<Star className="h-4 w-4 text-yellow-500" />
										<span>{repo.stars || 0}</span>
									</div>
									<div className="flex items-center gap-1">
										<Clock className="h-4 w-4" />
										<span>{new Date(repo.updatedAt || repo.createdAt).toLocaleDateString()}</span>
									</div>
								</div>
								
								<div className="flex gap-2">
									<button className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium">
										Open
									</button>
									<button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
										Clone
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default RepositoriesPage;