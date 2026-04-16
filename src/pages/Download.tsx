/// /download — 8-channel install grid + OS detection (#628).
///
/// Commands source from repo README.md at commit-pin-time; anything here
/// that doesn't match install.sh / the Helm chart / the release-asset
/// names is a bug in this page, not in the packaging pipeline.

import { useEffect, useMemo, useState } from 'react'
import { SEO } from '../components/SEO'

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
    key: 'quick',
    label: 'Quick install',
    command:
      'curl -fsSL https://raw.githubusercontent.com/datashuttle-ai/datashuttle/main/install.sh | bash',
    footnote:
      "Detects your OS + arch and fetches the right release binary. Read install.sh first if curl | bash makes you twitchy.",
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
    footnote: 'macOS + Linuxbrew. Tap auto-updates on each release.',
    os: ['macos'],
  },
  {
    key: 'helm',
    label: 'Helm',
    command: 'helm install datashuttle deploy/helm/datashuttle',
    footnote:
      'Checkout the repo first — the chart is vendored under deploy/helm/ rather than a Chart repository.',
    os: ['linux'],
  },
  {
    key: 'cargo',
    label: 'Cargo',
    command: 'cargo install datashuttle-cli',
    footnote:
      'Requires Rust 1.94+. Slower first compile (~15 min on 4 cores), but rebuilds fly on warm cache.',
    os: ['linux', 'macos', 'windows'],
  },
  {
    key: 'deb',
    label: 'DEB (Debian/Ubuntu)',
    command: 'sudo dpkg -i datashuttle_<version>_amd64.deb',
    footnote:
      'Download the .deb from the latest GitHub Release (link below). apt-repo landing in a follow-up.',
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
  {
    key: 'source',
    label: 'From source',
    command:
      'git clone https://github.com/datashuttle-ai/datashuttle.git && cd datashuttle && cargo build --release',
    footnote:
      'Contribution guide is at docs.datashuttle.ai/development/contributing. Windows builds supported via cross but not release-tested.',
    os: ['linux', 'macos', 'windows'],
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
      className="rounded border border-slate-700 bg-slate-900/60 px-2.5 py-1 text-xs font-medium text-slate-300 hover:border-slate-500"
      aria-label="Copy command"
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  )
}

export default function Download() {
  const [os, setOs] = useState<OsKind>('unknown')
  const [active, setActive] = useState<string>('quick')

  useEffect(() => {
    const detected = detectOs()
    setOs(detected)
    // Land macOS users on Homebrew, Windows visitors on Docker, Linux
    // visitors stay on Quick install (the install.sh covers them).
    if (detected === 'macos') setActive('homebrew')
    else if (detected === 'windows') setActive('docker')
  }, [])

  const activeTab = useMemo(
    () => TABS.find((t) => t.key === active) ?? TABS[0],
    [active],
  )

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <SEO
        title="Install DataShuttle"
        description="Docker, Homebrew, Helm, DEB/RPM, Cargo, source — pick your platform."
        path="/download"
        ogImage="og-download.jpg"
      />
      <header className="text-center">
        <h1 className="text-4xl font-bold text-white md:text-5xl">
          Run DataShuttle on your own infrastructure
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-slate-400">
          Free, open core, single binary, no external dependencies.
          Pick the channel that matches how you already install things.
        </p>
        {os !== 'unknown' && (
          <p className="mt-3 text-xs uppercase tracking-wide text-indigo-300">
            Detected {os === 'macos' ? 'macOS' : os}
          </p>
        )}
      </header>

      {/* Tabs */}
      <div className="mt-10">
        <div
          role="tablist"
          aria-label="Install channels"
          className="flex flex-wrap gap-2"
        >
          {TABS.map((t) => {
            const recommended = t.os?.includes(os as any)
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={active === t.key}
                onClick={() => setActive(t.key)}
                className={`rounded-full px-4 py-1.5 text-sm transition ${
                  active === t.key
                    ? 'bg-indigo-600 text-white'
                    : 'border border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                {t.label}
                {recommended && active !== t.key && (
                  <span className="ml-2 text-[10px] text-emerald-300">
                    ✓ your OS
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Command */}
        <div
          role="tabpanel"
          className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <pre className="flex-1 overflow-x-auto text-sm leading-relaxed text-slate-100">
              <code>{activeTab.command}</code>
            </pre>
            <CopyButton text={activeTab.command} />
          </div>
          {activeTab.footnote && (
            <p className="mt-3 text-xs text-slate-500">{activeTab.footnote}</p>
          )}
          {activeTab.key === 'quick' && (
            <p className="mt-2 text-xs">
              <a
                href="https://github.com/datashuttle-ai/datashuttle/blob/main/install.sh"
                target="_blank"
                rel="noopener"
                className="text-indigo-400 underline hover:text-indigo-300"
              >
                Read install.sh first →
              </a>
            </p>
          )}
          {(activeTab.key === 'deb' || activeTab.key === 'rpm') && (
            <p className="mt-2 text-xs">
              <a
                href="https://github.com/datashuttle-ai/datashuttle/releases/latest"
                target="_blank"
                rel="noopener"
                className="text-indigo-400 underline hover:text-indigo-300"
              >
                Download the latest release asset →
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Verify your download */}
      <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
        <h2 className="text-lg font-semibold text-white">
          Verify your download
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Every GitHub Release ships SHA-256 checksums alongside the
          binaries. The release workflow also publishes Cosign signatures
          — verify before running on production:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950/70 p-4 text-xs text-slate-200">
{`# checksum
sha256sum -c datashuttle_<version>_checksums.txt

# cosign (keyless, GitHub OIDC)
cosign verify-blob \\
  --certificate-identity-regexp='https://github.com/datashuttle-ai/datashuttle/.*' \\
  --certificate-oidc-issuer=https://token.actions.githubusercontent.com \\
  --signature datashuttle-<ver>.sig \\
  datashuttle-<ver>`}
        </pre>
        <p className="mt-3 text-xs">
          <a
            href="https://github.com/datashuttle-ai/datashuttle/blob/main/.github/workflows/release.yaml"
            target="_blank"
            rel="noopener"
            className="text-indigo-400 underline hover:text-indigo-300"
          >
            Release pipeline →
          </a>
        </p>
      </section>

      {/* Next steps */}
      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        <a
          href="https://docs.datashuttle.ai/quickstart"
          className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 transition hover:border-slate-600"
        >
          <h3 className="text-lg font-semibold text-white">
            Read the quickstart →
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            5 minutes to first Iceberg commit. Covers a Postgres source
            and a local MinIO warehouse.
          </p>
        </a>
        <a
          href="https://docs.datashuttle.ai/connectors/postgresql"
          className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 transition hover:border-slate-600"
        >
          <h3 className="text-lg font-semibold text-white">
            Connect your first source →
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            CDC-capable sources: Postgres, MySQL, MongoDB, Kafka.
            REST and file-based connectors are a one-liner away.
          </p>
        </a>
      </section>
    </main>
  )
}
