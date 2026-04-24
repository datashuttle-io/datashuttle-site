import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { Icon as InkIcon } from '../components/Icon'

function Icon({ n, cls = '' }: { n: string; cls?: string }) {
  return <InkIcon name={n} size={14} className={cls} />
}
function IconLg({ n }: { n: string }) {
  return <InkIcon name={n} size={22} className="ico" />
}

const FEATURES = [
  ['hard-drive', 'Iceberg Native',
    'Deletion vectors, row lineage, default column values, VARIANT type. Built for the modern table format from day one — not bolted onto a legacy writer.'],
  ['database', 'Continuous CDC',
    'Track every INSERT, UPDATE, and DELETE from PostgreSQL, MySQL, and MongoDB via native WAL/binlog tailing. No polling, no full scans.'],
  ['activity', 'Arrow Flight Hot Buffer',
    'Freshest data served via Apache Arrow Flight at sub-second latency. Cold data lands in Iceberg. One product, two latency tiers.'],
  ['settings-2', 'Auto Compaction',
    'DV-aware compaction merges deletion vectors with data files automatically. No manual OPTIMIZE runs, no accumulating small files.'],
  ['git-branch', 'Schema Evolution',
    'Source schema changes are detected and propagated to Iceberg as metadata-only operations. New columns use Iceberg default values — no data rewrite.'],
  ['waypoints', 'Built-in Lineage',
    'Automatic table-level and column-level lineage, snapshot provenance, and OpenLineage export. Visibility that closed platforms keep proprietary.'],
]

const RATES = [
  {
    name: 'Self-hosted',
    price: '$0',
    unit: '/ forever',
    desc: 'Run the same binary on your infrastructure. Community support via GitHub.',
    bullets: ['All 21 GA source connectors', 'Iceberg V3 + deletion vectors', 'Sub-minute CDC latency', 'No seat minimums'],
    cta: 'Download',
    to: '/download',
    variant: 'secondary',
  },
  {
    name: 'Cloud (managed)',
    price: '50¢',
    unit: '/ DPU',
    desc: 'Fully managed control plane on datashuttle.ai. 10,000 DPU free every month.',
    bullets: ['Managed control plane', 'SOC 2 · HIPAA-ready', 'SSO · audit log', '99.95% SLA'],
    cta: 'Start free',
    to: '/cloud',
    variant: 'primary',
    featured: true,
  },
  {
    name: 'Airgapped',
    price: '30¢',
    unit: '/ DPU',
    desc: 'Signed tarball behind your firewall. FedRAMP / IL-5 assistance, dedicated SE.',
    bullets: ['Offline runtime', 'FedRAMP assist', 'Dedicated support engineer', 'BYO Iceberg catalog'],
    cta: 'Contact sales',
    to: 'mailto:sales@datashuttle.ai',
    variant: 'secondary',
  },
]

