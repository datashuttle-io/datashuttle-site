import CodeBlock from './CodeBlock'

const PARTITIONING_SQL = `CREATE PIPELINE events_warehouse
  SOURCE clickhouse CONNECTION 'analytics_cluster'
  TABLES ('events', 'sessions')
  INTO iceberg.warehouse.analytics
  SCHEDULE continuous
  PARTITION BY (
    day(event_ts),
    bucket(16, user_id)
  )
  CLUSTER BY (
    event_ts ASC,
    user_id ASC
  )
  WITH (
    write_distribution_mode = 'hash',
    target_file_bytes = '64 MB',
    target_file_rows = 5000000
  );`

const capabilities = [
  {
    label: 'Hidden partitioning',
    title: 'PARTITION BY (transforms)',
    body:
      'Time-bucketed and hash-bucketed transforms applied at write time. Hive-style paths land on disk; readers prune entire partitions before opening a single Parquet file. No partition columns to add to your queries — Iceberg routes them automatically.',
  },
  {
    label: 'Z-order inside files',
    title: 'CLUSTER BY (sort)',
    body:
      'Per-file sort order written into the table metadata. Engines use it to skip row groups via min/max pruning. The same data, the same files, queries 5–50× faster on the columns you actually filter on.',
  },
  {
    label: 'Iceberg 1.5 distribution',
    title: 'write_distribution_mode',
    body:
      'Hash mode bundles every row with the same partition tuple into one Parquet file per commit. None mode is a passthrough for sources that are already clustered. Same knob your reader sees on the table property.',
  },
  {
    label: 'Throughput',
    title: 'File-size targeting',
    body:
      'Compression-aware row buffer cuts Parquet files at the actual on-disk size you ask for, not the in-memory Arrow estimate. Bulk snapshots stay at constant throughput from the first row to the hundred-millionth.',
  },
  {
    label: 'Exactly-once',
    title: 'Snapshot resume',
    body:
      'Every Iceberg commit writes the source position into the snapshot summary. A restart reads the cursor back from the catalog and continues from where the last successful commit landed. No duplicates after a crash, container kill, or token expiry.',
  },
  {
    label: 'Compaction-friendly',
    title: 'Manifest-level partition stats',
    body:
      'Every commit publishes per-partition min/max bounds and a contains_null flag in the manifest list. Iceberg readers prune entire manifests before touching any data file — the way Iceberg was meant to be used.',
  },
]

export default function Partitioning() {
  return (
    <section
      id="partitioning"
      className="bg-slate-950 border-t border-slate-800/50 py-28 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4">
            Lake-native physical layout
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            The bits that make<br className="hidden sm:block" /> queries fast
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            DataShuttle owns the full physical layout of your Iceberg
            tables — partitioning, clustering, file size, distribution
            mode, and snapshot summaries — and exposes every knob in
            plain SQL. No notebook, no maintenance job, no separate
            compaction service.
          </p>
        </div>

        {/* SQL + capabilities split */}
        <div className="grid lg:grid-cols-2 gap-10 items-start min-w-0">
          {/* SQL block */}
          <div className="lg:sticky lg:top-24 min-w-0">
            <CodeBlock
              code={PARTITIONING_SQL}
              language="sql"
              filename="events_pipeline.sql"
            />
            <p className="mt-4 text-xs text-slate-500 leading-relaxed">
              Every clause above maps to a concrete Iceberg table
              property the next reader will see — including engines
              that have never heard of DataShuttle.
            </p>
          </div>

          {/* Capability list */}
          <div className="space-y-4 min-w-0">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-indigo-500/40 transition-colors"
              >
                <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-indigo-400 mb-2">
                  {c.label}
                </span>
                <h3 className="text-base font-semibold text-white mb-2 font-mono break-words">
                  {c.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
