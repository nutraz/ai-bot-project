import React from 'react'
import { GitBranch, ShieldCheck, Flame, Globe2 } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-700 text-white p-8 md:p-12">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <Flame className="h-3.5 w-3.5" />
            <span>On-chain verifiable repositories</span>
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            OpenKeyHub
            <span className="block text-white/90 font-semibold">Decentralized GitHub on ICP</span>
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-xl">
            Censorship-resistant, tamper-evident code hosting powered by Internet Computer Protocol. Build in public, verifiably.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#demo" className="inline-flex items-center rounded-lg bg-white text-blue-700 px-5 py-3 font-semibold shadow-sm hover:bg-blue-50 transition">
              Try Demo
            </a>
            <a href="#features" className="inline-flex items-center rounded-lg border border-white/40 px-5 py-3 font-semibold hover:bg-white/10 transition">
              Learn more
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 text-left">
            {[{label:'Repos',value:'12k+'},{label:'Contributors',value:'4.8k'},{label:'Commits on-chain',value:'2.1M'}].map((s)=> (
              <div key={s.label} className="rounded-lg bg-white/10 p-4">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-white/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="rounded-xl bg-black/30 backdrop-blur border border-white/20 p-4 shadow-2xl">
            <div className="flex items-center gap-2 text-white/80 mb-3">
              <GitBranch className="h-4 w-4" /> <span className="text-sm">git push origin icp</span>
            </div>
            <pre className="bg-black/40 text-green-200 text-xs md:text-sm p-4 rounded-lg overflow-x-auto">
{`dfx canister call repo_manager commit '{
  repoId = 42;
  hash = "0x8f...be";
  author = principal "aaaa-bbbb-cccc";
  message = "feat: on-chain CI";
}'`}
            </pre>
            <div className="mt-3 grid grid-cols-3 gap-2 text-white/80 text-xs">
              <div className="flex items-center gap-1"><ShieldCheck className="h-4 w-4"/>Integrity</div>
              <div className="flex items-center gap-1"><Globe2 className="h-4 w-4"/>Censorship‑resistant</div>
              <div className="flex items-center gap-1"><GitBranch className="h-4 w-4"/>DAO‑Governed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
