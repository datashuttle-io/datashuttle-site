/// /pricing — usage-based per-DPU rate rendered in the manifest style.

import { SEO } from '../components/SEO'
import LogoMark from '../components/LogoMark'

const RATES = [
  {
    num: '01',
    code: 'CLOUD',
    tier: 'Managed',
    rate: '50¢',
    per: 'per DPU',
    desc: 'Fully managed control plane on datashuttle.ai — we run the Postgres, Redis, TLS, and operator. 10,000 DPU free every month.',
  },
  {
    num: '02',
    code: 'SELF-HOST',
    tier: 'Self-hosted',
    rate: '20¢',
    per: 'per DPU',
    desc: 'Same binary, your infrastructure. Pay only for what the meter counted. No seat minimums, no platform fee.',
  },
  {
    num: '03',
    code: 'AIRGAP',
    tier: 'Airgapped',
    rate: '30¢',
    per: 'per DPU',
    desc: 'Signed tarball behind your firewall. FedRAMP / IL-5 assistance, dedicated SE, compliance-grade support.',
  },
]

export default function Pricing() {
  return (
    <>
      <SEO
        title="Pricing — DataShuttle"
        description="Usage-based pricing. Pay per DPU (DataShuttle Processing Unit). 10,000 DPU free every month on cloud."
        path="/pricing"
      />

      <div className="ds-doc">
        <aside className="ds-spine">
          <div className="top-mark">MANIFEST · PRICING</div>
          <div className="mark-box"><LogoMark height={28} alt="" /></div>
          <div className="foot-mark">NO. 002</div>
        </aside>

        <div className="ds-main">
          <section className="ds-hero" id="pricing-hero">
            <div className="ds-hero-grid">
              <div className="ds-hero-meta">
                <span className="line">§ 01</span>
                <span className="line">TARIFF</span>
                <span className="line">USAGE · NOT SEATS</span>
              </div>
              <div>
                <h1 className="ds-headline">
                  Pay <em>per DPU.</em>
                  <br />
                  Nothing else.
                </h1>
              </div>
            </div>
            <div className="ds-hero-below">
              <div>
                <p className="lede">
                  One metric, one rate. A <strong>DPU</strong> (DataShuttle Processing Unit)
                  covers any of: 1&nbsp;GB ingested, 100k CDC events, 1 connector-hour, or
                  1 vCPU-hour. No seat counts, no pipeline limits, no per-connector tax.
                </p>
                <div className="ds-cta-row">
                  <span className="tick">BOOKING</span>
                  <a className="primary" href="/cloud">Start on Cloud →</a>
                  <a className="ghost" href="/download">Self-host</a>
                </div>
              </div>
              <div className="side">
                <div className="row"><span>Free monthly</span><strong>10,000 DPU</strong></div>
                <div className="row"><span>Unit</span><strong>1 GB · 100k CDC · 1 vCPU-hr</strong></div>
                <div className="row"><span>Minimum</span><strong>none</strong></div>
                <div className="row"><span>Seats</span><strong>unlimited</strong></div>
              </div>
            </div>
          </section>

          <section className="ds-sec" id="rates">
            <div className="ds-sec-head">
              <div className="ds-sec-num">§ 02</div>
              <div className="ds-sec-title">Rates · by deployment</div>
              <div className="ds-sec-stamp">3 modes</div>
            </div>

            <div className="ds-manifest-table">
              <div className="ds-manifest-row head">
                <div>item</div>
                <div>description</div>
                <div>rate</div>
                <div>status</div>
              </div>
              {RATES.map((r) => (
                <div className="ds-manifest-row" key={r.code}>
                  <div className="cell ds-m-num">{r.num}<br />{r.code}</div>
                  <div className="cell ds-m-desc">
                    <h4>{r.tier}</h4>
                    <p>{r.desc}</p>
                  </div>
                  <div className="cell" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px 20px' }}>
                    <span style={{ font: '400 40px/1 var(--font-serif)', letterSpacing: '-0.02em', color: 'var(--fg)' }}>{r.rate}</span>
                    <span style={{ font: '500 10px var(--font-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 6 }}>{r.per}</span>
                  </div>
                  <div className="cell ds-m-stamp"><div className="st">AVAILABLE</div></div>
                </div>
              ))}
            </div>

            <p style={{ marginTop: 24, font: '400 13px/1.55 var(--font-sans)', color: 'var(--fg-3)', textAlign: 'center' }}>
              Committed-use discounts available on request —{' '}
              <a href="mailto:hello@datashuttle.ai" style={{ color: 'var(--accent)' }}>hello@datashuttle.ai</a>.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