export default function Home() {
  return (
    <>
      <SEO
        title="DataShuttle — Iceberg-Native Ingestion Engine"
        description="Move data from PostgreSQL, MySQL, MongoDB, Kafka into Apache Iceberg with one SQL statement. Sub-minute CDC, deletion vectors, zero operational overhead."
        path="/"
      />
      <div className="ds-wrap">
        <section className="ds-hero">
          <div>
            <div className="eyebrow">
              <span className="pill">Iceberg V3 · now in private beta</span>
            </div>
            <h1>Any source. Apache Iceberg. One SQL statement.</h1>
            <p className="lede">
              DataShuttle is a standalone ingestion engine that moves data from
              PostgreSQL, MySQL, MongoDB, and Kafka into Iceberg tables — with
              sub-minute latency, automatic schema evolution, and zero operational
              overhead.
            </p>
            <div className="actions">
              <Link className="ds-btn ds-btn-primary" to="/cloud">
                Start free on Cloud <Icon n="arrow-right" />
              </Link>
              <Link className="ds-btn ds-btn-secondary" to="/download">
                <Icon n="download" /> Download binary
              </Link>
            </div>
          </div>
          <div className="figure">
            <div className="bar">
              <span className="dots"><span /><span /><span /></span>
              <span style={{ marginLeft: 10 }}>datashuttle — customer_sync.sql</span>
            </div>
            <pre>
              <span className="kw">CREATE PIPELINE</span> customer_sync{'\n'}
              {'  '}<span className="kw">SOURCE</span> postgres <span className="kw">CONNECTION</span> <span className="str">'crm_prod'</span>{'\n'}
              {'  '}<span className="kw">TABLES</span> <span className="punc">(</span><span className="str">'accounts'</span>, <span className="str">'orders'</span>, <span className="str">'payments'</span><span className="punc">)</span>{'\n'}
              {'  '}<span className="kw">INTO</span> iceberg.warehouse.crm{'\n'}
              {'  '}<span className="kw">SCHEDULE</span> continuous{'\n'}
              {'  '}<span className="kw">WITH</span> <span className="punc">(</span>{'\n'}
              {'    '}iceberg_format_version <span className="punc">=</span> <span className="punc">3</span>,{'\n'}
              {'    '}delete_mode <span className="punc">=</span> <span className="str">'deletion_vectors'</span>,{'\n'}
              {'    '}schema_evolution <span className="punc">=</span> <span className="str">'compatible'</span>{'\n'}
              {'  '}<span className="punc">)</span>;
            </pre>
          </div>
        </section>

        <section className="ds-sec" id="why">
          <div className="ds-sec-head">
            <div className="eyebrow">01 · why datashuttle</div>
            <h2>Ingestion shouldn't require a team to operate.</h2>
            <p>The lakehouse ingest stack is usually glued together out of four or five open-source projects plus a rotating cast of custom scripts. DataShuttle replaces that stack with a single Rust daemon plus an optional ~12 MB CLI.</p>
          </div>
          <div className="ds-compare">
            <div className="col">
              <h3>Typical stack <span className="tag">5+ components</span></h3>
              <div className="stack-list">
                {[
                  ['kafka', 'message broker'],
                  ['debezium', 'CDC connector'],
                  ['kafka-connect', 'sink plumbing'],
                  ['flink', 'stream processing'],
                  ['airflow', 'orchestration'],
                  ['~6,000 LOC', 'custom glue'],
                ].map(([name, note]) => (
                  <div className="item" key={name}>
                    <span className="x">·</span><span>{name}</span><span className="note">{note}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col">
              <h3>DataShuttle <span className="tag">1 daemon</span></h3>
              <div className="after-sole">
                <img className="mark" src="/brand/logo-mark.svg" alt="" />
                <div>
                  <div className="name">datashuttle</div>
                  <div className="sub">single binary · single SQL statement</div>
                </div>
              </div>
              <p style={{ font: '400 13px/1.55 var(--font-sans)', color: 'var(--fg-2)', marginTop: 16 }}>
                Continuous CDC, schema evolution, compaction, deletion vectors, and
                Iceberg commit coordination — inside one Rust runtime. No standalone
                Kafka. No Flink job. No YAML graph. Sub-minute freshness instead of
                6–24 hour batch lag, no Delta / Snowflake lock-in.
              </p>
            </div>
          </div>
        </section>

        <section className="ds-sec" id="features">
          <div className="ds-sec-head">
            <div className="eyebrow">02 · capabilities</div>
            <h2>Everything your lakehouse ingestion layer needs.</h2>
            <p>What the binary ships with. Each one replaces a system you'd otherwise run yourself.</p>
          </div>
          <div className="ds-features">
            {FEATURES.map(([ico, title, body]) => (
              <div className="ds-feat" key={title}>
                <IconLg n={ico} />
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="ds-sec" id="pricing">
          <div className="ds-sec-head">
            <div className="eyebrow">03 · pricing</div>
            <h2>Pay per DPU. One metric, three deployment modes.</h2>
            <p>A DPU (DataShuttle Processing Unit) covers any of: 1&nbsp;GB ingested, 100k CDC events, 1 connector-hour, or 1 vCPU-hour. 10,000 DPU free every month on Cloud.</p>
          </div>
          <div className="ds-pricing">
            {RATES.map((r) => (
              <div className={`ds-plan${r.featured ? ' featured' : ''}`} key={r.name}>
                <h3>{r.name}</h3>
                <div className="price"><span className="n">{r.price}</span><span className="u">{r.unit}</span></div>
                <p className="desc">{r.desc}</p>
                <ul>
                  {r.bullets.map((b) => (
                    <li key={b}><Icon n="check" /><span>{b}</span></li>
                  ))}
                </ul>
                {r.to.startsWith('mailto:') ? (
                  <a className={`ds-btn ds-btn-${r.variant}`} href={r.to}>{r.cta}</a>
                ) : (
                  <Link className={`ds-btn ds-btn-${r.variant}`} to={r.to}>{r.cta}</Link>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
