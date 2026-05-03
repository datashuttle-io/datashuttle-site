import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { Icon } from '../components/Icon'

interface Row {
  label: string
  cloud: string
  selfHosted: string
  airgapped: string
}

const ROWS: Row[] = [
  {
    label: 'Availability',
    cloud: 'Private beta, by invitation',
    selfHosted: 'Early access',
    airgapped: 'Early access',
  },
  {
    label: 'Control plane',
    cloud: 'Hosted at app.datashuttle.ai',
    selfHosted: 'You run it',
    airgapped: 'You run it, offline',
  },
  {
    label: 'Upgrades',
    cloud: 'Managed — rolled out by us',
    selfHosted: 'Your cadence (Helm / systemd / Docker)',
    airgapped: 'Signed tarball, your cadence',
  },
  {
    label: 'Connector catalogue',
    cloud: 'Full (Cloud build)',
    selfHosted: 'Core (6 connectors) by default; full via --features cdc-all',
    airgapped: 'Full, bundled in the tarball',
  },
  {
    label: 'License telemetry',
    cloud: 'Real-time, via control plane',
    selfHosted: 'Daily heartbeat to licensing endpoint',
    airgapped: 'Local signed ledger; quarterly export',
  },
  {
    label: 'Data location',
    cloud: 'Our AWS account (managed) or your AWS (BYO-AWS, Business optional / Enterprise)',
    selfHosted: 'Your infrastructure',
    airgapped: 'Your infrastructure, no egress',
  },
  {
    label: 'Network egress',
    cloud: 'Standard — source → DataShuttle → your warehouse',
    selfHosted: 'Your call; licensing endpoint reachable for heartbeat',
    airgapped: 'None required. Licensing is offline.',
  },
  {
    label: 'Support',
    cloud: 'Per paid tier (see Pricing)',
    selfHosted: 'Per paid tier',
    airgapped: 'Enterprise only — extended patch windows',
  },
  {
    label: 'Typical buyer',
    cloud: 'Teams that don\'t want the ops burden',
    selfHosted: 'Teams with an existing data platform',
    airgapped: 'Regulated / offline environments',
  },
]

export default function Deployment() {
  return (
    <>
      <SEO
        title="Deployment — DataShuttle"
        description="One Rust binary and one Ed25519-signed license across managed cloud, self-hosted, and airgapped. Compare deployment modes side-by-side."
        path="/deployment"
      />
      <div className="ds-wrap">
        <section className="ds-hero" style={{ gridTemplateColumns: '1fr' }}>
          <div>
            <div className="eyebrow">
              <span className="pill">Deployment</span>
            </div>
            <h1>Cloud, self-hosted, or airgapped. Same binary.</h1>
            <p className="lede">
              DataShuttle ships one Rust binary and one Ed25519-signed license
              that works across every deployment mode. You pay for usage, not for
              where you run it. The signature verifies offline — nothing phones
              home in airgapped mode.
            </p>
          </div>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <div className="eyebrow">01 · at a glance</div>
            <h2>Three modes.</h2>
          </div>
          <div className="ds-pricing">
            <div className="ds-plan">
              <h3>Cloud</h3>
              <p className="desc">
                <strong>Private beta · by invitation.</strong> Fully managed
                control plane on <code>app.datashuttle.ai</code>. We run, patch,
                monitor, and back it up. New signups enter a manual approval
                queue after email verification.
              </p>
              <ul>
                <li><Icon name="check" /><span>No provisioning on your side</span></li>
                <li><Icon name="check" /><span>Full connector catalogue</span></li>
                <li><Icon name="check" /><span>Managed Polaris / Iceberg catalog</span></li>
                <li><Icon name="check" /><span>BYO-AWS available (Business optional)</span></li>
              </ul>
              <a
                className="ds-btn ds-btn-primary"
                href="https://app.datashuttle.ai/signup"
              >
                Create account
              </a>
            </div>
            <div className="ds-plan featured">
              <h3>Self-hosted</h3>
              <p className="desc">
                <strong>Early access.</strong> Run the daemon on your own
                infrastructure. systemd, Docker, or Kubernetes via Helm — same
                binary as Cloud. Daily heartbeat to the licensing endpoint.
              </p>
              <ul>
                <li><Icon name="check" /><span>Your compute, your VPC, your data</span></li>
                <li><Icon name="check" /><span>Core connectors by default; full catalogue via <code>--features cdc-all</code></span></li>
                <li><Icon name="check" /><span>Hardened systemd unit; Helm chart</span></li>
                <li><Icon name="check" /><span>OpenTelemetry + Prometheus included</span></li>
              </ul>
              <Link className="ds-btn ds-btn-secondary" to="/install">
                Install guide
              </Link>
            </div>
            <div className="ds-plan">
              <h3>Airgapped</h3>
              <p className="desc">
                <strong>Early access.</strong> Signed tarball for networks
                without egress. Local append-only signed ledger for usage;
                quarterly export for reconciliation. No phone-home.
              </p>
              <ul>
                <li><Icon name="check" /><span>Fully offline signature validation</span></li>
                <li><Icon name="check" /><span>Full connector catalogue, bundled</span></li>
                <li><Icon name="check" /><span>Tamper-evident usage ledger</span></li>
                <li><Icon name="check" /><span>Extended patch window</span></li>
              </ul>
              <a
                className="ds-btn ds-btn-secondary"
                href="mailto:sales@datashuttle.ai?subject=Airgapped%20DataShuttle"
              >
                Contact sales
              </a>
            </div>
          </div>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <div className="eyebrow">02 · side by side</div>
            <h2>What differs between modes.</h2>
            <p>
              Functionally, the engine is identical. What changes is who runs
              the control plane, where telemetry flows, and how the license
              ledger is reconciled.
            </p>
          </div>
          <table className="ds-matrix">
            <thead>
              <tr>
                <th></th>
                <th>Cloud</th>
                <th>Self-hosted</th>
                <th>Airgapped</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th>{r.label}</th>
                  <td>{r.cloud}</td>
                  <td>{r.selfHosted}</td>
                  <td>{r.airgapped}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <div className="eyebrow">03 · cloud signup flow</div>
            <h2>How account approval works.</h2>
            <p>
              DataShuttle Cloud is open to self-registration but not
              self-provisioned. The tenant saga only runs after a human on our
              side approves the account.
            </p>
          </div>
          <ol
            style={{
              listStyle: 'decimal',
              paddingLeft: 24,
              display: 'grid',
              gap: 10,
              font: '400 14px/1.55 var(--font-sans)',
              color: 'var(--fg-2)',
              maxWidth: '62ch',
            }}
          >
            <li>You sign up at <code>app.datashuttle.ai/signup</code>. No credit card.</li>
            <li>We send you an email verification link. State: <code>awaiting_email_verification</code>.</li>
            <li>
              You click the link. State moves to <code>awaiting_approval</code>. You see a
              waiting screen; no shuttles, no tenant yet.
            </li>
            <li>
              We review the signup in the admin console — usually within one
              business day during private beta. On approval the tenant
              provisioning saga runs (S3 prefix, IAM policy, Iceberg catalog
              namespace) and your account lands on <strong>Community tier</strong> with
              the standard 10,000 DPU / month allocation.
            </li>
            <li>
              You can upgrade to Team or Business in the portal when you're
              ready.
            </li>
          </ol>
        </section>
      </div>
    </>
  )
}
