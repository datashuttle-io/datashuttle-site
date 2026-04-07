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

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-slate-300 font-medium mb-3">Product</p>
              <ul className="space-y-2">
                {['Features', 'How it works', 'Connectors', 'Pricing'].map((l) => (
                  <li key={l}><a href={`#${l.toLowerCase().replace(/ /g, '-')}`} className="text-slate-500 hover:text-slate-300 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-slate-300 font-medium mb-3">Resources</p>
              <ul className="space-y-2">
                {['Documentation', 'API Reference', 'Changelog', 'GitHub'].map((l) => (
                  <li key={l}><a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-slate-300 font-medium mb-3">Company</p>
              <ul className="space-y-2">
                {['About', 'Blog', 'Careers', 'Contact'].map((l) => (
                  <li key={l}><a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {year} DataShuttle Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="mailto:hello@datashuttle.ai" className="hover:text-slate-400 transition-colors">hello@datashuttle.ai</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
