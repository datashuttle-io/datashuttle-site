import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'

function Icon({ n, className = '' }: { n: string; className?: string }) {
  return <img src={`/icons/${n}.svg`} alt="" className={className} style={{ width: 14, height: 14 }} />
}
function IconLg({ n }: { n: string }) {
  return <img src={`/icons/${n}.svg`} alt="" className="ico" style={{ width: 22, height: 22 }} />
}

export default function Home() {
  return (
    <>
      <SEO
        title="DataShuttle — Iceberg-Native Ingestion Engine"
        description="Move data from PostgreSQL, MySQL, MongoDB, Kafka into Apache Iceberg with one SQL statement. Sub-minute CDC, auto-compaction, deletion vectors. No Kafka, no Flink."
        path="/"
      />
      <div className="ds-wrap">
        <section className="ds-hero">
          <div>
            <div className="eyebrow">
              <span className="pill">v1.4 · out now</span>
              exactly-once to Iceberg
            </div>
            <h1>
              One binary.<br />One SQL statement.<br />Lakehouse ingestion, collapsed.
            </h1>
            <p className="lede">
              DataShuttle replaces a Kafka + Debezium + Flink + schema-registry + custom-glue
              stack with a single purpose-built runtime. Write a{' '}
              <code>CREATE&nbsp;PIPELINE</code>. We commit to Iceberg exactly once — no
              double-writes, even across operator restarts.
            </p>
            <div className="actions">
              <Link className="ds-btn ds-btn-primary" to="/cloud">
                Start free <Icon n="arrow-right" />
              </Link>
              <a className="ds-btn ds-btn-secondary" href="https://docs.datashuttle.ai">
                <Icon n="book-open" /> Read the docs
              </a>
            </div>
          </div>
          <div className="figure">
            <div className="bar">
              <span className="dots"><span /><span /><span /></span>
              <span style={{ marginLeft: 10 }}>datashuttle — orders_sync.sql</span>
            </div>
            <pre>
              <span className="cmt">-- ship operational rows into the lake</span>{'\n'}
              <span className="kw">CREATE PIPELINE</span> orders_sync{'\n'}
              <span className="kw">FROM</span> postgres <span className="punc">(</span>{'\n'}
              {'  '}host <span className="punc">=</span> <span className="str">'db.prod.internal'</span><span className="punc">,</span>{'\n'}
              {'  '}publication <span className="punc">=</span> <span className="str">'ds_pub'</span>{'\n'}
              <span className="punc">)</span>{'\n'}
              <span className="kw">TO</span> iceberg<span className="punc">://</span>warehouse<span className="punc">/</span>orders{'\n'}
              <span className="kw">WITH</span> <span className="punc">(</span>exactly_once <span className="punc">=</span> <span className="kw">true</span><span className="punc">);</span>
            </pre>
          </div>
        </section>

        <section className="ds-sec" id="compare">
          <div className="ds-sec-head">
            <div className="eyebrow">01 · the collapse</div>
            <h2>Seven systems, one runtime.</h2>
            <p>
              The lakehouse ingest stack is usually glued together out of four or five
              open-source projects plus a rotating cast of custom scripts. DataShuttle
              replaces that stack with a single binary you can run anywhere.
            </p>
          </div>
          <div className="ds-compare">
            <div className="col">
              <h3>Before <span className="tag">7 components</span></h3>
              <div className="stack-list">
                {[
                  ['kafka', 'broker cluster'],
                  ['debezium', 'CDC connectors'],
                  ['schema-registry', 'schema mgmt'],
                  ['flink', 'stream processing'],
                  ['iceberg-sink', 'writer'],
                  ['custom-glue', '~2,400 LOC'],
                  ['ops + on-call', '4 teams'],
                ].map(([name, note]) => (
                  <div className="item" key={name}>
                    <span className="x">·</span>
                    <span>{name}</span>
                    <span className="note">{note}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col">
              <h3>With DataShuttle <span className="tag">1 component</span></h3>
              <div className="after-sole">
                <img className="mark" src="/brand/logo-mark.svg" alt="" />
                <div>
                  <div className="name">datashuttle</div>
                  <div className="sub">single binary · single SQL statement</div>
                </div>
              </div>
              <p style={{ font: '400 13px/1.55 var(--font-sans)', color: 'var(--fg-2)', marginTop: 16 }}>
                Postgres/MySQL/Mongo CDC, Kafka consumers, schema evolution, Iceberg commit
                coordination, backfills, and observability — all inside one runtime. No
                standalone Kafka. No Flink job. No YAML graph to maintain.
              </p>
            </div>
          </div>
        </section>

        <section className="ds-sec" id="features">
          <div className="ds-sec-head">
            <div className="eyebrow">02 · features</div>
            <h2>What's in the binary.</h2>
            <p>The shortest list we could cut it down to. Each one replaces a system you'd otherwise run yourself.</p>
          </div>
          <div className="ds-features">
            {[
              ['database', 'CDC from Postgres, MySQL, Mongo', 'Logical replication with checkpoints. Backfill and incremental in the same job — no separate snapshot phase to babysit.'],
              ['waypoints', 'Exactly-once to Iceberg', 'Commits coordinated by the Iceberg catalog. You will not see double-writes, even across operator restarts.'],
              ['git-branch', 'Schema evolution', 'ADD COLUMN is non-blocking. Type widening is automatic. Breaking changes are flagged in the console before they land.'],
              ['activity', 'Observability, built in', 'Per-pipeline lag, throughput, and error budget. Prometheus scrape on port 9090. OpenTelemetry traces on request.'],
              ['server', 'Runs anywhere', 'Managed cloud, self-hosted on your VPC, or fully airgapped. Same binary, same SQL, same runtime semantics.'],
              ['settings-2', 'SQL, not YAML', 'CREATE PIPELINE is the API. Version it in git. Review it in a PR. No pipeline graphs to draw, no DAGs to orchestrate.'],
            ].map(([ico, title, body]) => (
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
            <h2>Pay for rows, not seats.</h2>
            <p>Start free. Usage scales when you do. Self-hosted is source-available and priced per core.</p>
          </div>
          <div className="ds-pricing">
            <div className="ds-plan">
              <h3>Free</h3>
              <div className="price"><span className="n">$0</span><span className="u">/ mo</span></div>
              <p className="desc">Enough headroom to prove it replaces your Flink job on a real workload.</p>
              <ul>
                <li><Icon n="check" /><span>5M rows / month</span></li>
                <li><Icon n="check" /><span>3 pipelines</span></li>
                <li><Icon n="check" /><span>1 workspace · 2 seats</span></li>
                <li><Icon n="check" /><span>Community support</span></li>
              </ul>
              <Link className="ds-btn ds-btn-secondary" to="/cloud">Start free</Link>
            </div>
            <div className="ds-plan featured">
              <h3>Team</h3>
              <div className="price"><span className="n">$0.40</span><span className="u">/ 1M rows</span></div>
              <p className="desc">Usage-based. No per-seat tax. Everything in Free, plus:</p>
              <ul>
                <li><Icon n="check" /><span>Unlimited pipelines</span></li>
                <li><Icon n="check" /><span>Unlimited seats</span></li>
                <li><Icon n="check" /><span>SSO · audit log</span></li>
                <li><Icon n="check" /><span>99.95% SLA</span></li>
              </ul>
              <Link className="ds-btn ds-btn-primary" to="/cloud">Start 30-day trial</Link>
            </div>
            <div className="ds-plan">
              <h3>Self-hosted</h3>
              <div className="price"><span className="n">$800</span><span className="u">/ core / yr</span></div>
              <p className="desc">Source-available. Run on your cluster, in your VPC, or fully airgapped.</p>
              <ul>
                <li><Icon n="check" /><span>Airgapped-friendly</span></li>
                <li><Icon n="check" /><span>BYO Iceberg catalog</span></li>
                <li><Icon n="check" /><span>Private-network artifact mirror</span></li>
                <li><Icon n="check" /><span>Dedicated support engineer</span></li>
              </ul>
              <a className="ds-btn ds-btn-secondary" href="mailto:sales@datashuttle.ai">Contact sales</a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
