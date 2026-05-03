import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { Icon } from '../components/Icon'

type Maturity = 'ga' | 'beta' | 'alpha' | 'planned'

interface Capability {
  title: string
  maturity: Maturity
  body: string
}

const CAPS: Capability[] = [
  {
    title: 'SQL-first control plane',
    maturity: 'ga',
    body: 'CREATE SHUTTLE / ALTER SHUTTLE / DROP SHUTTLE as the public API. No YAML graphs, no UI-only state.',
  },
  {
    title: 'Continuous change capture',
    maturity: 'beta',
    body: 'Native WAL tailing for PostgreSQL, binlog for MySQL, oplog for MongoDB, and consumer groups for Kafka. The commit protocol is TLA+-specified; implementation hardening of the exactly-once path is tracked on Status.',
  },
  {
    title: 'Iceberg V3 writer',
    maturity: 'beta',
    body: 'Deletion vectors on by default. Partition evolution applied at write time — every Arrow batch is split by partition tuple and written to Hive-style paths. Manifest-level partition metadata written so readers can prune without opening files.',
  },
  {
    title: 'Schema evolution',
    maturity: 'beta',
    body: 'Compatible evolution — add column with default, widen type — propagated from the source as metadata-only operations. No data rewrite.',
  },
  {
    title: 'Commit batching + WAL',
    maturity: 'ga',
    body: 'Per-table staging buffer. Auto-flush on file count, byte size, or interval. Append-only per-shuttle WAL survives crash and resumes on startup. Default and tighter CDC-mode thresholds configurable via WITH (...) overrides.',
  },
  {
    title: 'Arrow Flight hot path',
    maturity: 'alpha',
    body: 'Fresh rows served over Flight while Iceberg commits land on the cold path. Two latency surfaces from one engine. Hot-buffer flush/idempotency has specified semantics; test coverage is being expanded.',
  },
  {
    title: 'Lineage',
    maturity: 'beta',
    body: 'Table- and column-level lineage, snapshot provenance, OpenLineage export. Interactive DAG viewer in the control plane.',
  },
  {
    title: 'Resource pools',
    maturity: 'beta',
    body: 'cgroups v2 isolation for shared / dedicated / elastic pool kinds. Pin noisy shuttles to a capped CPU slice; reserve RAM for latency-sensitive ones. No Kubernetes required.',
  },
  {
    title: 'Security architecture',
    maturity: 'beta',
    body: 'Ed25519-signed audit chain, constant-time auth comparison, tenant-scoped S3 prefixes + IAM, secret redaction in logs. KMS for S3, RDS, Secrets Manager. RBAC enforcement hardening is in progress — see Status.',
  },
  {
    title: 'Signed license, one artefact across modes',
    maturity: 'ga',
    body: 'Ed25519-signed JSON license validated offline with a key compiled into the binary. Same artefact works in Cloud, self-hosted, and airgapped installs. Hot reload via SIGHUP.',
  },
  {
    title: 'Metered usage (DPU)',
    maturity: 'beta',
    body: 'One metric across bytes, CDC events, connector-hours, vCPU-hours. Streamed to the metering bus in Cloud; pushed every 24h in self-hosted online; chained local signed ledger in airgapped.',
  },
  {
    title: 'FedRAMP / HIPAA scope',
    maturity: 'planned',
    body: 'Tracked for post-1.0. Attestations and scope letters will appear on Status when available.',
  },
]

function MaturityBadge({ m }: { m: Maturity }) {
  const label = m === 'ga' ? 'GA' : m === 'beta' ? 'Beta' : m === 'alpha' ? 'Alpha' : 'Planned'
  return <span className={`ds-maturity ${m}`}>{label}</span>
}

