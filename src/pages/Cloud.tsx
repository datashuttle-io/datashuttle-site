export default function Cloud() {
  return (
    <div className="pt-20 pb-24">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Public beta · Sign up free
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          DataShuttle <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Cloud</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
          Fully managed control plane on <code className="text-indigo-300">app.datashuttle.ai</code>.
          Iceberg ingestion, CDC streaming, and SQL transforms without provisioning a cluster.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://app.datashuttle.ai/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
          >
            Start free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center px-6 py-3 rounded-full border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors"
          >
            See pricing
          </a>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          No credit card required · Self-host remains free on the same binary
        </p>
      </section>

      {/* Three value props */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-4 mb-24">
        {[
          {
            title: 'Managed control plane',
            body: 'PostgreSQL, Redis, Caddy-TLS, and the datashuttle API running on dedicated infrastructure. You hit an endpoint, we keep it up.',
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M5 12a7 7 0 1014 0 7 7 0 10-14 0m7-7v14" />
            ),
          },
          {
            title: 'Multi-tenant + RBAC',
            body: 'Per-tenant S3 warehouse prefix, JWT-scoped access, tenant-isolated DPU quotas. Pen-tested before GA.',
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            ),
          },
          {
            title: 'GDPR compliant',
            body: 'Export-my-data endpoint, 90-day soft-delete grace, signed audit chain, DPA on request. Built for EU customers from day one.',
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            ),
          },
        ].map((f) => (
          <div key={f.title} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <svg className="w-6 h-6 text-indigo-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {f.icon}
            </svg>
            <h3 className="font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-sm text-slate-400">{f.body}</p>
          </div>
        ))}
      </section>

      {/* Pricing snapshot */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold text-center mb-2">Pricing</h2>
        <p className="text-center text-slate-400 mb-10 text-sm">Four tiers. Pay for DPUs consumed above your commit.</p>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { name: 'Community', price: '$0', desc: 'Self-hosted or free cloud', dpu: '10K DPU/mo', envs: '1 environment', pipelines: '3 pipelines', featured: false },
            { name: 'Team', price: '$380', desc: 'Per month · from', dpu: '500K DPU/mo', envs: '1 environment', pipelines: '25 pipelines', featured: true },
            { name: 'Business', price: '$2,800', desc: 'Per month · from', dpu: '5M DPU/mo', envs: '5 environments', pipelines: '200 pipelines', featured: false },
            { name: 'Enterprise', price: 'Custom', desc: 'Contact sales', dpu: 'Unlimited', envs: 'Unlimited', pipelines: 'Unlimited', featured: false },
          ].map((p) => (
            <div
              key={p.name}
              className={`p-6 rounded-2xl border ${
                p.featured ? 'border-indigo-500/50 bg-indigo-500/5 relative' : 'border-slate-800 bg-slate-900/40'
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-500 text-xs font-medium">
                  Most popular
                </div>
              )}
              <div className="font-semibold text-white mb-1">{p.name}</div>
              <div className="text-3xl font-bold mb-1">{p.price}</div>
              <div className="text-xs text-slate-500 mb-4">{p.desc}</div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2"><span className="text-indigo-400">•</span> {p.dpu}</li>
                <li className="flex items-start gap-2"><span className="text-indigo-400">•</span> {p.envs}</li>
                <li className="flex items-start gap-2"><span className="text-indigo-400">•</span> {p.pipelines}</li>
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-500 mt-6">
          DPU = 1 compute-second × 1 vCPU × 2 GB memory. Overage billed at $0.50/DPU.
        </p>
      </section>

      {/* Self-host callout */}
      <section className="max-w-3xl mx-auto px-6 text-center">
        <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40">
          <h3 className="text-xl font-semibold mb-2">Prefer to run it yourself?</h3>
          <p className="text-slate-400 text-sm mb-4">
            Same binary, same Iceberg output. Self-host the Community tier on your own infrastructure at no cost.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200"
          >
            See the self-host install guide
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}
