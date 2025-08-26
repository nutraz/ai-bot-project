import React, { useState, useEffect } from 'react';
import { User, GitBranch, Star, Calendar, Settings, Edit3, Github, Globe, Mail } from 'lucide-react';
import authService from '../services/auth';

const ProfilePage = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [principal, setPrincipal] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [profile, setProfile] = useState({
		displayName: '',
		bio: '',
		location: '',
		website: '',
		email: '',
		githubUsername: ''
	});

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await authService.init();
				setIsAuthenticated(authService.getIsAuthenticated());
				setPrincipal(authService.getPrincipal());
			} catch (error) {
				console.error('Auth check failed:', error);
			}
		};
		checkAuth();
	}, []);

	const handleSaveProfile = () => {
		// In a real app, this would save to the backend
		console.log('Saving profile:', profile);
		setIsEditing(false);
	};

	const stats = [
		{ label: 'Repositories', value: '12', icon: GitBranch },
		{ label: 'Stars Earned', value: '1.2k', icon: Star },
		{ label: 'Contributions', value: '847', icon: Calendar },
		{ label: 'Followers', value: '156', icon: User }
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
			<div className="container mx-auto px-4 py-8">
				{/* Profile Header */}
				<div className="max-w-4xl mx-auto">
					<div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
						{/* Cover Photo */}
						<div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative">
							<div className="absolute top-4 right-4">
								<button
									onClick={() => setIsEditing(!isEditing)}
									className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur text-white rounded-lg hover:bg-white/20 transition-colors"
								>
									<Edit3 className="h-4 w-4" />
									{isEditing ? 'Cancel' : 'Edit Profile'}
								</button>
							</div>
						</div>

						<div className="px-6 pb-6">
							{/* Profile Picture & Basic Info */}
							<div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
								<div className="relative">
									<div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
										<User className="h-16 w-16 text-white" />
									</div>
									{isAuthenticated && (
										<div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
											<div className="w-3 h-3 bg-white rounded-full"></div>
										</div>
									)}
								</div>

								<div className="flex-1 md:mb-4">
									{isEditing ? (
										<div className="space-y-4">
											<input
												type="text"
												placeholder="Display Name"
												value={profile.displayName}
												onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
												className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											/>
											<textarea
												placeholder="Bio"
												value={profile.bio}
												onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
												className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
												rows="3"
											/>
										</div>
									) : (
										<div>
											<h1 className="text-3xl font-bold text-gray-900 mb-2">
												{profile.displayName || 'Anonymous Developer'}
											</h1>
											<p className="text-gray-600 mb-4">
												{profile.bio || 'Building the future on the Internet Computer Protocol. Passionate about decentralized technologies and open source.'}
											</p>
										</div>
									)}

									{isAuthenticated && (
										<div className="flex items-center gap-2 text-sm text-gray-500">
											<User className="h-4 w-4" />
											<span className="font-mono">{principal}</span>
										</div>
									)}
								</div>

								{isEditing && (
									<div className="md:mb-4">
										<button
											onClick={handleSaveProfile}
											className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
										>
											Save Changes
										</button>
									</div>
								)}
							</div>

							{/* Contact Info */}
							{isEditing ? (
								<div className="mt-6 grid md:grid-cols-2 gap-4">
									<div className="flex items-center gap-3">
										<Mail className="h-5 w-5 text-gray-400" />
										<input
											type="email"
											placeholder="Email"
											value={profile.email}
											onChange={(e) => setProfile({ ...profile, email: e.target.value })}
											className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>
									<div className="flex items-center gap-3">
										<Globe className="h-5 w-5 text-gray-400" />
										<input
											type="url"
											placeholder="Website"
											value={profile.website}
											onChange={(e) => setProfile({ ...profile, website: e.target.value })}
											className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>
									<div className="flex items-center gap-3">
										<Github className="h-5 w-5 text-gray-400" />
										<input
											type="text"
											placeholder="GitHub username"
											value={profile.githubUsername}
											onChange={(e) => setProfile({ ...profile, githubUsername: e.target.value })}
											className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>
									<div className="flex items-center gap-3">
										<Calendar className="h-5 w-5 text-gray-400" />
										<input
											type="text"
											placeholder="Location"
											value={profile.location}
											onChange={(e) => setProfile({ ...profile, location: e.target.value })}
											className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>
								</div>
							) : (
								<div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
									{profile.email && (
										<div className="flex items-center gap-2">
											<Mail className="h-4 w-4" />
											<span>{profile.email}</span>
										</div>
									)}
									{profile.website && (
										<div className="flex items-center gap-2">
											<Globe className="h-4 w-4" />
											<a href={profile.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
												{profile.website}
											</a>
										</div>
									)}
									{profile.githubUsername && (
										<div className="flex items-center gap-2">
											<Github className="h-4 w-4" />
											<a href={`https://github.com/${profile.githubUsername}`} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
												@{profile.githubUsername}
											</a>
										</div>
									)}
									{profile.location && (
										<div className="flex items-center gap-2">
											<Calendar className="h-4 w-4" />
											<span>{profile.location}</span>
										</div>
									)}
								</div>
							)}
						</div>
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
						{stats.map((stat) => (
							<div key={stat.label} className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
								<stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
								<div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
								<div className="text-sm text-gray-600">{stat.label}</div>
							</div>
						))}
					</div>

					{/* Recent Activity */}
					<div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
						<h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
							<Calendar className="h-6 w-6 mr-2 text-blue-600" />
							Recent Activity
						</h2>
						<div className="space-y-4">
							{[
								{ action: 'Created repository', target: 'openkeyhub/awesome-project', time: '2 hours ago' },
								{ action: 'Starred repository', target: 'icp/motoko', time: '1 day ago' },
								{ action: 'Pushed commit', target: 'openkeyhub/ui-components', time: '2 days ago' },
								{ action: 'Opened issue', target: 'community/feedback', time: '3 days ago' }
							].map((activity, index) => (
								<div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
										<div>
											<span className="text-gray-900">{activity.action} </span>
											<span className="font-semibold text-blue-600">{activity.target}</span>
										</div>
									</div>
									<span className="text-sm text-gray-500">{activity.time}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
