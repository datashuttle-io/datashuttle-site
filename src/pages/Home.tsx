import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { Icon } from '../components/Icon'

function IconLg({ n }: { n: string }) {
  return <Icon name={n} size={22} className="ico" />
}

const FEATURES: Array<[string, string, string]> = [
  [
    'hard-drive',
    'Iceberg V3 native',
    'Deletion vectors, row lineage, partition evolution, VARIANT columns. Written as a V3 writer from day one — not retrofitted on a legacy one.',
  ],
  [
    'database',
    'Continuous change capture',
    'Reads the source WAL, binlog, or oplog — no polling, no full rescans. Schema changes propagate as metadata-only operations.',
  ],
  [
    'activity',
    'Arrow Flight hot path',
    'Fresh rows served over Apache Arrow Flight while Iceberg commits land on the cold path. One engine, two latency surfaces.',
  ],
  [
    'settings-2',
    'Commit batching',
    'Per-table staging buffer with a write-ahead log. Auto-flush on size, count, or interval. Bounded small-file churn.',
  ],
  [
    'git-branch',
    'Schema evolution',
    'Compatible evolution (add column with default, widen type) applied without rewriting existing data.',
  ],
  [
    'waypoints',
    'Lineage built in',
    'Table- and column-level lineage, snapshot provenance, OpenLineage export — available across every deployment mode.',
  ],
]

export default function Home() {
  return (
    <>
      <SEO
        title="DataShuttle — Iceberg-native ingestion engine"
        description="Move operational data from Postgres, MySQL, MongoDB, and Kafka into Apache Iceberg with one SQL statement. One Rust binary. Managed cloud, self-hosted, or airgapped."
        path="/"
      />
      <div className="ds-wrap">
        <section className="ds-hero">
          <div>
            <div className="eyebrow">
              <span className="pill">Iceberg V3 · pre-1.0 · cloud private beta</span>
            </div>
            <h1>Operational data into Apache Iceberg. One SQL statement.</h1>
            <p className="lede">
              DataShuttle is an ingestion engine that lands data from PostgreSQL,
              MySQL, MongoDB, and Kafka into Iceberg — with continuous change
              capture, schema evolution, and V3 deletion vectors. One Rust binary
              runs in our managed cloud, on your infrastructure, or fully airgapped.
            </p>
            <div className="actions">
              <a
                className="ds-btn ds-btn-primary"
                href="https://app.datashuttle.ai/signup"
              >
                Create account <Icon name="arrow-right" />
              </a>
              <Link className="ds-btn ds-btn-secondary" to="/install">
                <Icon name="download" /> Install locally
              </Link>
            </div>
            <p
              style={{
                marginTop: 16,
                font: '400 12px/1.5 var(--font-mono)',
                color: 'var(--fg-3)',
                maxWidth: '52ch',
              }}
            >
              Cloud is in private beta. New signups are manually approved after
              email verification — usually within one business day.
            </p>
          </div>
          <div className="figure">
            <div className="bar">
              <span className="dots"><span /><span /><span /></span>
              <span style={{ marginLeft: 10 }}>datashuttle — customer_sync.sql</span>
            </div>
            <pre>
              <span className="kw">CREATE SHUTTLE</span> customer_sync{'\n'}
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
            <div className="eyebrow">01 · why a dedicated engine</div>
            <h2>Stop gluing Kafka, Debezium, Flink, and custom code for every shuttle.</h2>
            <p>
              A typical lakehouse ingestion stack is four or five moving parts plus
              orchestration. DataShuttle replaces that chain with a single Rust
              daemon that speaks source protocols, commits to Iceberg, and handles
              schema evolution.
            </p>
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
                  ['custom glue', 'per-source scripts'],
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
                  <div className="sub">one binary · one SQL statement</div>
                </div>
              </div>
              <p style={{ font: '400 13px/1.55 var(--font-sans)', color: 'var(--fg-2)', marginTop: 16 }}>
                Continuous change capture, schema evolution, compaction, deletion
                vectors, and Iceberg commit coordination — inside one Rust runtime.
                No standalone Kafka. No Flink job. No YAML graph.
              </p>
            </div>
          </div>
        </section>

        <section className="ds-sec" id="features">
          <div className="ds-sec-head">
            <div className="eyebrow">02 · what the binary ships with</div>
            <h2>Everything your lakehouse ingestion layer needs.</h2>
            <p>
              Short summary of what's inside. See{' '}
              <Link to="/product" style={{ color: 'var(--accent-400)' }}>Product</Link>{' '}
              for maturity tags (GA / Beta / Alpha) and the full capability list.
            </p>
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

        <section className="ds-sec" id="deployment">
          <div className="ds-sec-head">
            <div className="eyebrow">03 · deployment</div>
            <h2>Three modes. One binary. One license.</h2>
            <p>
              The engine is the same everywhere. You pick where it runs based on
              who you trust with the data and the control plane.
            </p>
          </div>
          <div className="ds-features">
            <div className="ds-feat">
              <h4>Cloud</h4>
              <p style={{ color: 'var(--fg-3)', font: '500 11px var(--font-mono)', letterSpacing: '0.04em' }}>
                Private beta · by invitation
              </p>
              <p>
                Managed control plane on <code>app.datashuttle.ai</code>. We run,
                patch, and back it up. New signups enter an approval queue after
                email verification.
              </p>
            </div>
            <div className="ds-feat">
              <h4>Self-hosted</h4>
              <p style={{ color: 'var(--fg-3)', font: '500 11px var(--font-mono)', letterSpacing: '0.04em' }}>
                Early access
              </p>
              <p>
                systemd, Docker, or Kubernetes via Helm. You run the daemon; we
                support the engine. Same binary as Cloud.
              </p>
            </div>
            <div className="ds-feat">
              <h4>Airgapped</h4>
              <p style={{ color: 'var(--fg-3)', font: '500 11px var(--font-mono)', letterSpacing: '0.04em' }}>
                Early access
              </p>
              <p>
                Signed tarball behind your firewall. Offline license ledger,
                no phone-home, quarterly usage export for reconciliation.
              </p>
            </div>
          </div>
          <div
            className="actions"
            style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}
          >
            <Link className="ds-btn ds-btn-secondary" to="/deployment">
              Compare deployment modes <Icon name="arrow-right" />
            </Link>
            <Link className="ds-btn ds-btn-ghost" to="/pricing">
              See pricing
            </Link>
          </div>
        </section>

        <section className="ds-sec" id="status">
          <div className="ds-sec-head">
            <div className="eyebrow">04 · status</div>
            <h2>Where DataShuttle stands today.</h2>
            <p>
              DataShuttle is pre-1.0. Rather than ship a compliance-badge wall, we
              keep a single source of truth on{' '}
              <Link to="/status" style={{ color: 'var(--accent-400)' }}>/status</Link>:
              current release tag, per-feature maturity, known limitations, and
              the compliance roadmap.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
