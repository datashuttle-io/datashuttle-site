import { SEO } from '../components/SEO'
import LogoMark from '../components/LogoMark'

const TIERS = [
  {
    num: '01',
    code: 'FREE',
    name: 'Community',
    price: '$0',
    desc: 'Self-hosted or free tier on managed cloud.',
    limits: ['10K DPU / mo', '1 environment', '3 pipelines'],
  },
  {
    num: '02',
    code: 'TEAM',
    name: 'Team',
    price: '$380',
    desc: 'Per month · from. Usage above the commit billed at the DPU rate.',
    limits: ['500K DPU / mo', '1 environment', '25 pipelines'],
    featured: true,
  },
  {
    num: '03',
    code: 'BIZ',
    name: 'Business',
    price: '$2,800',
    desc: 'Per month · from. Includes multi-env and SSO.',
    limits: ['5M DPU / mo', '5 environments', '200 pipelines'],
  },
  {
    num: '04',
    code: 'ENT',
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Contact sales. Custom commits, DPA, private regions.',
    limits: ['Unlimited DPU', 'Unlimited envs', 'Unlimited pipelines'],
  },
]

const VALUE_PROPS = [
  {
    num: '01',
    title: 'Managed control plane',
    body:
      'Postgres, Redis, Caddy-TLS, and the datashuttle API on dedicated infrastructure. You hit an endpoint — we keep it up, patched, and backed up.',
    spec: [['REGION', 'us-central · eu-west'], ['UPTIME', '99.95% SLA'], ['PATCHING', 'managed']],
  },
  {
    num: '02',
    title: 'Multi-tenant + RBAC',
    body:
      'Per-tenant S3 warehouse prefix, JWT-scoped access, tenant-isolated DPU quotas. Every boundary pen-tested before GA.',
    spec: [['ISOLATION', 'warehouse prefix'], ['AUTH', 'JWT-scoped'], ['QUOTAS', 'per-tenant DPU']],
  },
  {
    num: '03',
    title: 'GDPR compliant',
    body:
      'Export-my-data endpoint, 90-day soft-delete grace, signed audit chain, DPA on request. Built for EU customers from day one.',
    spec: [['EXPORT', 'customer-initiated'], ['RETENTION', '90d soft-delete'], ['DPA', 'on request']],
  },
]

