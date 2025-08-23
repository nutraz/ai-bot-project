import React from 'react'
import { useNavigate } from 'react-router-dom'
import { seedDemoRepos } from '../lib/demoStore'
import Hero from '../components/sections/Hero'
import Features from '../components/sections/Features'
import Showcase from '../components/sections/Showcase'
import CTA from '../components/sections/CTA'

const HomePage = () => {
	const navigate = useNavigate()
	const onTryDemo = () => {
		seedDemoRepos()
		navigate('/repositories')
	}
	return (
		<div className="space-y-10">
			<Hero onTryDemo={onTryDemo} />
			<div className="max-w-6xl mx-auto px-2 md:px-0">
				<Features />
				<Showcase />
				<CTA onTryDemo={onTryDemo} />
			</div>
		</div>
	)
}

export default HomePage
