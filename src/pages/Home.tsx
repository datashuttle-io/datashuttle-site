import { useEffect, useState } from 'react'
import { SEO } from '../components/SEO'
import LogoMark from '../components/LogoMark'

// The marketing home page is a single continuous "shipping manifest"
// document. Visual spine + § numbered sections from the design handoff;
// the copy is the real DataShuttle messaging recovered from the original
// home-page sections (Hero / Pain / HowItWorks / Features / Comparison /
// Connectors / Partitioning / SqlDemo).

export default function Home() {
  return (
    <>
      <SEO
        title="DataShuttle — Iceberg-Native Ingestion Engine"
        description="Move data from PostgreSQL, MySQL, MongoDB, Kafka into Apache Iceberg with one SQL statement. Sub-minute CDC, auto-compaction, deletion vectors. No Kafka, no Flink, no Spark."
        path="/"
      />

      <div className="ds-doc">
        <aside className="ds-spine">
          <div className="top-mark">MANIFEST · {manifestStamp()}</div>
          <div className="mark-box">
            <LogoMark height={28} alt="" />
          </div>
          <div className="foot-mark">NO. 001 / 007</div>
        </aside>

        <div className="ds-main">
          <HeroSection />
          <TerminalSection />
          <WhyDataShuttleSection />
          <ArchitectureSection />
          <CapabilitiesSection />
          <PhysicalLayoutSection />
          <ComparisonSection />
          <ConnectorsSection />
        </div>
      </div>
    </>
  )
}

