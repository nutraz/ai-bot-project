

export default function Home() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-blue-950 to-pink-950 py-12">
      <section className="w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent drop-shadow-xl tracking-tight animate-gradient-x">
          We Bring Together
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-4">
          To fund vital infrastructure, 100% community owned, where 100% of the profits goes back to participants.
        </p>
        <div className="flex flex-col items-center gap-6">
          <div className="rounded-2xl bg-gradient-to-br from-blue-900 via-fuchsia-900 to-pink-900 p-8 shadow-2xl border border-white/10 flex flex-col items-center">
            <span className="text-7xl md:text-8xl text-blue-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25M12 18.75V21M4.219 4.219l1.591 1.591M18.19 18.19l1.591 1.591M3 12h2.25M18.75 12H21M4.219 19.781l1.591-1.591M18.19 5.81l1.591-1.591M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
              </svg>
            </span>
            <a href="#get-started" className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-fuchsia-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-transform text-lg mt-2">Get Started</a>
          </div>
        </div>
      </section>
      <footer className="w-full max-w-5xl mx-auto mt-16 text-center text-white/70 border-t border-white/10 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div>
            <span className="font-bold text-white">OpenKeyHub</span> &mdash; A decentralized GitHub alternative built on the Internet Computer Protocol, providing censorship-resistant, on-chain-verifiable code repositories.
          </div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:underline">Docs</a>
            <a href="#" className="hover:underline">API</a>
            <a href="#" className="hover:underline">Community</a>
          </div>
        </div>
        <div className="mt-4 text-xs text-white/40">&copy; 2025 OpenKeyHub. All rights reserved.</div>
      </footer>
    </main>
  );
}