export default function Cloud() {
  return (
    <>
      <SEO
        title="DataShuttle Cloud — Public Beta"
        description="Managed Iceberg ingestion. The same engine you'd self-host, run by us."
        path="/cloud"
        ogImage="og-cloud.jpg"
      />

      <div className="ds-doc">
        <aside className="ds-spine">
          <div className="top-mark">MANIFEST · CLOUD</div>
          <div className="mark-box"><LogoMark height={28} alt="" /></div>
          <div className="foot-mark">NO. 003</div>
        </aside>

        <div className="ds-main">
          <section className="ds-hero" id="cloud-hero">
            <div className="ds-hero-grid">
              <div className="ds-hero-meta">
                <span className="line">§ 01</span>
                <span className="line">CLOUD</span>
                <span className="line">PUBLIC BETA</span>
              </div>
              <div>
                <h1 className="ds-headline">
                  DataShuttle <em>Cloud.</em>
                  <br />
                  Managed. Multi-tenant.
                </h1>
              </div>
            </div>
            <div className="ds-hero-below">
              <div>
                <p className="lede">
                  Fully managed control plane on{' '}
                  <code>app.datashuttle.ai</code>. Iceberg ingestion, CDC streaming,
                  and SQL transforms — <strong>without provisioning a cluster</strong>.
                  Same engine you'd self-host. Run by us.
                </p>
                <div className="ds-cta-row">
                  <span className="tick">BOOKING</span>
                  <a className="primary" href="https://app.datashuttle.ai/signup">
                    Start free →
                  </a>
                  <a className="ghost" href="#tiers">See tiers</a>
                </div>
                <p style={{ marginTop: 14, font: '500 10px var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>
                  No credit card required · Self-host remains free on the same binary
                </p>
              </div>
              <div className="side">
                <div className="row"><span>Plane</span><strong>app.datashuttle.ai</strong></div>
                <div className="row"><span>SLA</span><strong>99.95%</strong></div>
                <div className="row"><span>Regions</span><strong>us-central · eu-west</strong></div>
                <div className="row"><span>Compliance</span><strong>SOC 2 · GDPR</strong></div>
                <div className="row"><span>Auth</span><strong>SSO on Business+</strong></div>
              </div>
            </div>
          </section>

          <section className="ds-sec" id="value">
            <div className="ds-sec-head">
              <div className="ds-sec-num">§ 02</div>
              <div className="ds-sec-title">What you get · managed</div>
              <div className="ds-sec-stamp">3 pillars</div>
            </div>

            <div className="ds-manifest-table">
              <div className="ds-manifest-row head">
                <div>item</div>
                <div>description</div>
                <div>technical spec</div>
                <div>status</div>
              </div>
              {VALUE_PROPS.map((p) => (
                <div className="ds-manifest-row" key={p.num}>
                  <div className="cell ds-m-num">{p.num}<br />BETA</div>
                  <div className="cell ds-m-desc">
                    <h4>{p.title}</h4>
                    <p>{p.body}</p>
                  </div>
                  <div className="cell ds-m-spec">
                    {p.spec.map(([k, v]) => (
                      <span key={k}>
                        <strong>{k}</strong> {v}
                        <br />
                      </span>
                    ))}
                  </div>
                  <div className="cell ds-m-stamp"><div className="st">LIVE</div></div>
                </div>
              ))}
            </div>
          </section>

          <section className="ds-sec" id="tiers">
            <div className="ds-sec-head">
              <div className="ds-sec-num">§ 03</div>
              <div className="ds-sec-title">Tiers · pay for DPUs above your commit</div>
              <div className="ds-sec-stamp">4 tiers</div>
            </div>

            <div className="ds-tariff">
              <div className="trow head">
                <div>tier</div>
                <div>scope</div>
                <div>price</div>
                <div>limits</div>
                <div></div>
              </div>
              {TIERS.map((t) => (
                <div className={`trow${t.featured ? ' featured' : ''}`} key={t.code}>
                  <div>
                    <div className="tier">{t.num} · {t.code}</div>
                    <div className="tname">{t.name}</div>
                  </div>
                  <div>
                    <div className="tdesc">{t.desc}</div>
                  </div>
                  <div>
                    <div className="rate-cell">
                      {t.price}
                      <small>{t.featured ? 'Most popular' : t.price === '$0' ? 'forever' : t.price === 'Custom' ? "let's talk" : 'per month'}</small>
                    </div>
                  </div>
                  <div>
                    <div className="incl">
                      {t.limits.map((l) => (
                        <span key={l}>
                          <strong>·</strong> {l}
                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="cta-cell">
                    <a
                      href={
                        t.code === 'ENT'
                          ? 'mailto:sales@datashuttle.ai'
                          : t.code === 'FREE'
                            ? '/download'
                            : 'https://app.datashuttle.ai/signup'
                      }
                    >
                      {t.code === 'ENT' ? 'Contact sales' : t.code === 'FREE' ? 'Self-host' : 'Start →'}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ marginTop: 24, font: '400 13px/1.55 var(--font-sans)', color: 'var(--fg-3)', textAlign: 'center' }}>
              DPU = 1 compute-second × 1 vCPU × 2 GB memory. Overage billed at $0.50/DPU.
            </p>
          </section>

          <section className="ds-sec" id="self-host">
            <div className="ds-sec-head">
              <div className="ds-sec-num">§ 04</div>
              <div className="ds-sec-title">Prefer to run it yourself?</div>
              <div className="ds-sec-stamp">FREE · FOREVER</div>
            </div>
            <div style={{ padding: 32, border: '1px solid var(--border-strong)', background: 'var(--bg)', textAlign: 'center' }}>
              <p className="lede" style={{ maxWidth: '54ch', margin: '0 auto 20px' }}>
                Same binary, same Iceberg output. Self-host the Community tier on your
                own infrastructure at no cost.
              </p>
              <div className="ds-cta-row" style={{ margin: '0 auto' }}>
                <a className="ghost" href="/download">Self-host install guide →</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
