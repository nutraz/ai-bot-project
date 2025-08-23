import React from 'react'
import { Star, GitBranch, Clock } from 'lucide-react'

const repos = [
  { name: 'openkeyhub/okh-core', stars: 1234, updated: '2h ago', desc: 'Core canisters and repo manager' },
  { name: 'openkeyhub/okh-ui', stars: 842, updated: '1d ago', desc: 'Beautiful, composable frontend' },
  { name: 'openkeyhub/okh-agents', stars: 512, updated: '3d ago', desc: 'Automation and CI bots' },
]

const Showcase = () => (
  <section id="demo" className="mt-12">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending on OpenKeyHub</h2>
        <a href="#" className="text-blue-700 font-semibold hover:underline">Explore all</a>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {repos.map((r) => (
          <div key={r.name} className="rounded-xl border bg-white p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-gray-900">{r.name}</div>
                <p className="text-sm text-gray-600 mt-1">{r.desc}</p>
              </div>
              <GitBranch className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500" /> {r.stars}</div>
              <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {r.updated}</div>
            </div>
            <button className="mt-6 w-full rounded-lg bg-gray-900 text-white py-2 font-semibold hover:bg-gray-800">Open</button>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Showcase
