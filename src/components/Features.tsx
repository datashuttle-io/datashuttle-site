const features = [
  {
    title: 'Iceberg V3 Native',
    badge: 'Core',
    color: 'indigo',
    description:
      'Deletion vectors, row lineage, default column values, VARIANT type. Built for V3 from day one — not bolted onto a V2 writer.',
    detail: 'delete_mode = \'deletion_vectors\' is the default. 5–10× more efficient than position-delete files.',
  },
  {
    title: 'Continuous CDC',
    badge: 'Real-time',
    color: 'violet',
    description:
      'Track every INSERT, UPDATE, and DELETE from PostgreSQL, MySQL, and MongoDB via native WAL/binlog tailing. No polling, no full scans.',
    detail: 'Sub-minute end-to-end latency. Exactly-once delivery via idempotent batch UUIDs.',
  },
  {
    title: 'Arrow Flight Hot Buffer',
    badge: 'Performance',
    color: 'cyan',
    description:
      'Freshest data served via Apache Arrow Flight at sub-second latency. Cold data lands in Iceberg. One product, two latency tiers.',
    detail: 'Downstream can query "last 5 minutes" without waiting for Iceberg commit cycles.',
  },
  {
    title: 'Auto Compaction',
    badge: 'Autonomous',
    color: 'emerald',
    description:
      'DV-aware compaction merges deletion vectors with data files automatically. No manual OPTIMIZE runs, no accumulating small files.',
    detail: 'Compaction threshold, schedule, and parallelism are all configurable per pipeline.',
  },
  {
    title: 'Schema Evolution',
    badge: 'Zero-downtime',
    color: 'amber',
    description:
      'Source schema changes are detected and propagated to Iceberg as metadata-only operations. New columns use V3 default values — no data rewrite.',
    detail: 'Safe widening by default. Type promotions, column adds, and renames handled automatically.',
  },
  {
    title: 'Built-in Lineage',
    badge: 'Observability',
    color: 'rose',
    description:
      'Automatic table-level and column-level lineage, snapshot provenance, and OpenLineage export. Visibility that closed platforms keep proprietary.',
    detail: 'system.lineage, system.schema_changes, system.pipeline_runs — queryable via SQL.',
  },
]

const colorMap: Record<string, string> = {
  indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
}

const dotMap: Record<string, string> = {
  indigo: 'bg-indigo-400',
  violet: 'bg-violet-400',
  cyan: 'bg-cyan-400',
  emerald: 'bg-emerald-400',
  amber: 'bg-amber-400',
  rose: 'bg-rose-400',
}

export default function Features() {
  return (
    <section className="bg-slate-900/50 border-t border-slate-800/50 py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4">Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Everything your lakehouse<br className="hidden sm:block" /> ingestion layer needs
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7 hover:border-slate-700 transition-colors group"
            >
              {/* Badge */}
              <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full border mb-5 ${colorMap[f.color]}`}>
                {f.badge}
              </span>

              <h3 className="text-lg font-semibold text-white mb-3">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{f.description}</p>

              {/* Detail pill */}
              <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-slate-800/60 text-xs text-slate-500">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5 ${dotMap[f.color]}`} />
                <span className="font-mono">{f.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
