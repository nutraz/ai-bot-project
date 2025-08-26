import React from 'react'
import { Star, GitBranch, Clock, ExternalLink } from 'lucide-react'

const repos = [
  { name: 'openkeyhub/okh-core', stars: 1234, updated: '2h ago', desc: 'Core canisters and repo manager', language: 'Motoko' },
  { name: 'openkeyhub/okh-ui', stars: 842, updated: '1d ago', desc: 'Beautiful, composable frontend', language: 'React' },
  { name: 'openkeyhub/okh-agents', stars: 512, updated: '3d ago', desc: 'Automation and CI bots', language: 'TypeScript' },
]

const languageColors = {
  'Motoko': 'bg-blue-500',
  'React': 'bg-cyan-500', 
  'TypeScript': 'bg-blue-600',
}

const Showcase = () => (
  <section id="demo" className="mt-12">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending on OpenKeyHub</h2>
        <a href="#" className="text-blue-700 font-semibold hover:underline flex items-center gap-1">
          Explore all <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {repos.map((r) => (
          <div key={r.name} className="rounded-xl border bg-white p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{r.name}</div>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{r.desc}</p>
              </div>
              <GitBranch className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500" /> {r.stars}</div>
              <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {r.updated}</div>
              <div className="flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${languageColors[r.language]}`}></div>
                <span className="text-xs">{r.language}</span>
              </div>
            </div>
            <button className="mt-6 w-full rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02]">
              Open Repository
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Showcase
