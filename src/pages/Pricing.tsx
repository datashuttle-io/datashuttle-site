import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { Icon } from '../components/Icon'

/// Pricing is derived from docs/BUSINESS-MODEL.md §3.2 and docs/LICENSING.md
/// `Pricing tiers`. If the numbers here drift from those two documents,
/// those documents are canonical — fix this page, not the docs.

interface Tier {
  name: string
  startingPrice: string
  unit: string
  perDpu: string
  desc: string
  bullets: string[]
  cta: string
  href: string
  variant: 'primary' | 'secondary'
  featured?: boolean
  external?: boolean
}

const TIERS: Tier[] = [
  {
    name: 'Community',
    startingPrice: 'Free',
    unit: '',
    perDpu: 'Included: 100 DPU / month',
    desc:
      'For evaluation, dev environments, and small shuttles. Core connectors and the REST API; no CDC, Iceberg sinks, SQL transforms, or clustering.',
    bullets: [
      'Core connectors',
      'REST API',
      'Up to 3 shuttles',
      '1 environment',
      'Community support via GitHub',
    ],
    cta: 'Create account',
    href: 'https://app.datashuttle.ai/signup',
    variant: 'secondary',
    external: true,
  },
  {
    name: 'Team',
    startingPrice: 'from $380',
    unit: '/ month',
    perDpu: '$0.38 / DPU · commit 1,000 DPU/mo',
    desc:
      'Production shuttles at small-to-mid scale. CDC, Iceberg and Delta sinks, SQL transforms, clustering. Email support, 48-hour response.',
    bullets: [
      'Continuous CDC',
      'Iceberg / Delta sinks',
      'SQL transforms',
      'Up to 25 shuttles',
      '1 environment',
    ],
    cta: 'Create account',
    href: 'https://app.datashuttle.ai/signup',
    variant: 'primary',
    external: true,
    featured: true,
  },
  {
    name: 'Business',
    startingPrice: 'from $2,800',
    unit: '/ month',
    perDpu: '$0.28 / DPU · commit 10,000 DPU/mo',
    desc:
      'Mid-market production. RBAC, audit log export, 5 environments under one license. BYO-AWS optional. Email support, 8-hour response.',
    bullets: [
      'Everything in Team',
      'RBAC',
      'Audit log export',
      'Up to 200 shuttles',
      '5 environments per licence',
    ],
    cta: 'Contact sales',
    href: 'mailto:sales@datashuttle.ai?subject=DataShuttle%20Business',
    variant: 'secondary',
    external: true,
  },
  {
    name: 'Enterprise',
    startingPrice: 'Custom',
    unit: '',
    perDpu: '',
    desc:
      'SSO / SAML, airgapped deployment, BYO-AWS standard, custom connectors, dedicated CSM. 24×7 support with a 1-hour SLA.',
    bullets: [
      'SSO / SAML',
      'Airgapped deployment',
      'BYO-AWS included',
      'Unlimited shuttles and environments',
      'Dedicated CSM, 24×7 support',
    ],
    cta: 'Contact sales',
    href: 'mailto:sales@datashuttle.ai?subject=DataShuttle%20Enterprise',
    variant: 'secondary',
    external: true,
  },
]

export default function Pricing() {
  return (
    <>
      <SEO
        title="Pricing — DataShuttle"
        description="Usage-based pricing in DPUs. One metric across GB, CDC events, connector-hours, and vCPU-hours. Four tiers, two self-hosted rates."
        path="/pricing"
      />
      <div className="ds-wrap">
        <section className="ds-hero" style={{ gridTemplateColumns: '1fr' }}>
          <div>
            <div className="eyebrow"><span className="pill">Pricing</span></div>
            <h1>Usage-based, measured in DPUs.</h1>
            <p className="lede">
              A <strong>DPU</strong> (DataShuttle Processing Unit) is one unit
              of work: 1&nbsp;GB ingested, 250,000&nbsp;CDC events,
              1&nbsp;connector-hour, or 1&nbsp;vCPU-hour — whichever your
              workload produces. Tiers gate features and commitment; you pay
              per DPU across all of them.
            </p>
          </div>
        </section>

        <section className="ds-sec">
          <div
            className="ds-pricing"
            style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
          >
            {TIERS.map((t) => (
              <div
                className={`ds-plan${t.featured ? ' featured' : ''}`}
                key={t.name}
              >
                <h3>{t.name}</h3>
                <div className="price">
                  <span className="n" style={{ fontSize: 32 }}>
                    {t.startingPrice}
                  </span>
                  {t.unit && <span className="u">{t.unit}</span>}
                </div>
                {t.perDpu && (
                  <p
                    className="desc"
                    style={{ font: '500 11px var(--font-mono)', color: 'var(--fg-2)', letterSpacing: '0.02em' }}
                  >
                    {t.perDpu}
                  </p>
                )}
                <p className="desc">{t.desc}</p>
                <ul>
                  {t.bullets.map((b) => (
                    <li key={b}>
                      <Icon name="check" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {t.external ? (
                  <a className={`ds-btn ds-btn-${t.variant}`} href={t.href}>
                    {t.cta}
                  </a>
                ) : (
                  <Link className={`ds-btn ds-btn-${t.variant}`} to={t.href}>
                    {t.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <div className="eyebrow">Community tier</div>
            <h2>Free to evaluate, not a production tier.</h2>
            <p>
              Community is for kicking the tyres — evaluations, development, and
              small internal shuttles. Three shuttles, one environment, no
              CDC, no Iceberg sinks. Production workloads start on Team.
            </p>
          </div>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <div className="eyebrow">Self-hosted & airgapped rates</div>
            <h2>Lower per-DPU rate when you provide the compute.</h2>
          </div>
          <div className="ds-features" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            <div className="ds-feat">
              <h4>Cloud (PAYG)</h4>
              <p style={{ font: '500 28px var(--font-sans)', color: 'var(--fg)' }}>$0.50<span style={{ font: '500 12px var(--font-mono)', color: 'var(--fg-3)', marginLeft: 6 }}>/ DPU</span></p>
              <p>
                On-demand rate if you choose not to commit. No contract, no
                minimum, billed monthly. Overage on committed tiers falls back
                to this rate.
              </p>
            </div>
            <div className="ds-feat">
              <h4>Self-hosted</h4>
              <p style={{ font: '500 28px var(--font-sans)', color: 'var(--fg)' }}>$0.20<span style={{ font: '500 12px var(--font-mono)', color: 'var(--fg-3)', marginLeft: 6 }}>/ DPU</span></p>
              <p>
                Annual capacity licence against an agreed DPU floor. You run
                the daemon, we support the engine.
              </p>
            </div>
            <div className="ds-feat">
              <h4>Airgapped</h4>
              <p style={{ font: '500 28px var(--font-sans)', color: 'var(--fg)' }}>$0.30<span style={{ font: '500 12px var(--font-mono)', color: 'var(--fg-3)', marginLeft: 6 }}>/ DPU</span></p>
              <p>
                Annual capacity licence with extended support windows and a
                local signed usage ledger. Enterprise tier only.
              </p>
            </div>
          </div>
          <p
            style={{
              marginTop: 28,
              textAlign: 'center',
              font: '400 13px var(--font-sans)',
              color: 'var(--fg-3)',
            }}
          >
            Startup, non-profit, and committed-use discounts available
            on request — <a href="mailto:sales@datashuttle.ai" style={{ color: 'var(--accent-400)' }}>sales@datashuttle.ai</a>.
          </p>
        </section>
      </div>
    </>
  )
}
