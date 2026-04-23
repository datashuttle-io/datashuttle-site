/// /download — install channels in the manifest style.

import { useEffect, useMemo, useState } from 'react'
import { SEO } from '../components/SEO'
import LogoMark from '../components/LogoMark'

interface InstallTab {
  key: string
  label: string
  command: string
  footnote?: string
  /// OS hints that make this tab "recommended" on the visitor's box.
  os?: Array<'linux' | 'macos' | 'windows'>
}

const TABS: InstallTab[] = [
  {
    key: 'server',
    label: 'Server (daemon)',
    command:
      'curl -fsSL https://datashuttle.ai/install.sh | sudo bash -s -- --systemd',
    footnote:
      'Installs datashuttle + datashuttled (daemon alias) + a hardened systemd unit. Full connector catalogue available via --features cdc-all from source. Run `sudo datashuttle setup --quickstart` after install.',
    os: ['linux'],
  },
  {
    key: 'client',
    label: 'CLI (your laptop)',
    command:
      'curl -fsSL https://datashuttle.ai/install.sh | bash -s -- --client-only',
    footnote:
      'Installs only the thin ~12 MB `datashuttle-client` binary. No server, no connector drivers, no embedded UI. Point at a remote daemon with DS_SERVER env var.',
    os: ['linux', 'macos'],
  },
  {
    key: 'docker',
    label: 'Docker',
    command: 'docker pull ghcr.io/datashuttle-ai/datashuttle:latest',
    footnote:
      'Multi-arch image (linux/amd64 + linux/arm64). The compose bundle at deploy/jarvis-cloud/ is a working reference stack.',
    os: ['linux', 'macos', 'windows'],
  },
  {
    key: 'homebrew',
    label: 'Homebrew',
    command: 'brew install datashuttle-ai/tap/datashuttle',
    footnote:
      'macOS + Linuxbrew. Ships the full daemon binary; `datashuttle-client` bottle is a follow-up. Tap auto-updates on each release.',
    os: ['macos'],
  },
  {
    key: 'deb',
    label: 'DEB (Debian/Ubuntu)',
    command: 'sudo dpkg -i datashuttle_<version>_amd64.deb',
    footnote:
      'Download the .deb from the latest GitHub Release. Ships the full daemon + `datashuttled` alias. apt-repo landing in a follow-up.',
    os: ['linux'],
  },
  {
    key: 'rpm',
    label: 'RPM (RHEL/Fedora)',
    command: 'sudo rpm -i datashuttle-<version>.x86_64.rpm',
    footnote:
      'Same pattern as the .deb — grab the .rpm from GitHub Releases. dnf-repo is on the roadmap.',
    os: ['linux'],
  },
]

type OsKind = 'linux' | 'macos' | 'windows' | 'unknown'

function detectOs(): OsKind {
  if (typeof navigator === 'undefined') return 'unknown'
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac')) return 'macos'
  if (ua.includes('win')) return 'windows'
  if (ua.includes('linux') || ua.includes('x11')) return 'linux'
  return 'unknown'
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        } catch {
          // clipboard API blocked — ignore
        }
      }}
      className="ds-copy-btn"
      aria-label="Copy command"
    >
      {copied ? 'COPIED ✓' : 'COPY'}
    </button>
  )
}

