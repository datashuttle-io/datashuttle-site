import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'

import { Icon as InkIcon } from '../components/Icon'
function Icon({ n }: { n: string }) {
  return <InkIcon name={n} size={14} />
}

const RATES = [
  { name: 'Self-hosted', price: '$0', unit: '/ forever', desc: 'Run the binary on your own infrastructure. Community support via GitHub.', bullets: ['All 21 GA connectors', 'Iceberg V3 + deletion vectors', 'Sub-minute CDC', 'No seat minimums'], cta: 'Download', href: '/download', variant: 'secondary' as const },
  { name: 'Cloud (managed)', price: '50¢', unit: '/ DPU', desc: 'Managed control plane. 10,000 DPU free every month.', bullets: ['Managed control plane', 'SOC 2 · HIPAA-ready', 'SSO · audit log', '99.95% SLA'], cta: 'Start free', href: '/cloud', variant: 'primary' as const, featured: true },
  { name: 'Airgapped', price: '30¢', unit: '/ DPU', desc: 'Signed tarball behind your firewall. FedRAMP / IL-5 assistance.', bullets: ['Offline runtime', 'FedRAMP assist', 'Dedicated SE', 'BYO catalog'], cta: 'Contact sales', href: 'mailto:sales@datashuttle.ai', variant: 'secondary' as const },
]

export default function Pricing() {
  return (
    <>
      <SEO title="Pricing — DataShuttle" description="Pay per DPU. 10,000 DPU free monthly on Cloud. Three deployment modes." path="/pricing" />
      <div className="ds-wrap">
        <section className="ds-hero" style={{ gridTemplateColumns: '1fr' }}>
          <div>
            <div className="eyebrow"><span className="pill">Pricing</span></div>
            <h1>Pay per DPU. One metric, three modes.</h1>
            <p className="lede">
              A DPU (DataShuttle Processing Unit) covers any of: 1&nbsp;GB ingested,
              100k CDC events, 1 connector-hour, or 1 vCPU-hour. No seat counts, no
              pipeline limits, no per-connector tax.
            </p>
          </div>
        </section>

        <section className="ds-sec">
          <div className="ds-pricing">
            {RATES.map((r) => (
              <div className={`ds-plan${r.featured ? ' featured' : ''}`} key={r.name}>
                <h3>{r.name}</h3>
                <div className="price"><span className="n">{r.price}</span><span className="u">{r.unit}</span></div>
                <p className="desc">{r.desc}</p>
                <ul>{r.bullets.map((b) => <li key={b}><Icon n="check" /><span>{b}</span></li>)}</ul>
                {r.href.startsWith('mailto:') || r.href.startsWith('http')
                  ? <a className={`ds-btn ds-btn-${r.variant}`} href={r.href}>{r.cta}</a>
                  : <Link className={`ds-btn ds-btn-${r.variant}`} to={r.href}>{r.cta}</Link>}
              </div>
            ))}
          </div>
          <p style={{ marginTop: 32, textAlign: 'center', font: '400 13px var(--font-sans)', color: 'var(--fg-3)' }}>
            Committed-use discounts available on request — <a href="mailto:hello@datashuttle.ai" style={{ color: 'var(--accent-400)' }}>hello@datashuttle.ai</a>.
          </p>
        </section>
      </div>
    </>
  )
}