export default function Product() {
  return (
    <>
      <SEO
        title="Product — DataShuttle"
        description="What the DataShuttle engine does: Iceberg V3 writer, continuous change capture, Arrow Flight hot path, lineage, signed licensing. With explicit GA / Beta / Alpha maturity per capability."
        path="/product"
      />
      <div className="ds-wrap">
        <section className="ds-hero" style={{ gridTemplateColumns: '1fr' }}>
          <div>
            <div className="eyebrow">
              <span className="pill">Product</span>
            </div>
            <h1>What DataShuttle does.</h1>
            <p className="lede">
              A capability inventory, with explicit maturity per item. Nothing on
              this page is labelled GA unless it is actually running in
              production-representative shuttles today.
            </p>
            <div className="actions">
              <Link className="ds-btn ds-btn-secondary" to="/status">
                Current release status <Icon name="arrow-right" />
              </Link>
              <a className="ds-btn ds-btn-ghost" href="https://docs.datashuttle.ai">
                Read the docs ↗
              </a>
            </div>
          </div>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <div className="eyebrow">01 · capabilities</div>
            <h2>Engine surface.</h2>
            <p>
              Each capability carries one of four tags.{' '}
              <span className="ds-maturity ga">GA</span> — covered by tests and
              shipping in Cloud private beta.{' '}
              <span className="ds-maturity beta">Beta</span> — functional with
              known hardening items tracked on{' '}
              <Link to="/status" style={{ color: 'var(--accent-400)' }}>Status</Link>.{' '}
              <span className="ds-maturity alpha">Alpha</span> — behaviour
              specified, test coverage or observability still maturing.{' '}
              <span className="ds-maturity planned">Planned</span> — on the
              roadmap, not built.
            </p>
          </div>
          <div className="ds-features">
            {CAPS.map((c) => (
              <div className="ds-feat" key={c.title}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h4 style={{ margin: 0 }}>{c.title}</h4>
                  <MaturityBadge m={c.maturity} />
                </div>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <div className="eyebrow">02 · sources</div>
            <h2>Connectors.</h2>
            <p>
              Core sources are available on every build. The full catalogue is
              available in Cloud and in source builds with{' '}
              <code>--features cdc-all</code>.
            </p>
          </div>
          <div className="ds-compare">
            <div className="col">
              <h3>Core (every build)</h3>
              <div className="stack-list">
                {[
                  ['PostgreSQL', 'WAL CDC'],
                  ['MySQL', 'binlog CDC'],
                  ['MongoDB', 'oplog CDC'],
                  ['Kafka', 'consumer group'],
                  ['File', 'Parquet / CSV / JSONL'],
                  ['REST API', 'polled ingest'],
                ].map(([name, note]) => (
                  <div className="item" key={name}>
                    <span className="x">·</span><span>{name}</span><span className="note">{note}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col">
              <h3>Extended catalogue <span className="tag">cdc-all / Cloud</span></h3>
              <div className="stack-list">
                {[
                  ['Oracle', 'LogMiner'],
                  ['SQL Server', 'CDC tables'],
                  ['Snowflake', 'unload'],
                  ['Databricks', 'SQL Warehouse'],
                  ['BigQuery', 'Storage API'],
                  ['ClickHouse', 'native block'],
                  ['Redshift', 'unload'],
                  ['Cassandra / Scylla', 'CDC log'],
                  ['CockroachDB', 'changefeeds'],
                  ['Greenplum · Vertica · StarRocks', 'bulk + CDC'],
                  ['DynamoDB · Kinesis', 'streams'],
                  ['Hadoop · cloud storage', 'batch'],
                ].map(([name, note]) => (
                  <div className="item" key={name}>
                    <span className="x">·</span><span>{name}</span><span className="note">{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p
            style={{
              marginTop: 16,
              font: '400 13px var(--font-sans)',
              color: 'var(--fg-3)',
            }}
          >
            Full reference:{' '}
            <a
              href="https://docs.datashuttle.ai/connectors/postgresql"
              style={{ color: 'var(--accent-400)' }}
            >
              docs.datashuttle.ai/connectors
            </a>
            .
          </p>
        </section>
      </div>
    </>
  )
}
