/// /install — install-channel grid + OS detection.
///
/// Commands are pinned to install.sh + the Helm chart + the release-asset
/// names. Anything here that doesn't match those is a bug in this page,
/// not in the packaging shuttle.

import { useMemo, useState } from 'react'
import { SEO } from '../components/SEO'

interface InstallTab {
  key: string
  label: string
  command: string
  footnote?: string
  os?: Array<'linux' | 'macos' | 'windows'>
}

const TABS: InstallTab[] = [
  {
    key: 'server',
    label: 'Server (daemon)',
    command:
      'curl -fsSL https://datashuttle.ai/install.sh | sudo bash -s -- --systemd',
    footnote:
      'Installs `datashuttle` + `datashuttled` (daemon alias) and drops a hardened systemd unit. Default build ships core connectors (postgres, mysql, mongodb, kafka, file, rest-api); the full catalogue is available via `cargo build --release --features cdc-all` from source. Run `sudo datashuttle setup --quickstart` after install.',
    os: ['linux'],
  },
  {
    key: 'client',
    label: 'CLI (your laptop)',
    command:
      'curl -fsSL https://datashuttle.ai/install.sh | bash -s -- --client-only',
    footnote:
      'Installs the thin `datashuttle-client` binary (~15–25 MB stripped). No server, no connector drivers, no embedded UI. Point at a remote daemon with the `DS_SERVER` env var or the `--server` flag.',
    os: ['linux', 'macos'],
  },
  {
    key: 'docker',
    label: 'Docker',
    command: 'docker pull ghcr.io/datashuttle-ai/datashuttle:latest',
    footnote:
      'Multi-arch image (linux/amd64 + linux/arm64). A working compose bundle lives under `deploy/` in the repo — use it as a reference stack, not a production template.',
    os: ['linux', 'macos', 'windows'],
  },
  {
    key: 'homebrew',
    label: 'Homebrew',
    command: 'brew install datashuttle-ai/tap/datashuttle',
    footnote:
      'macOS + Linuxbrew. Ships the full daemon binary; the `datashuttle-client` bottle is a follow-up. Tap auto-updates on each release.',
    os: ['macos'],
  },
  {
    key: 'deb',
    label: 'DEB (Debian/Ubuntu)',
    command: 'sudo dpkg -i datashuttle_<version>_amd64.deb',
    footnote:
      'Download the `.deb` from the latest GitHub Release. Ships the full daemon + `datashuttled` alias. apt-repo landing in a follow-up release.',
    os: ['linux'],
  },
  {
    key: 'rpm',
    label: 'RPM (RHEL/Fedora)',
    command: 'sudo rpm -i datashuttle-<version>.x86_64.rpm',
    footnote:
      'Same pattern as the `.deb` — grab the `.rpm` from GitHub Releases. A dnf-repo is on the roadmap.',
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
      className="ds-copy"
      aria-label="Copy command"
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  )
}

// Initial tab for a given OS — picked once at mount.
function defaultTabForOs(os: OsKind): string {
  if (os === 'macos') return 'client'
  if (os === 'windows') return 'docker'
  return 'server'
}

