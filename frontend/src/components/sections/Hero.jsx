import React from 'react'
import { GitBranch, ShieldCheck, Flame, Globe2, Users, Activity } from 'lucide-react'

const Hero = ({ onTryDemo }) => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-8 md:p-12 shadow-2xl">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 blur-2xl animate-spin-slow" />

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur border border-white/20">
            <Flame className="h-4 w-4 text-orange-400" />
            <span>On-chain verifiable repositories</span>
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="block bg-gradient-to-r from-white via-blue-100 to-fuchsia-100 bg-clip-text text-transparent">
              OpenKeyHub
            </span>
            <span className="block text-white/90 font-semibold text-2xl md:text-3xl mt-2">
              Decentralized GitHub on ICP
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
            Censorship-resistant, tamper-evident code hosting powered by Internet Computer Protocol. 
            <span className="font-semibold text-blue-200"> Build in public, verifiably.</span>
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onTryDemo}
              className="group inline-flex items-center rounded-lg bg-white text-blue-700 px-6 py-3 font-semibold shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
              Try Demo
              <GitBranch className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            </button>
            <a 
              href="#features" 
              className="inline-flex items-center rounded-lg border border-white/40 px-6 py-3 font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur"
            >
              Learn more
            </a>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              {label:'Active Repos',value:'12k+', icon: GitBranch},
              {label:'Contributors',value:'4.8k', icon: Users},
              {label:'Commits on-chain',value:'2.1M', icon: Activity}
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-white/10 backdrop-blur p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="h-4 w-4 text-blue-200" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                </div>
                <div className="text-xs text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="rounded-xl bg-black/30 backdrop-blur border border-white/20 p-6 shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <div className="flex items-center gap-2 text-white/80 mb-4">
              <GitBranch className="h-5 w-5 text-green-400" /> 
              <span className="text-sm font-mono">git push origin icp</span>
              <div className="ml-auto flex gap-1">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <pre className="bg-black/40 text-green-300 text-xs md:text-sm p-4 rounded-lg overflow-x-auto font-mono border border-green-500/20">
{`dfx canister call repo_manager commit '{
  repoId = 42;
  hash = "0x8f...be";
  author = principal "aaaa-bbbb-cccc";
  message = "feat: on-chain CI";
  timestamp = 1704067200;
}'

✓ Commit verified on-chain
✓ Merkle proof generated  
✓ IPFS hash: QmX...7z`}
            </pre>
            <div className="mt-4 grid grid-cols-3 gap-2 text-white/80 text-xs">
              <div className="flex items-center gap-1 p-2 rounded bg-white/5">
                <ShieldCheck className="h-4 w-4 text-green-400"/>
                <span>Integrity</span>
              </div>
              <div className="flex items-center gap-1 p-2 rounded bg-white/5">
                <Globe2 className="h-4 w-4 text-blue-400"/>
                <span>Decentralized</span>
              </div>
              <div className="flex items-center gap-1 p-2 rounded bg-white/5">
                <GitBranch className="h-4 w-4 text-purple-400"/>
                <span>DAO‑Governed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
