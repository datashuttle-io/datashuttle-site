import { useEffect, useState } from 'react'
import CodeBlock from './CodeBlock'

type OsKind = 'macOS' | 'Linux' | 'Windows' | null

function detectOs(): OsKind {
  if (typeof navigator === 'undefined') return null
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac')) return 'macOS'
  if (ua.includes('win')) return 'Windows'
  if (ua.includes('linux') || ua.includes('x11')) return 'Linux'
  return null
}

const HERO_SQL = `CREATE PIPELINE customer_sync
  SOURCE postgres CONNECTION 'crm_prod'
  TABLES ('accounts', 'orders', 'payments')
  INTO iceberg.warehouse.crm
  SCHEDULE continuous
  PARTITION BY (day(created_at), bucket(16, account_id))
  CLUSTER BY (account_id ASC)
  WITH (
    iceberg_format_version = 3,
    delete_mode = 'deletion_vectors',
    write_distribution_mode = 'hash',
    target_file_bytes = '64 MB',
    row_lineage = true,
    schema_evolution = 'compatible'
  );`

export default function Hero() {
  const [os, setOs] = useState<OsKind>(null)
  useEffect(() => {
    setOs(detectOs())
  }, [])
  // Docker Hub is the only multi-OS distribution channel that will be
  // live at public-launch time; Homebrew tap, apt/dnf repos, and the
  // macOS .pkg installer follow in their own issues. Until those
  // ship, every "Download for <OS>" click lands on the same Docker
  // Hub page — matches the "Self-host with Docker" CTA elsewhere.
  const DOCKER_HUB = 'https://hub.docker.com/r/datashuttle/datashuttle'
  const downloadLabel = os ? `Download for ${os}` : 'Download for self-host'
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center pt-16 overflow-hidden bg-slate-950">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-indigo-950/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-violet-900/20 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center min-w-0">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Iceberg-native · Now in private beta
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.08]">
          Any source.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            Apache Iceberg.
          </span>
          <br />
          One SQL statement.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          DataShuttle is a standalone ingestion engine that moves data from PostgreSQL, MySQL, MongoDB,
          Kafka, and more into Iceberg tables — with sub-minute latency, automatic schema evolution,
          and zero operational overhead.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <a
            href="/cloud"
            className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95"
          >
            Start free on Cloud →
          </a>
          <a
            href={DOCKER_HUB}
            className="px-8 py-3.5 rounded-full border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-sm transition-all active:scale-95"
          >
            {downloadLabel} →
          </a>
        </div>

        {/* Code block */}
        <div className="w-full max-w-2xl min-w-0">
          <CodeBlock code={HERO_SQL} language="sql" filename="pipeline.sql" />
        </div>

        {/* Social proof */}
        <p className="mt-8 text-xs text-slate-600">
          No Kafka. No Flink. No Spark. No complex orchestration.
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  )
}
