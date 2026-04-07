import { useState } from 'react'

export default function EarlyAccess() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        alert('Something went wrong. Please email us at hello@datashuttle.ai')
      }
    } catch {
      alert('Network error. Please email us at hello@datashuttle.ai')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="early-access" className="relative bg-slate-950 py-32 px-6 border-t border-slate-800/50 overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[700px] h-[400px] bg-indigo-900/25 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Private beta — limited seats
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
          Get early access
        </h2>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          We're onboarding a small group of engineering teams to run DataShuttle
          in their production environment. Share your email and we'll be in touch.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">You're on the list. We'll reach out shortly.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending…
                </span>
              ) : 'Request access'}
            </button>
          </form>
        )}

        <p className="mt-5 text-xs text-slate-600">
          No spam. No sales pipeline. We review each request personally.
        </p>

        {/* Trust marks */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-600 text-sm">
          {[
            '🦀  Written in Rust',
            '🔒  Self-hosted or cloud',
            '📦  Single binary deploy',
            '⚡  Sub-minute latency',
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
