const pains = [
  {
    before: '5+ moving parts',
    after: 'One binary',
    description:
      'Postgres → Debezium → Kafka → Kafka Connect → Flink → Iceberg Sink → Airflow → your data. DataShuttle replaces the entire chain.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
      </svg>
    ),
  },
  {
    before: '6–24 hour batch lag',
    after: 'Sub-minute freshness',
    description:
      'Continuous CDC tracks every INSERT, UPDATE, and DELETE. Data lands in Iceberg with deletion vectors, not stale full-table overwrites.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" />
      </svg>
    ),
  },
  {
    before: 'Delta / Snowflake lock-in',
    after: 'Open Iceberg standard',
    description:
      'DataShuttle writes standard Iceberg V3. Read with Spark, Trino, Athena, DuckDB, Snowflake, or Databricks — no vendor dependency.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13.5 10.5 21 3m-5.196.804A13.424 13.424 0 0 1 21 12a13.5 13.5 0 0 1-13.5 13.5 13.5 13.5 0 0 1-13.5-13.5A13.5 13.5 0 0 1 8.304 1.804" />
      </svg>
    ),
  },
]

export default function Pain() {
  return (
    <section id="features" className="bg-slate-950 py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4">Why DataShuttle</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Ingestion shouldn't require<br className="hidden sm:block" /> a team to operate
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {pains.map((pain) => (
            <div
              key={pain.before}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-indigo-500/40 transition-colors group"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                  {pain.icon}
                </div>

                {/* Before → After */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono text-red-400/80 line-through">{pain.before}</span>
                  <svg className="w-3 h-3 text-slate-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-xs font-mono text-emerald-400">{pain.after}</span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed">{pain.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
