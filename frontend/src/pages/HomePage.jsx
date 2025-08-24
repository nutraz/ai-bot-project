import React from 'react'
import { useNavigate } from 'react-router-dom'
import { seedDemoRepos } from '../lib/demoStore'
import Hero from '../components/sections/Hero'
import Features from '../components/sections/Features'
import Showcase from '../components/sections/Showcase'
import CTA from '../components/sections/CTA'


const HomePage = () => {
	const navigate = useNavigate();
	const onTryDemo = () => {
		seedDemoRepos();
		navigate('/repositories');
	};
	return (
		<div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-fuchsia-50 to-pink-50 animate-gradient-x">
			<div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-br from-blue-200/30 via-fuchsia-200/30 to-pink-200/30 blur-2xl opacity-70 animate-pulse" />
			<div className="relative z-10 w-full space-y-10 py-16">
				<Hero onTryDemo={onTryDemo} />
				<div className="max-w-6xl mx-auto px-2 md:px-0">
					<Features />
					<Showcase />
					<CTA onTryDemo={onTryDemo} />
				</div>
			</div>
		</div>
	);
}

export default HomePage
