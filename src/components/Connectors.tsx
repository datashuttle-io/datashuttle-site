const connectors = [
  { name: 'PostgreSQL',        status: 'GA',      category: 'Database' },
  { name: 'MySQL',             status: 'GA',      category: 'Database' },
  { name: 'Oracle',            status: 'GA',      category: 'Database' },
  { name: 'SQL Server',        status: 'GA',      category: 'Database' },
  { name: 'MongoDB',           status: 'GA',      category: 'Database' },
  { name: 'S3 / GCS / ADLS',  status: 'GA',      category: 'Object Store' },
  { name: 'Apache Kafka',      status: 'GA',      category: 'Streaming' },
  { name: 'REST API',          status: 'GA',      category: 'HTTP' },
  { name: 'Hadoop / HDFS',    status: 'GA',      category: 'Batch' },
  { name: 'Greenplum',         status: 'GA',      category: 'Database' },
  { name: 'Snowflake',         status: 'GA',      category: 'Warehouse' },
  { name: 'Google BigQuery',   status: 'GA',      category: 'Warehouse' },
  { name: 'Databricks',        status: 'GA',      category: 'Warehouse' },
  { name: 'ClickHouse',        status: 'GA',      category: 'Database' },
  { name: 'Amazon DynamoDB',   status: 'GA',      category: 'NoSQL' },
  { name: 'Amazon Kinesis',    status: 'GA',      category: 'Streaming' },
  { name: 'Apache Cassandra',  status: 'GA',      category: 'NoSQL' },
  { name: 'CockroachDB',       status: 'GA',      category: 'Database' },
  { name: 'Vertica',           status: 'GA',      category: 'Warehouse' },
  { name: 'StarRocks',         status: 'GA',      category: 'Warehouse' },
  { name: 'Local Files',       status: 'GA',      category: 'Batch' },
]

const statusStyle: Record<string, string> = {
  GA:      'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Beta:    'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Planned: 'text-slate-500 bg-slate-700/30 border-slate-700/40',
}

export default function Connectors() {
  return (
    <section className="bg-slate-950 py-24 px-6 border-t border-slate-800/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4">Sources</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Connect anything
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Native CDC connectors for all major databases. Custom sources via the Rust connector SDK.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {connectors.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="text-sm font-medium text-slate-200">{c.name}</div>
                <div className="text-xs text-slate-600">{c.category}</div>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ml-2 ${statusStyle[c.status]}`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-600">
          Custom connectors via the Connector SDK (Rust trait). More sources added each release.
        </p>
      </div>
    </section>
  )
}
