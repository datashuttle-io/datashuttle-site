export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 border-t border-slate-800/50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="7" fill="#1E1B4B"/>
                <path d="M7 11h10a5 5 0 0 1 0 10H7" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="22" cy="16" r="2" fill="#818CF8"/>
                <path d="M7 16h8" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M21 9l4 7-4 7" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-semibold text-white">DataShuttle</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Iceberg-native ingestion engine. Move data from any source to Apache Iceberg with one SQL statement.
            </p>
          </div>

          {/* Links — only pages that actually resolve. Blog / GitHub /
               legal pages will come back when the underlying targets
               go live (public repo, privacy/terms copy). Dead `href='#'`
               placeholders lived here previously; they looked live but
               bounced visitors to a blank page. */}
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="text-slate-300 font-medium mb-3">Product</p>
              <ul className="space-y-2">
                <li><a href="/cloud" className="text-slate-500 hover:text-slate-300 transition-colors">Cloud</a></li>
                <li><a href="/pricing" className="text-slate-500 hover:text-slate-300 transition-colors">Pricing</a></li>
                <li><a href="/#features" className="text-slate-500 hover:text-slate-300 transition-colors">Features</a></li>
                <li><a href="/#how-it-works" className="text-slate-500 hover:text-slate-300 transition-colors">How it works</a></li>
              </ul>
            </div>
            <div>
              <p className="text-slate-300 font-medium mb-3">Resources</p>
              <ul className="space-y-2">
                <li><a href="https://docs.datashuttle.ai" className="text-slate-500 hover:text-slate-300 transition-colors">Docs</a></li>
                <li><a href="/whats-new" className="text-slate-500 hover:text-slate-300 transition-colors">What's new</a></li>
                <li><a href="mailto:hello@datashuttle.ai" className="text-slate-500 hover:text-slate-300 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {year} DataShuttle Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <a href="mailto:hello@datashuttle.ai" className="hover:text-slate-400 transition-colors">hello@datashuttle.ai</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
