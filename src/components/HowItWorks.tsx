const sources = ['PostgreSQL', 'MySQL', 'MongoDB', 'Kafka', 'REST API', 'S3 / GCS']
const targets = ['Apache Polaris', 'Nessie', 'AWS Glue', 'Hive Metastore']

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-950 py-28 px-6 border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4">Architecture</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A Rust daemon plus a thin ~12&nbsp;MB CLI client. No JVM, no broker, no controller node.
            Coordinates via Iceberg catalog — not a separate coordinator service.
          </p>
        </div>

        {/* Pipeline diagram */}
        <div className="flex flex-col md:flex-row items-stretch gap-4 mb-16">
          {/* Sources */}
          <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-4">Sources</p>
            <div className="flex flex-col gap-2">
              {sources.map((src) => (
                <div
                  key={src}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-800/60 text-sm text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  {src}
                </div>
              ))}
            </div>
          </div>

          {/* Arrow + Engine */}
          <div className="flex md:flex-col items-center justify-center gap-3 px-2">
            {/* Arrow right */}
            <div className="hidden md:flex flex-col items-center gap-1">
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-indigo-500/40 to-indigo-500/40" />
              <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="md:hidden flex items-center gap-1">
              <div className="h-px w-8 bg-indigo-500/40" />
              <svg className="w-4 h-4 text-indigo-500 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Engine */}
          <div className="flex-[1.4] rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
            <div className="relative">
              <p className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-4">DataShuttle Engine</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'True MPP', color: 'text-violet-400' },
                  { label: 'CDC Capture', color: 'text-indigo-400' },
                  { label: 'Schema Evolution', color: 'text-violet-400' },
                  { label: 'Inline Transforms', color: 'text-indigo-400' },
                  { label: 'Auto Compaction', color: 'text-violet-400' },
                  { label: 'Arrow Flight Buffer', color: 'text-indigo-400' },
                  { label: 'Built-in Lineage', color: 'text-violet-400' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="px-3 py-2 rounded-lg bg-slate-800/60 border border-indigo-500/10 text-xs font-medium flex items-center gap-2"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 ${item.color}`} />
                    <span className="text-slate-300">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 text-center">
                Exactly-once · Crash-safe · Shared-nothing
              </div>
            </div>
          </div>

          {/* Arrow right */}
          <div className="flex md:flex-col items-center justify-center gap-3 px-2">
            <div className="hidden md:flex flex-col items-center gap-1">
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-emerald-500/40 to-emerald-500/40" />
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="md:hidden flex items-center gap-1">
              <div className="h-px w-8 bg-emerald-500/40" />
              <svg className="w-4 h-4 text-emerald-500 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Iceberg target */}
          <div className="flex-1 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-6">
            <p className="text-xs font-medium text-emerald-400 uppercase tracking-widest mb-4">Iceberg Tables</p>
            <div className="flex flex-col gap-2 mb-4">
              {targets.map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-800/60 text-sm text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>
            <div className="px-3 py-2 rounded-lg bg-slate-800/40 text-xs text-slate-500 text-center">
              Read by Spark · Trino · DuckDB · Snowflake · …
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Declare a pipeline in SQL',
              desc: 'One CREATE PIPELINE statement defines the source, destination, schedule, and behavior. No YAML, no UI clicks, no DAG files.',
            },
            {
              step: '02',
              title: 'DataShuttle runs it autonomously',
              desc: 'Continuous CDC capture, automatic schema evolution, compaction, and cleanup — all self-managed. You get alerts, not pages.',
            },
            {
              step: '03',
              title: 'Query with any engine',
              desc: 'Your data lands in standard Iceberg tables. Spark, Trino, Athena, Snowflake, Databricks — pick what fits. No vendor dependency.',
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-indigo-500/30 bg-indigo-950/40 flex items-center justify-center text-xs font-bold text-indigo-400">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
