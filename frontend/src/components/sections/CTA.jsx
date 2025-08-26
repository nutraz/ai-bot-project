import React from 'react'
import { ArrowRight, BookOpen } from 'lucide-react'

const CTA = ({ onTryDemo }) => (
  <section className="mt-16 mb-8">
    <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 p-8 md:p-10 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-2xl border border-white/10">
      <div className="flex-1">
        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Ship verifiable software today
        </h3>
        <p className="text-white/80 mt-2 text-lg">
          Start with demo mode—no wallet required. Flip to ICP when ready.
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm text-white/70">
          <span>✓ No setup required</span>
          <span>✓ Instant deployment</span>
          <span>✓ Full Git compatibility</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button 
          onClick={onTryDemo} 
          className="group rounded-lg bg-white text-gray-900 px-6 py-3 font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          Try Demo
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <a 
          href="#" 
          className="group rounded-lg border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
        >
          <BookOpen className="h-4 w-4" />
          Documentation
        </a>
      </div>
    </div>
  </section>
)

export default CTA