export default function Install() {
  // `navigator` exists on first render in the SPA, but guard for SSR/tests
  // via detectOs()'s own `typeof navigator` check. Lazy initializers keep
  // state in sync with the detected OS without a setState-in-effect round-trip.
  const [os] = useState<OsKind>(() => detectOs())
  const [active, setActive] = useState<string>(() => defaultTabForOs(detectOs()))

  const activeTab = useMemo(
    () => TABS.find((t) => t.key === active) ?? TABS[0],
    [active],
  )

  const renderFootnote = (text: string) => {
    // Render single-backtick `code` spans inline so footnotes retain their
    // monospaced identifiers without bringing in a markdown dep.
    const parts = text.split(/(`[^`]+`)/g)
    return parts.map((p, i) =>
      p.startsWith('`') && p.endsWith('`') ? (
        <code key={i}>{p.slice(1, -1)}</code>
      ) : (
        <span key={i}>{p}</span>
      ),
    )
  }

  return (
    <>
      <SEO
        title="Install DataShuttle"
        description="systemd, Docker, Homebrew, DEB, RPM — pick your platform. DataShuttle is proprietary software; Community tier is free to evaluate."
        path="/install"
        ogImage="og-download.jpg"
      />
      <div className="ds-wrap">
        <section className="ds-hero" style={{ gridTemplateColumns: '1fr' }}>
          <div>
            <div className="eyebrow">
              <span className="pill">Self-hosted · early access</span>
              {os !== 'unknown' && (
                <span
                  style={{
                    font: '500 11px var(--font-mono)',
                    color: 'var(--fg-3)',
                    letterSpacing: '0.04em',
                    marginLeft: 6,
                  }}
                >
                  · detected {os === 'macos' ? 'macOS' : os}
                </span>
              )}
            </div>
            <h1>Run DataShuttle on your own infrastructure.</h1>
            <p className="lede">
              One Rust daemon, an optional ~15–25&nbsp;MB CLI, zero orchestration
              dependencies. DataShuttle is distributed under a proprietary
              license; the Community tier is free to evaluate, Team and above
              require a license file.
            </p>
          </div>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <div className="eyebrow">01 · install channels</div>
            <h2>Pick your packaging.</h2>
          </div>

          <div
            role="tablist"
            aria-label="Install channels"
            className="ds-tabs"
          >
            {TABS.map((t) => {
              const recommended = t.os?.includes(os as 'linux' | 'macos' | 'windows')
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={active === t.key}
                  onClick={() => setActive(t.key)}
                  className="ds-tab"
                >
                  {t.label}
                  {recommended && active !== t.key && (
                    <span className="osmark">✓ your OS</span>
                  )}
                </button>
              )
            })}
          </div>

          <div role="tabpanel" className="ds-cmd">
            <div className="top">
              <pre>
                <code>{activeTab.command}</code>
              </pre>
              <CopyButton text={activeTab.command} />
            </div>
            {activeTab.footnote && (
              <p className="footnote">{renderFootnote(activeTab.footnote)}</p>
            )}
            {(activeTab.key === 'deb' || activeTab.key === 'rpm') && (
              <p className="footnote">
                <a
                  href="https://github.com/datashuttle-ai/datashuttle/releases/latest"
                  target="_blank"
                  rel="noopener"
                >
                  Download the latest release asset →
                </a>
              </p>
            )}
          </div>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <div className="eyebrow">02 · verify</div>
            <h2>Verify your download.</h2>
            <p>
              Every GitHub Release ships a SHA-256 checksum file alongside each
              binary. Verify before running on production.
            </p>
          </div>
          <div className="ds-verify">
            <pre>
{`# Download the binary + its checksum
curl -LO https://github.com/datashuttle-ai/datashuttle/releases/latest/download/datashuttle-<platform>.tar.gz
curl -LO https://github.com/datashuttle-ai/datashuttle/releases/latest/download/datashuttle-<platform>.tar.gz.sha256

# Verify
sha256sum -c datashuttle-<platform>.tar.gz.sha256`}
            </pre>
          </div>
        </section>

        <section className="ds-sec">
          <div className="ds-sec-head">
            <div className="eyebrow">03 · next steps</div>
            <h2>Where to go from here.</h2>
          </div>
          <div className="ds-features" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
            <a
              className="ds-feat"
              href="https://docs.datashuttle.ai/quickstart"
              style={{ textDecoration: 'none' }}
            >
              <h4>Read the quickstart →</h4>
              <p>
                End-to-end tutorial: a Postgres source, a local MinIO warehouse,
                and the first Iceberg commit.
              </p>
            </a>
            <a
              className="ds-feat"
              href="https://docs.datashuttle.ai/connectors/postgresql"
              style={{ textDecoration: 'none' }}
            >
              <h4>Connect your first source →</h4>
              <p>
                Postgres, MySQL, MongoDB, Kafka are on every build. REST and
                file-based sources are one <code>CREATE CONNECTION</code> away.
              </p>
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
