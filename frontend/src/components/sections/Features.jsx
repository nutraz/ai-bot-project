import React from 'react'
import { ShieldCheck, Boxes, Lock, Zap, Search, CircuitBoard } from 'lucide-react'

const features = [
  { icon: ShieldCheck, title: 'On-chain Proofs', desc: 'Every commit notarized on ICP with verifiable integrity.' },
  { icon: Boxes, title: 'Decentralized Storage', desc: 'Assets and metadata distributed—no single point of failure.' },
  { icon: Lock, title: 'Keyed Access', desc: 'Fine-grained keys for repos, CI, and bots with revocation.' },
  { icon: Zap, title: 'Blazing DX', desc: 'Familiar Git flows. Zero servers with canister logic.' },
  { icon: Search, title: 'Tamper-evident Audit', desc: 'Global timeline of changes—transparent and queryable.' },
  { icon: CircuitBoard, title: 'DAO Ready', desc: 'Govern repositories and orgs with on-chain proposals.' },
]

const Features = () => (
  <section id="features" className="mt-12">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 text-center">
        Build in public. Verifiably.
      </h2>
      <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
        OpenKeyHub pairs the Internet Computer’s infinite scalability with a developer-first UX.
      </p>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="group rounded-xl border bg-white p-6 hover:shadow-xl transition">
            <div className="h-12 w-12 rounded-lg bg-blue-600/10 text-blue-700 flex items-center justify-center group-hover:scale-105 transition">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-600">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Features
