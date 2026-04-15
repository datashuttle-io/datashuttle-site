import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SECTION_LINKS = [
  { label: 'Why Iceberg', href: '#why-iceberg' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Layout', href: '#partitioning' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="7" fill="#1E1B4B"/>
            <path d="M7 11h10a5 5 0 0 1 0 10H7" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="22" cy="16" r="2" fill="#818CF8"/>
            <path d="M7 16h8" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M21 9l4 7-4 7" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-semibold text-white tracking-tight">DataShuttle</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {onHome && SECTION_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/cloud"
            className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            Cloud
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium">
              beta
            </span>
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://app.datashuttle.ai"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Sign in
          </a>
          <a
            href="https://app.datashuttle.ai/signup"
            className="text-sm px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-colors font-medium"
          >
            Start free
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-6 py-4 flex flex-col gap-4">
          {onHome && SECTION_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/cloud"
            className="text-sm text-slate-400 hover:text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            Cloud (beta)
          </Link>
          <a
            href="https://app.datashuttle.ai/signup"
            className="text-sm px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-center transition-colors font-medium"
            onClick={() => setOpen(false)}
          >
            Start free
          </a>
        </div>
      )}
    </nav>
  )
}
