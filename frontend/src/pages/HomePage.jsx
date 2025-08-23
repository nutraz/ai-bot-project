import React from 'react'
import Hero from '../components/sections/Hero'
import Features from '../components/sections/Features'
import Showcase from '../components/sections/Showcase'
import CTA from '../components/sections/CTA'

const HomePage = () => {
	return (
		<div className="space-y-10">
			<Hero />
			<div className="max-w-6xl mx-auto px-2 md:px-0">
				<Features />
				<Showcase />
				<CTA />
			</div>
		</div>
	)
}

export default HomePage
