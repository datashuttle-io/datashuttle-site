import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { Icon } from '../components/Icon'

/// The point of this page is to be boring. No hero metrics, no screenshots.
/// Just the current state of the product, updated on release.

interface StatusRow {
  label: string
  value: React.ReactNode
}

const RELEASE_ROWS: StatusRow[] = [
  {
    label: 'Latest release',
    value: (
      <a
        href="https://github.com/datashuttle-ai/datashuttle/releases"
        style={{ color: 'var(--accent-400)' }}
      >
        See GitHub Releases →
      </a>
    ),
  },
  {
    label: 'Product maturity',
    value: 'Pre-1.0. Actively developed.',
  },
  {
    label: 'Cloud',
    value:
      'Private beta by invitation. Self-registration is open; accounts go through manual approval after email verification.',
  },
  {
    label: 'Self-hosted',
    value:
      'Early access. systemd, Docker, Helm supported. Core connectors default; full catalogue via --features cdc-all.',
  },
  {
    label: 'Airgapped',
    value: 'Early access. Signed tarball; offline licence ledger; no phone-home required.',
  },
]

type Maturity = 'ga' | 'beta' | 'alpha' | 'planned'
interface FeatureStatus {
  area: string
  maturity: Maturity
  note: string
}

const FEATURES: FeatureStatus[] = [
  { area: 'SQL-first control plane (CREATE / ALTER / DROP SHUTTLE)', maturity: 'ga', note: 'Public API; stable.' },
  { area: 'Iceberg V3 writer — deletion vectors, partition evolution, schema evolution', maturity: 'beta', note: 'Default ON. Interoperability with other V3 readers tracked via integration tests.' },
  { area: 'Commit batching + per-shuttle WAL', maturity: 'ga', note: 'Default thresholds tuned for snapshot and CDC paths separately.' },
  { area: 'Continuous CDC — Postgres WAL, MySQL binlog, MongoDB oplog, Kafka', maturity: 'beta', note: 'Exactly-once commit protocol is TLA+-specified; implementation hardening ongoing.' },
  { area: 'Snapshot resume / crash-safe checkpointing', maturity: 'beta', note: 'Catalog snapshot summary is the source of truth. Single-shard exactly-once today; multi-shard parallel snapshot resume is a tracked follow-up.' },
  { area: 'Arrow Flight hot buffer', maturity: 'alpha', note: 'Behaviour specified, observability and unit-test coverage being expanded.' },
  { area: 'Lineage (table, column, snapshot) + OpenLineage export', maturity: 'beta', note: 'Interactive DAG viewer in the control plane.' },
  { area: 'Resource pools (cgroups v2)', maturity: 'beta', note: 'shared / dedicated / elastic pool kinds.' },
  { area: 'Ed25519 audit chain', maturity: 'beta', note: '`datashuttle audit verify` walks the chain and rejects tampered rows.' },
  { area: 'Tenant isolation — S3 prefix + IAM, JWT scoping', maturity: 'beta', note: 'Middleware prevents X-Tenant-ID spoofing.' },
  { area: 'RBAC enforcement on API endpoints', maturity: 'alpha', note: 'Role model defined; enforcement hardening across routes in progress.' },
  { area: 'DPU metering — cloud, self-hosted, airgapped', maturity: 'beta', note: 'Local bucket persistence to Postgres in active work.' },
  { area: 'Signed license (Ed25519), hot reload via SIGHUP', maturity: 'ga', note: 'Validated offline with a key compiled into the binary.' },
]

const LIMITATIONS = [
  'Multi-shard parallel snapshot resume uses a conservative min-of-shards cursor; a small re-read from the slowest shard\'s tail is possible on crash.',
  'RBAC enforcement is in progress across API endpoints; operate Cloud and self-hosted trusted environments accordingly until GA.',
  'The notification service ships a log-only sink today; SMTP / Slack delivery is in the Phase 4 roadmap.',
  'Scheduled in-process backups are not yet available; use the CLI and an external scheduler until the scheduler lands.',
  'Pod Security Standards labels and restrictive NetworkPolicies are not applied by the default Helm values — tighten before production.',
]

const SECURITY = [
  'Zero `unsafe` in the Rust core.',
  'Constant-time comparison for auth tokens; secret redaction in Debug / Serialize impls.',
  'Tenant-scoped S3 prefixes, IAM policies, and Iceberg catalog namespaces.',
  'Per-admin action signing into an Ed25519 audit chain; tamper-evident under `datashuttle audit verify`.',
  'KMS encryption for S3 buckets, RDS, and Secrets Manager on the managed cloud deployment.',
  'OIDC / IRSA for EKS — no long-lived IAM keys.',
  'Multi-stage Docker build, non-root user, tini as PID 1.',
  'Dependency supply chain: `deny.toml` blocks copyleft, unknown registries, and yanked crates.',
]

function Row({ label, value }: StatusRow) {
  return (
    <div className="ds-status-row">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  )
}