export default function Download() {
  const [os, setOs] = useState<OsKind>('unknown')
  const [active, setActive] = useState<string>('server')

  useEffect(() => {
    const detected = detectOs()
    setOs(detected)
    if (detected === 'macos') setActive('client')
    else if (detected === 'windows') setActive('docker')
  }, [])

  const activeTab = useMemo(
    () => TABS.find((t) => t.key === active) ?? TABS[0],
    [active],
  )

  return (
    <>
      <SEO
        title="Install DataShuttle"
        description="Docker, Homebrew, Helm, DEB/RPM, Cargo, source — pick your platform."
        path="/download"
        ogImage="og-download.jpg"
      />

      <div className="ds-doc">
        <aside className="ds-spine">
          <div className="top-mark">MANIFEST · DOWNLOAD</div>
          <div className="mark-box"><LogoMark height={28} alt="" /></div>
          <div className="foot-mark">NO. 004</div>
        </aside>

        <div className="ds-main">
          <section className="ds-hero" id="download-hero">
            <div className="ds-hero-grid">
              <div className="ds-hero-meta">
                <span className="line">§ 01</span>
                <span className="line">DOWNLOAD</span>
                <span className="line">SELF-HOST</span>
              </div>
              <div>
                <h1 className="ds-headline">
                  Run DataShuttle
                  <br />
                  <em>on your own</em> infrastructure.
                </h1>
              </div>
            </div>
            <div className="ds-hero-below">
              <div>
                <p className="lede">
                  Free, open-core, minimum moving parts: <strong>one daemon</strong>{' '}
                  for the server, an optional <strong>~12&nbsp;MB CLI</strong> for your
                  laptop, zero orchestration dependencies. Pick the channel that
                  matches how you already install things.
                </p>
                {os !== 'unknown' && (
                  <p style={{ marginTop: 12, font: '500 10px var(--font-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--signal-500)' }}>
                    Detected · {os === 'macos' ? 'macOS' : os}
                  </p>
                )}
              </div>
              <div className="side">
                <div className="row"><span>License</span><strong>Apache-2.0</strong></div>
                <div className="row"><span>Server</span><strong>~60 MB release binary</strong></div>
                <div className="row"><span>CLI</span><strong>~12 MB binary</strong></div>
                <div className="row"><span>Platforms</span><strong>linux · macos · docker</strong></div>
              </div>
            </div>
          </section>

          {/* Install channel picker */}
          <section className="ds-sec" id="channels">
            <div className="ds-sec-head">
              <div className="ds-sec-num">§ 02</div>
              <div className="ds-sec-title">Install channels</div>
              <div className="ds-sec-stamp">{TABS.length} channels</div>
            </div>

            <div className="ds-ruler" role="tablist" aria-label="Install channels">
              {TABS.map((t) => {
                const recommended = t.os?.includes(os as any)
                return (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={active === t.key}
                    onClick={() => setActive(t.key)}
                    className={`tab${active === t.key ? ' active' : ''}`}
                  >
                    {t.label}
                    {recommended && active !== t.key && (
                      <span className="k">✓ your OS</span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="ds-terminal" style={{ marginTop: 16 }} role="tabpanel">
              <div className="tbar">
                <span className="doc-id">CHANNEL · {activeTab.key.toUpperCase()}</span>
                <span className="doc-name">{activeTab.label}</span>
                <span className="doc-size">shell</span>
              </div>
              <div className="tbody" style={{ gridTemplateColumns: '1fr auto', alignItems: 'start' }}>
                <pre style={{ padding: 20 }}>{activeTab.command}</pre>
                <div style={{ padding: 12 }}>
                  <CopyButton text={activeTab.command} />
                </div>
              </div>
            </div>
            {activeTab.footnote && (
              <p style={{ marginTop: 12, font: '400 13px/1.6 var(--font-sans)', color: 'var(--fg-2)', maxWidth: '64ch' }}>
                {activeTab.footnote}
              </p>
            )}
            {(activeTab.key === 'deb' || activeTab.key === 'rpm') && (
              <p style={{ marginTop: 8, font: '500 11px var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                <a href="https://github.com/datashuttle-ai/datashuttle/releases/latest" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener">
                  Latest release assets →
                </a>
              </p>
            )}
          </section>

          <section className="ds-sec" id="verify">
            <div className="ds-sec-head">
              <div className="ds-sec-num">§ 03</div>
              <div className="ds-sec-title">Verify your download</div>
              <div className="ds-sec-stamp">SHA-256</div>
            </div>
            <p className="lede" style={{ marginBottom: 18 }}>
              Every GitHub Release ships a SHA-256 checksum alongside each binary.
              Verify before running on production.
            </p>
            <div className="ds-terminal">
              <div className="tbar">
                <span className="doc-id">VERIFY</span>
                <span className="doc-name">sha256sum</span>
                <span className="doc-size">bash</span>
              </div>
              <div className="tbody" style={{ gridTemplateColumns: '1fr' }}>
                <pre>
                  <span className="com"># Download the binary + its checksum</span>{'\n'}
                  curl -LO https://github.com/datashuttle-ai/datashuttle/releases/latest/download/datashuttle-&lt;platform&gt;.tar.gz{'\n'}
                  curl -LO https://github.com/datashuttle-ai/datashuttle/releases/latest/download/datashuttle-&lt;platform&gt;.tar.gz.sha256{'\n'}
                  {'\n'}
                  <span className="com"># Verify</span>{'\n'}
                  sha256sum -c datashuttle-&lt;platform&gt;.tar.gz.sha256
                </pre>
              </div>
            </div>
          </section>

          <section className="ds-sec" id="next-steps">
            <div className="ds-sec-head">
              <div className="ds-sec-num">§ 04</div>
              <div className="ds-sec-title">Next steps</div>
              <div className="ds-sec-stamp">2 links</div>
            </div>
            <div className="ds-steps">
              <a href="https://docs.datashuttle.ai/quickstart" className="ds-step" style={{ textDecoration: 'none' }}>
                <div className="ds-step-num">§ A</div>
                <div>
                  <h4>Read the quickstart →</h4>
                  <p>5 minutes to first Iceberg commit. Covers a Postgres source and a local MinIO warehouse.</p>
                </div>
              </a>
              <a href="https://docs.datashuttle.ai/connectors/postgresql" className="ds-step" style={{ textDecoration: 'none' }}>
                <div className="ds-step-num">§ B</div>
                <div>
                  <h4>Connect your first source →</h4>
                  <p>CDC-capable sources: Postgres, MySQL, MongoDB, Kafka. REST and file-based connectors are a one-liner away.</p>
                </div>
              </a>
              <a href="/cloud" className="ds-step" style={{ textDecoration: 'none' }}>
                <div className="ds-step-num">§ C</div>
                <div>
                  <h4>Skip install · try Cloud →</h4>
                  <p>Managed control plane with 10K DPU free every month. Same engine, zero ops.</p>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
