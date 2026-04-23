/// /whats-new — curated headline-feature showcase rendered in manifest style.

import { CARDS } from '../data/whats-new'
import { SEO } from '../components/SEO'
import LogoMark from '../components/LogoMark'

export default function WhatsNew() {
  return (
    <>
      <SEO
        title="What's new in DataShuttle"
        description="Highlights from recent releases — Iceberg V3, lineage, resource pools."
        path="/whats-new"
        ogImage="og-whatsnew.jpg"
      />

      <div className="ds-doc">
        <aside className="ds-spine">
          <div className="top-mark">MANIFEST · CHANGELOG</div>
          <div className="mark-box"><LogoMark height={28} alt="" /></div>
          <div className="foot-mark">NO. 005</div>
        </aside>

        <div className="ds-main">
          <section className="ds-hero" id="whatsnew-hero">
            <div className="ds-hero-grid">
              <div className="ds-hero-meta">
                <span className="line">§ 01</span>
                <span className="line">WHAT'S NEW</span>
                <span className="line">HEADLINES</span>
              </div>
              <div>
                <h1 className="ds-headline">
                  What's new
                  <br />
                  <em>in DataShuttle.</em>
                </h1>
              </div>
            </div>
            <div className="ds-hero-below">
              <div>
                <p className="lede">
                  Curated highlights of the capabilities we've shipped recently.
                  For the full per-release history, see the{' '}
                  <a href="https://github.com/datashuttle-ai/datashuttle/releases" style={{ color: 'var(--accent)' }}>
                    GitHub releases
                  </a>.
                </p>
              </div>
              <div className="side">
                <div className="row"><span>Releases</span><strong>~2/month</strong></div>
                <div className="row"><span>Source</span><strong>public · pinned</strong></div>
                <div className="row"><span>Cadence</span><strong>continuous CI</strong></div>
              </div>
            </div>
          </section>

          {CARDS.map((card, i) => (
            <section className="ds-sec" id={`card-${i + 1}`} key={card.title}>
              <div className="ds-sec-head">
                <div className="ds-sec-num">§ {String(i + 2).padStart(2, '0')}</div>
                <div className="ds-sec-title">{card.badge}</div>
                <div className="ds-sec-stamp">SHIPPED</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: card.snippet ? '1fr 1fr' : '1fr', gap: 32, alignItems: 'start' }}>
                <div>
                  <h2 style={{ font: '400 clamp(28px, 3.2vw, 44px)/1.08 var(--font-serif)', letterSpacing: '-0.025em', color: 'var(--fg)', marginBottom: 14 }}>
                    {card.title}
                  </h2>
                  <p style={{ font: '400 15px/1.65 var(--font-sans)', color: 'var(--fg-2)', maxWidth: '54ch' }}>
                    {card.description}
                  </p>
                </div>
                {card.snippet && (
                  <div className="ds-terminal">
                    <div className="tbar">
                      <span className="doc-id">SNIPPET</span>
                      <span className="doc-name">{card.title.toLowerCase().replace(/\s+/g, '-')}</span>
                      <span className="doc-size">{card.badge}</span>
                    </div>
                    <div className="tbody" style={{ gridTemplateColumns: '1fr' }}>
                      <pre>{card.snippet}</pre>
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}

          <section className="ds-sec" id="cta">
            <div className="ds-sec-head">
              <div className="ds-sec-num">§ {String(CARDS.length + 2).padStart(2, '0')}</div>
              <div className="ds-sec-title">Try it</div>
              <div className="ds-sec-stamp">FREE · TODAY</div>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', padding: 32, border: '1px solid var(--border-strong)', background: 'var(--bg)' }}>
              <div className="ds-cta-row">
                <a className="primary" href="/cloud">Try on Cloud →</a>
                <a className="ghost" href="/download">Self-host →</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
