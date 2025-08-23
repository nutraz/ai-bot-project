import React from 'react'

const CTA = ({ onTryDemo }) => (
  <section className="mt-16 mb-8">
    <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-10 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <h3 className="text-2xl md:text-3xl font-bold">Ship verifiable software today</h3>
        <p className="text-white/80 mt-2">Start with demo mode—no wallet required. Flip to ICP when ready.</p>
      </div>
      <div className="flex gap-3">
        <button onClick={onTryDemo} className="rounded-lg bg-white text-gray-900 px-5 py-3 font-semibold hover:bg-gray-100">Try Demo</button>
        <a href="#" className="rounded-lg border border-white/30 px-5 py-3 font-semibold hover:bg-white/10">Docs</a>
      </div>
    </div>
  </section>
)

export default CTA
