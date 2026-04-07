import { useState } from 'react'
import CodeBlock from './CodeBlock'

const demos = [
  {
    label: 'Postgres → Iceberg',
    filename: 'customer_sync.sql',
    code: `CREATE PIPELINE customer_sync
  SOURCE postgres CONNECTION 'crm_prod'
  TABLES ('accounts', 'orders', 'payments')
  INTO iceberg.warehouse.crm
  SCHEDULE continuous
  WITH (
    iceberg_format_version  = 3,
    delete_mode             = 'deletion_vectors',
    row_lineage             = true,
    schema_evolution        = 'compatible',
    snapshot_retention      = '7 days',
    compaction_strategy     = 'auto'
  );`,
  },
  {
    label: 'Kafka → Iceberg',
    filename: 'events_pipeline.sql',
    code: `CREATE PIPELINE clickstream
  SOURCE kafka CONNECTION 'prod_kafka'
  TOPICS ('web.events', 'mobile.events')
  FORMAT JSON
  INTO iceberg.warehouse.events
  WITH (
    iceberg_format_version  = 3,
    json_handling           = 'variant',
    watermark_column        = 'event_ts',
    late_arrival_tolerance  = '5 minutes'
  );`,
  },
  {
    label: 'With transforms',
    filename: 'masked_pipeline.sql',
    code: `CREATE PIPELINE user_events
  SOURCE mysql CONNECTION 'app_db'
  TABLES ('users', 'sessions')
  INTO iceberg.warehouse.analytics
  SCHEDULE continuous
  TRANSFORM (
    -- PII masking
    email     = SHA256(email),
    phone     = LAST4(phone),
    -- Computed columns
    age_band  = CASE
      WHEN age < 25 THEN 'gen-z'
      WHEN age < 40 THEN 'millennial'
      ELSE 'other'
    END
  )
  WITH (delete_mode = 'deletion_vectors');`,
  },
  {
    label: 'Cluster mode',
    filename: 'cluster_deploy.sql',
    code: `-- Scale to a 3-node cluster — no coordinator needed.
-- Nodes coordinate via Iceberg catalog leases only.

CREATE PIPELINE large_table_sync
  SOURCE postgres CONNECTION 'warehouse_db'
  TABLES ('transactions')        -- 500M+ rows
  INTO iceberg.warehouse.finance
  SCHEDULE continuous
  WITH (
    parallelism             = 12,  -- parallel CDC workers
    resource_pool           = 'high_throughput',
    checkpoint_interval     = '30 seconds',
    iceberg_format_version  = 3
  );`,
  },
]

export default function SqlDemo() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-slate-900/40 border-t border-slate-800/50 py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4">SQL-first</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Declare. Run. Forget.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Every pipeline is one SQL statement. The engine handles the rest — initial load,
            continuous sync, compaction, schema changes, error recovery.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 mb-4 bg-slate-900 rounded-xl p-1 border border-slate-800">
          {demos.map((d, i) => (
            <button
              key={d.label}
              onClick={() => setActive(i)}
              className={`flex-1 text-xs font-medium py-2 px-3 rounded-lg transition-all ${
                active === i
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <CodeBlock
          code={demos[active].code}
          language="sql"
          filename={demos[active].filename}
        />

        {/* Bottom note */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { metric: '< 1 min', label: 'time to first row in Iceberg' },
            { metric: '1 binary', label: 'to deploy and run' },
            { metric: '0 brokers', label: 'no Kafka, no Flink, no Spark' },
          ].map((item) => (
            <div key={item.label} className="text-center py-5 rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="text-2xl font-bold text-indigo-400 mb-1">{item.metric}</div>
              <div className="text-xs text-slate-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