function manifestStamp() {
  const d = new Date()
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`
}

type OsKind = 'macOS' | 'Linux' | 'Windows' | null
function detectOs(): OsKind {
  if (typeof navigator === 'undefined') return null
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac')) return 'macOS'
  if (ua.includes('win')) return 'Windows'
  if (ua.includes('linux') || ua.includes('x11')) return 'Linux'
  return null
}

/* ──────────────────────────────────────────────────────────────────
   § 01 — BILL OF LADING (hero)
   ────────────────────────────────────────────────────────────────── */
function HeroSection() {
  const [os, setOs] = useState<OsKind>(null)
  useEffect(() => setOs(detectOs()), [])
  const downloadLabel = os ? `Download for ${os}` : 'Download for self-host'

  return (
    <section className="ds-hero" id="hero">
      <div className="ds-hero-grid">
        <div className="ds-hero-meta">
          <span className="line">§ 01</span>
          <span className="line">BILL OF LADING</span>
          <span className="line">Iceberg V3</span>
        </div>
        <div>
          <h1 className="ds-headline">
            <em>Any source.</em>
            <br />
            Apache Iceberg.
            <br />
            <span className="accent">One SQL statement.</span>
          </h1>
        </div>
      </div>

      <div className="ds-hero-below">
        <div>
          <p className="lede">
            DataShuttle is a standalone ingestion engine that moves data from{' '}
            <strong>PostgreSQL, MySQL, MongoDB, Kafka</strong>, and more into Iceberg
            tables — with <strong>sub-minute latency</strong>, automatic schema evolution,
            and zero operational overhead. No Kafka cluster, no Flink, no Spark — one
            Rust daemon plus a ~12&nbsp;MB CLI.
          </p>
          <div className="ds-cta-row">
            <span className="tick">BOOKING</span>
            <a className="primary" href="/cloud">
              Start free on Cloud →
            </a>
            <a className="ghost" href="/download">
              {downloadLabel} →
            </a>
          </div>
        </div>
        <div className="side">
          <div className="row"><span>Format</span><strong>Apache Iceberg V3</strong></div>
          <div className="row"><span>Deletes</span><strong>deletion vectors</strong></div>
          <div className="row"><span>CDC</span><strong>WAL / binlog / oplog</strong></div>
          <div className="row"><span>Freshness</span><strong>sub-minute</strong></div>
          <div className="row"><span>Runtime</span><strong>one Rust daemon</strong></div>
          <div className="row"><span>Deploy</span><strong>cloud · self · airgap</strong></div>
        </div>
      </div>
    </section>
  )
}

/* Hero SQL terminal. Sticks to the same CREATE PIPELINE from the old
   Hero component — real syntax, real options. */
function TerminalSection() {
  return (
    <section className="ds-terminal-wrap">
      <div className="ds-terminal">
        <div className="tbar">
          <span className="doc-id">DOC · pipeline.sql</span>
          <span className="doc-name">customer_sync</span>
          <span className="doc-size">iceberg V3 · deletion vectors</span>
        </div>
        <div className="tbody">
          <div className="gutter">
            <div>01</div><div>02</div><div>03</div><div>04</div><div>05</div>
            <div>06</div><div>07</div><div>08</div><div>09</div><div>10</div>
            <div>11</div><div>12</div><div>13</div>
          </div>
          <pre>
            <span className="kw">CREATE PIPELINE</span> customer_sync{'\n'}
            <span className="ws">  </span><span className="kw">SOURCE</span> postgres <span className="kw">CONNECTION</span> <span className="str">'crm_prod'</span>{'\n'}
            <span className="ws">  </span><span className="kw">TABLES</span> (<span className="str">'accounts'</span>, <span className="str">'orders'</span>, <span className="str">'payments'</span>){'\n'}
            <span className="ws">  </span><span className="kw">INTO</span> iceberg.warehouse.crm{'\n'}
            <span className="ws">  </span><span className="kw">SCHEDULE</span> continuous{'\n'}
            <span className="ws">  </span><span className="kw">PARTITION BY</span> (day(created_at), bucket(<span className="num">16</span>, account_id)){'\n'}
            <span className="ws">  </span><span className="kw">CLUSTER BY</span> (account_id ASC){'\n'}
            <span className="ws">  </span><span className="kw">WITH</span> ({'\n'}
            <span className="ws">    </span>iceberg_format_version = <span className="num">3</span>,{'\n'}
            <span className="ws">    </span>delete_mode = <span className="str">'deletion_vectors'</span>,{'\n'}
            <span className="ws">    </span>row_lineage = <span className="kw">true</span>,{'\n'}
            <span className="ws">    </span>schema_evolution = <span className="str">'compatible'</span>{'\n'}
            <span className="ws">  </span>);
          </pre>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────────
   § 02 — Why DataShuttle (three before→after pairs from Pain.tsx)
   ────────────────────────────────────────────────────────────────── */
function WhyDataShuttleSection() {
  const pains = [
    {
      before: '5+ moving parts',
      after: 'One daemon',
      desc: 'Postgres → Debezium → Kafka → Kafka Connect → Flink → Iceberg Sink → Airflow → your data. DataShuttle replaces the entire chain with a single Rust daemon — plus an optional ~12 MB CLI for your laptop.',
    },
    {
      before: '6–24 hour batch lag',
      after: 'Sub-minute freshness',
      desc: 'Continuous CDC tracks every INSERT, UPDATE, and DELETE via native WAL / binlog / oplog tailing. Data lands in Iceberg with deletion vectors, not stale full-table overwrites.',
    },
    {
      before: 'Delta / Snowflake lock-in',
      after: 'Open Iceberg standard',
      desc: 'DataShuttle writes standard Iceberg. Read with Spark, Trino, Athena, DuckDB, Snowflake, or Databricks — no vendor dependency, no proprietary catalog.',
    },
  ]

  return (
    <section className="ds-sec" id="why">
      <div className="ds-sec-head">
        <div className="ds-sec-num">§ 02</div>
        <div className="ds-sec-title">Why DataShuttle · before → after</div>
        <div className="ds-sec-stamp">3 shifts</div>
      </div>

      <div className="ds-manifest-table">
        <div className="ds-manifest-row head">
          <div>item</div>
          <div>what changes</div>
          <div>detail</div>
          <div>status</div>
        </div>
        {pains.map((p, i) => (
          <div className="ds-manifest-row" key={p.before}>
            <div className="cell ds-m-num">
              0{i + 1}
            </div>
            <div className="cell ds-m-desc">
              <h4>
                <span style={{ color: 'var(--rust-400)', textDecoration: 'line-through', textDecorationThickness: 2 }}>
                  {p.before}
                </span>{' '}
                → <em style={{ color: 'var(--signal-500)', fontStyle: 'italic' }}>{p.after}</em>
              </h4>
              <p>{p.desc}</p>
            </div>
            <div className="cell ds-m-spec">
              <strong>FROM</strong> {p.before}
              <br />
              <strong>TO</strong> {p.after}
            </div>
            <div className="cell ds-m-stamp">
              <div className="st">COLLAPSED</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────────
   § 03 — Architecture (sources → engine → iceberg from HowItWorks.tsx)
   ────────────────────────────────────────────────────────────────── */
function ArchitectureSection() {
  const sources = ['PostgreSQL', 'MySQL', 'MongoDB', 'Kafka', 'REST API', 'S3 / GCS']
  const targets = ['Apache Polaris', 'Nessie', 'AWS Glue', 'Hive Metastore']
  const engineFeatures = [
    'True MPP',
    'CDC Capture',
    'Schema Evolution',
    'Inline Transforms',
    'Auto Compaction',
    'Arrow Flight Buffer',
    'Built-in Lineage',
    'Exactly-once · Crash-safe',
  ]
  const steps = [
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
  ]

  return (
    <section className="ds-sec" id="architecture">
      <div className="ds-sec-head">
        <div className="ds-sec-num">§ 03</div>
        <div className="ds-sec-title">Architecture · sources → engine → Iceberg</div>
        <div className="ds-sec-stamp">1 daemon · 1 CLI</div>
      </div>

      <div className="ds-flow">
        <div className="ds-flow-col">
          <div className="ds-flow-head">Sources</div>
          <ul className="ds-flow-list">
            {sources.map((s) => <li key={s}><span className="dot" /> {s}</li>)}
          </ul>
        </div>

        <div className="ds-flow-arrow">→</div>

        <div className="ds-flow-engine">
          <div className="ds-flow-head accent">DataShuttle Engine</div>
          <div className="ds-flow-engine-grid">
            {engineFeatures.map((f) => <span key={f}>{f}</span>)}
          </div>
          <div className="ds-flow-stamp">Exactly-once · Crash-safe · Shared-nothing</div>
        </div>

        <div className="ds-flow-arrow">→</div>

        <div className="ds-flow-col">
          <div className="ds-flow-head moss">Iceberg Tables</div>
          <ul className="ds-flow-list">
            {targets.map((t) => <li key={t}><span className="dot moss" /> {t}</li>)}
          </ul>
          <div className="ds-flow-foot">Read by Spark · Trino · DuckDB · Snowflake · …</div>
        </div>
      </div>

      <div className="ds-steps">
        {steps.map((s) => (
          <div className="ds-step" key={s.step}>
            <div className="ds-step-num">§ {s.step}</div>
            <div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────────
   § 04 — Capabilities (from Features.tsx, 8 entries)
   ────────────────────────────────────────────────────────────────── */
function CapabilitiesSection() {
  const rows = [
    {
      num: '01', code: 'ICEBERG',
      title: 'Iceberg Native',
      desc: "Deletion vectors, row lineage, default column values, VARIANT type. Built for the modern table format from day one — not bolted onto a legacy writer.",
      spec: [['DEFAULT', "delete_mode = 'deletion_vectors'"], ['EFFICIENCY', '5–10× vs position-delete files']],
    },
    {
      num: '02', code: 'CDC',
      title: 'Continuous CDC',
      desc: 'Track every INSERT, UPDATE, and DELETE from PostgreSQL, MySQL, and MongoDB via native WAL / binlog tailing. No polling, no full scans.',
      spec: [['LATENCY', 'sub-minute end-to-end'], ['DELIVERY', 'exactly-once via idempotent batch UUIDs']],
    },
    {
      num: '03', code: 'HOT-BUF',
      title: 'Arrow Flight Hot Buffer',
      desc: 'Freshest data served via Apache Arrow Flight at sub-second latency. Cold data lands in Iceberg. One product, two latency tiers.',
      spec: [['PROTOCOL', 'Arrow Flight'], ['USE', 'last-5-minutes without Iceberg commit cycles']],
    },
    {
      num: '04', code: 'COMPACT',
      title: 'Auto Compaction',
      desc: 'DV-aware compaction merges deletion vectors with data files automatically. No manual OPTIMIZE runs, no accumulating small files.',
      spec: [['MODE', 'autonomous'], ['KNOBS', 'threshold · schedule · parallelism']],
    },
    {
      num: '05', code: 'SCHEMA',
      title: 'Schema Evolution',
      desc: 'Source schema changes are detected and propagated to Iceberg as metadata-only operations. New columns use Iceberg default values — no data rewrite.',
      spec: [['CHANGES', 'widen · add · rename · drop'], ['SAFETY', 'safe widening by default']],
    },
    {
      num: '06', code: 'LINEAGE',
      title: 'Built-in Lineage',
      desc: 'Automatic table-level and column-level lineage, snapshot provenance, and OpenLineage export. Visibility that closed platforms keep proprietary.',
      spec: [['TABLES', 'system.lineage'], ['EVENTS', 'system.schema_changes · system.pipeline_runs']],
    },
    {
      num: '07', code: 'LAYOUT',
      title: 'Partitioning & Clustering',
      desc: 'PARTITION BY (day, bucket, truncate, …) and CLUSTER BY land at write time with full Iceberg manifest metadata. Hidden partitioning, manifest-level min/max bounds.',
      spec: [['TRANSFORMS', 'day · bucket · truncate'], ['DISTRIBUTION', "write_distribution_mode = 'hash'"]],
    },
    {
      num: '08', code: 'RESUME',
      title: 'Snapshot Resume',
      desc: 'Per-flush checkpoint written atomic with each Iceberg commit. The resume cursor lives in the snapshot summary itself — survives even a wiped local checkpoint.',
      spec: [['LOCATION', 'datashuttle.snapshot_position.*'], ['GUARANTEE', 'exactly-once after crash / kill']],
    },
  ]

  return (
    <section className="ds-sec" id="capabilities">
      <div className="ds-sec-head">
        <div className="ds-sec-num">§ 04</div>
        <div className="ds-sec-title">Capabilities · what the binary ships</div>
        <div className="ds-sec-stamp">8 items</div>
      </div>

      <div className="ds-manifest-table">
        <div className="ds-manifest-row head">
          <div>item</div>
          <div>description</div>
          <div>technical spec</div>
          <div>status</div>
        </div>
        {rows.map((r) => (
          <div className="ds-manifest-row" key={r.num}>
            <div className="cell ds-m-num">
              {r.num}
              <br />
              {r.code}
            </div>
            <div className="cell ds-m-desc">
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
            </div>
            <div className="cell ds-m-spec">
              {r.spec.map(([k, v]) => (
                <span key={k}>
                  <strong>{k}</strong> {v}
                  <br />
                </span>
              ))}
            </div>
            <div className="cell ds-m-stamp">
              <div className="st">SHIPPED</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────────
   § 05 — Physical Layout (from Partitioning.tsx)
   ────────────────────────────────────────────────────────────────── */
function PhysicalLayoutSection() {
  const capabilities = [
    {
      label: 'Hidden partitioning',
      title: 'PARTITION BY (transforms)',
      body:
        'Time-bucketed and hash-bucketed transforms applied at write time. Readers prune entire partitions before opening a single Parquet file — no partition columns to add to your queries.',
    },
    {
      label: 'Z-order inside files',
      title: 'CLUSTER BY (sort)',
      body:
        'Per-file sort order written into the table metadata. Engines use it to skip row groups via min/max pruning. Same data, same files, 5–50× faster on the columns you actually filter on.',
    },
    {
      label: 'Iceberg 1.5 distribution',
      title: 'write_distribution_mode',
      body:
        'Hash mode bundles every row with the same partition tuple into one Parquet file per commit. None mode is a passthrough for sources already clustered. Same knob every reader sees.',
    },
    {
      label: 'Throughput',
      title: 'File-size targeting',
      body:
        'Compression-aware row buffer cuts Parquet files at the actual on-disk size you ask for, not the in-memory Arrow estimate. Bulk snapshots stay at constant throughput end-to-end.',
    },
    {
      label: 'Exactly-once',
      title: 'Snapshot resume',
      body:
        'Every Iceberg commit writes the source position into the snapshot summary. A restart reads the cursor back from the catalog and continues from where the last successful commit landed.',
    },
    {
      label: 'Compaction-friendly',
      title: 'Manifest-level partition stats',
      body:
        'Every commit publishes per-partition min/max bounds and a contains_null flag in the manifest list. Readers prune entire manifests before touching any data file.',
    },
  ]

  return (
    <section className="ds-sec" id="layout">
      <div className="ds-sec-head">
        <div className="ds-sec-num">§ 05</div>
        <div className="ds-sec-title">Physical layout · every knob in plain SQL</div>
        <div className="ds-sec-stamp">6 knobs</div>
      </div>

      <div className="ds-layout-grid">
        <div className="ds-layout-code">
          <div className="ds-terminal">
            <div className="tbar">
              <span className="doc-id">events_pipeline.sql</span>
              <span className="doc-name"></span>
              <span className="doc-size">hash distribution</span>
            </div>
            <div className="tbody" style={{ gridTemplateColumns: '1fr' }}>
              <pre>
                <span className="kw">CREATE PIPELINE</span> events_warehouse{'\n'}
                <span className="ws">  </span><span className="kw">SOURCE</span> clickhouse <span className="kw">CONNECTION</span> <span className="str">'analytics'</span>{'\n'}
                <span className="ws">  </span><span className="kw">TABLES</span> (<span className="str">'events'</span>, <span className="str">'sessions'</span>){'\n'}
                <span className="ws">  </span><span className="kw">INTO</span> iceberg.warehouse.analytics{'\n'}
                <span className="ws">  </span><span className="kw">SCHEDULE</span> continuous{'\n'}
                <span className="ws">  </span><span className="kw">PARTITION BY</span> ({'\n'}
                <span className="ws">    </span>day(event_ts),{'\n'}
                <span className="ws">    </span>bucket(<span className="num">16</span>, user_id){'\n'}
                <span className="ws">  </span>){'\n'}
                <span className="ws">  </span><span className="kw">CLUSTER BY</span> (event_ts ASC, user_id ASC){'\n'}
                <span className="ws">  </span><span className="kw">WITH</span> ({'\n'}
                <span className="ws">    </span>write_distribution_mode = <span className="str">'hash'</span>,{'\n'}
                <span className="ws">    </span>target_file_bytes = <span className="str">'64 MB'</span>,{'\n'}
                <span className="ws">    </span>target_file_rows = <span className="num">5000000</span>{'\n'}
                <span className="ws">  </span>);
              </pre>
            </div>
          </div>
          <p className="ds-layout-note">
            Every clause maps to a concrete Iceberg table property the next reader
            will see — including engines that have never heard of DataShuttle.
          </p>
        </div>

        <div className="ds-layout-caps">
          {capabilities.map((c) => (
            <div className="ds-layout-cap" key={c.title}>
              <span className="ds-layout-cap-label">{c.label}</span>
              <h4>{c.title}</h4>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────────
   § 06 — Comparison (from Comparison.tsx)
   ────────────────────────────────────────────────────────────────── */
type Cell = string | boolean
function ComparisonSection() {
  const rows: { feature: string; ds: Cell; debezium: Cell; dlt: Cell; fivetran: Cell }[] = [
    { feature: 'Iceberg native',            ds: true,  debezium: false,            dlt: false,            fivetran: false },
    { feature: 'Deletion vectors',          ds: true,  debezium: false,            dlt: false,            fivetran: false },
    { feature: 'Continuous CDC',            ds: true,  debezium: true,             dlt: 'Limited',        fivetran: true },
    { feature: 'Schema auto-evolution',     ds: true,  debezium: 'Partial',        dlt: true,             fivetran: 'Limited' },
    { feature: 'Auto compaction',           ds: true,  debezium: false,            dlt: true,             fivetran: false },
    { feature: 'Arrow Flight buffer',       ds: true,  debezium: false,            dlt: false,            fivetran: false },
    { feature: 'Built-in lineage',          ds: true,  debezium: false,            dlt: false,            fivetran: false },
    { feature: 'Inline transforms (SQL)',   ds: true,  debezium: false,            dlt: true,             fivetran: 'Limited' },
    { feature: 'Zero orchestration deps',   ds: true,  debezium: 'Kafka Connect',  dlt: 'N/A (ad-hoc)',   fivetran: 'N/A (SaaS)' },
    { feature: 'Single daemon process',     ds: true,  debezium: false,            dlt: 'N/A',            fivetran: 'SaaS' },
    { feature: 'Thin CLI (~12 MB)',         ds: true,  debezium: false,            dlt: 'Python runtime', fivetran: false },
    { feature: 'Self-hosted',               ds: true,  debezium: true,             dlt: true,             fivetran: false },
    { feature: 'Data stays in your VPC',    ds: true,  debezium: true,             dlt: true,             fivetran: false },
  ]

  return (
    <section className="ds-sec" id="comparison">
      <div className="ds-sec-head">
        <div className="ds-sec-num">§ 06</div>
        <div className="ds-sec-title">Built for Iceberg · not adapted for it</div>
        <div className="ds-sec-stamp">4 way</div>
      </div>

      <div className="ds-compare">
        <div className="ds-compare-row head">
          <div>Feature</div>
          <div className="primary">DataShuttle · Iceberg-native</div>
          <div>Debezium + Flink · DIY</div>
          <div>Delta Live Tables · Databricks</div>
          <div>Fivetran · SaaS</div>
        </div>
        {rows.map((r) => (
          <div className="ds-compare-row" key={r.feature}>
            <div className="feat">{r.feature}</div>
            <div className="primary"><Cellv v={r.ds} /></div>
            <div><Cellv v={r.debezium} /></div>
            <div><Cellv v={r.dlt} /></div>
            <div><Cellv v={r.fivetran} /></div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Cellv({ v }: { v: Cell }) {
  if (v === true) return <span className="ds-tick" aria-label="yes">✓</span>
  if (v === false) return <span className="ds-cross" aria-label="no">✗</span>
  return <span className="ds-partial">{v}</span>
}

/* ──────────────────────────────────────────────────────────────────
   § 07 — Connectors (from Connectors.tsx)
   ────────────────────────────────────────────────────────────────── */
function ConnectorsSection() {
  const connectors = [
    { name: 'PostgreSQL',        category: 'Database' },
    { name: 'MySQL',             category: 'Database' },
    { name: 'Oracle',            category: 'Database' },
    { name: 'SQL Server',        category: 'Database' },
    { name: 'MongoDB',           category: 'Database' },
    { name: 'S3 / GCS / ADLS',   category: 'Object Store' },
    { name: 'Apache Kafka',      category: 'Streaming' },
    { name: 'REST API',          category: 'HTTP' },
    { name: 'Hadoop / HDFS',     category: 'Batch' },
    { name: 'Greenplum',         category: 'Database' },
    { name: 'Snowflake',         category: 'Warehouse' },
    { name: 'Google BigQuery',   category: 'Warehouse' },
    { name: 'Databricks',        category: 'Warehouse' },
    { name: 'ClickHouse',        category: 'Database' },
    { name: 'Amazon DynamoDB',   category: 'NoSQL' },
    { name: 'Amazon Kinesis',    category: 'Streaming' },
    { name: 'Apache Cassandra',  category: 'NoSQL' },
    { name: 'CockroachDB',       category: 'Database' },
    { name: 'Vertica',           category: 'Warehouse' },
    { name: 'StarRocks',         category: 'Warehouse' },
    { name: 'Local Files',       category: 'Batch' },
  ]

  return (
    <section className="ds-sec" id="sources">
      <div className="ds-sec-head">
        <div className="ds-sec-num">§ 07</div>
        <div className="ds-sec-title">Sources · {connectors.length} connectors, all GA</div>
        <div className="ds-sec-stamp">SDK · Rust trait</div>
      </div>

      <div className="ds-connectors">
        {connectors.map((c) => (
          <div className="ds-connector" key={c.name}>
            <div className="name">{c.name}</div>
            <div className="cat">{c.category}</div>
            <span className="ga">GA</span>
          </div>
        ))}
      </div>
      <p className="ds-connectors-foot">
        Custom connectors via the Connector SDK (Rust trait). More sources added each release.
      </p>
    </section>
  )
}
