const reasons = [
  {
    title: 'Open by design',
    description:
      'Apache Iceberg is an open table specification with no vendor controlling the format. Your data lives as Parquet files plus a small JSON manifest — readable by Spark, Trino, Athena, DuckDB, Snowflake, BigQuery, and Databricks. The same files. No copies, no replication, no proprietary catalog.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9-9v18m9-9H3"
        />
      </svg>
    ),
  },
  {
    title: 'Warehouse semantics on object storage',
    description:
      'Atomic snapshot commits, hidden partitioning, time travel, schema evolution without data rewrite, and ACID transactions over S3 / GCS / ADLS. The features that used to require Snowflake or BigQuery are now properties of the file layout itself — at object-storage prices.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3.75 9h16.5m-16.5 6.75h16.5M5.625 3h12.75c1.035 0 1.875.84 1.875 1.875v14.25c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V4.875C3.75 3.839 4.59 3 5.625 3z"
        />
      </svg>
    ),
  },
  {
    title: 'V3 closes the last gap',
    description:
      'Deletion vectors replace expensive position-delete files. Row lineage gives every row a stable identity across commits. Default column values let schema additions stay metadata-only. VARIANT, GEOMETRY, and nanosecond timestamps land first-class. Iceberg V3 is the first open format good enough to be a database, not a snapshot store.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12z"
        />
      </svg>
    ),
  },
]

export default function WhyIceberg() {
  return (
    <section
      id="why-iceberg"
      className="bg-slate-950 border-t border-slate-800/50 py-28 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4">
            Why Iceberg
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            The lakehouse format that<br className="hidden sm:block" /> doesn't lock you in
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Every data team eventually rebuilds the same pipeline:
            warehouse for fresh data, lake for cheap data, glue code
            to keep them in sync. Apache Iceberg collapses both
            into one open format. DataShuttle is built around it
            from the first byte — not as an export target, but as
            the only place your data lives.
          </p>
        </div>

        {/* Reason cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 hover:border-indigo-500/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                {r.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {r.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {r.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom strip — engines that read Iceberg */}
        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/30 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            <span className="text-slate-300 font-medium">One write,</span>{' '}
            queryable from every modern engine
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-mono">
            <span>Spark</span>
            <span>·</span>
            <span>Trino</span>
            <span>·</span>
            <span>DuckDB</span>
            <span>·</span>
            <span>Athena</span>
            <span>·</span>
            <span>Snowflake</span>
            <span>·</span>
            <span>Databricks</span>
            <span>·</span>
            <span>Dremio</span>
          </div>
        </div>
      </div>
    </section>
  )
}