function MaturityBadge({ m }: { m: Maturity }) {
  const label = m === 'ga' ? 'GA' : m === 'beta' ? 'Beta' : m === 'alpha' ? 'Alpha' : 'Planned'
  return <span className={`ds-maturity ${m}`}>{label}</span>
}

export default function Status() {
  return (
    <>
      <SEO
        title="Status — DataShuttle"
        description="Current product state: release, deployment-mode availability, feature maturity, known limitations, security architecture, compliance roadmap."
        path="/status"
      />
      <div className="ds-wrap">
        <section className="ds-hero" style={{ gridTemplateColumns: '1fr' }}>
          <div>
            <div className="eyebrow">
              <span className="pill">Status</span>
            </div>
            <h1>Where DataShuttle stands today.</h1>
            <p className="lede">
              DataShuttle is pre-1.0. This page is the single source of truth
              for what's production-ready, what's in beta, and what's on the
              roadmap. Updated on every release.
            </p>
          </div>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <div className="eyebrow">01 · release & availability</div>
            <h2>Current state.</h2>
          </div>
          <div className="ds-status-list">
            {RELEASE_ROWS.map((r) => (
              <Row key={r.label} label={r.label} value={r.value} />
            ))}
          </div>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <div className="eyebrow">02 · feature maturity</div>
            <h2>What each part of the engine is labelled.</h2>
            <p>
              <span className="ds-maturity ga">GA</span> — covered by tests and
              shipping in Cloud private beta.{' '}
              <span className="ds-maturity beta">Beta</span> — functional with
              known hardening items listed below.{' '}
              <span className="ds-maturity alpha">Alpha</span> — behaviour
              specified, test coverage or observability still maturing.{' '}
              <span className="ds-maturity planned">Planned</span> — roadmap.
            </p>
          </div>
          <table className="ds-matrix">
            <thead>
              <tr>
                <th>Area</th>
                <th style={{ width: 90 }}>Maturity</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((f) => (
                <tr key={f.area}>
                  <th>{f.area}</th>
                  <td><MaturityBadge m={f.maturity} /></td>
                  <td>{f.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <div className="eyebrow">03 · known limitations</div>
            <h2>What we'd tell you on a call.</h2>
            <p>
              These are the items we'd flag for a production-readiness review
              today. They're the inputs to our 1.0 cut line.
            </p>
          </div>
          <ul
            style={{
              listStyle: 'disc',
              paddingLeft: 22,
              display: 'grid',
              gap: 8,
              font: '400 14px/1.55 var(--font-sans)',
              color: 'var(--fg-2)',
              maxWidth: '72ch',
            }}
          >
            {LIMITATIONS.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <div className="eyebrow">04 · security architecture</div>
            <h2>What's implemented.</h2>
            <p>
              Architectural properties that ship today. These are not
              compliance attestations — see the next section.
            </p>
          </div>
          <ul
            style={{
              listStyle: 'disc',
              paddingLeft: 22,
              display: 'grid',
              gap: 8,
              font: '400 14px/1.55 var(--font-sans)',
              color: 'var(--fg-2)',
              maxWidth: '72ch',
            }}
          >
            {SECURITY.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <div className="eyebrow">05 · compliance</div>
            <h2>Attestations.</h2>
            <p>
              We don't list certifications we don't have. The truth, up front:
            </p>
          </div>
          <div className="ds-status-list">
            <Row label="SOC 2 Type I" value="Targeted for H2 2026." />
            <Row label="SOC 2 Type II" value="Follows Type I; observation window starts on Type I issue." />
            <Row label="HIPAA" value="Architectural posture is HIPAA-appropriate (tenant isolation, audit chain, encryption at rest). BAA and a formal HIPAA program are post-1.0 — discuss with sales." />
            <Row label="GDPR" value="Export, right-to-forget, 90-day soft-delete, and signed audit tombstones are specified and partially implemented; full end-to-end DSR flows land with 1.0." />
            <Row label="FedRAMP" value="Roadmap item, subject to design-partner demand in regulated sectors." />
            <Row label="PCI-DSS" value="Not in scope." />
          </div>
          <p
            style={{
              marginTop: 20,
              font: '400 13px var(--font-sans)',
              color: 'var(--fg-3)',
              maxWidth: '72ch',
            }}
          >
            Security disclosures, DPA requests, and questionnaires:{' '}
            <a
              href="mailto:security@datashuttle.ai"
              style={{ color: 'var(--accent-400)' }}
            >
              security@datashuttle.ai
            </a>
            .
          </p>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <h2>Keep going.</h2>
          </div>
          <div className="actions" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="ds-btn ds-btn-secondary" to="/product">
              Product capabilities <Icon name="arrow-right" />
            </Link>
            <Link className="ds-btn ds-btn-secondary" to="/changelog">
              Release highlights <Icon name="arrow-right" />
            </Link>
            <a className="ds-btn ds-btn-ghost" href="https://github.com/datashuttle-ai/datashuttle/releases">
              GitHub releases ↗
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
