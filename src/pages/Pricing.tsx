/// /pricing — 4-tier matrix + DPU explainer + pay-options + FAQ (#626).
///
/// All values source from website/src/data/pricing.ts. Single-source-
/// of-truth discipline: if you're tempted to hardcode a price here,
/// update the data module instead.

import { useState } from 'react'
import { TIERS, PAY_OPTIONS, FEATURE_MATRIX, FAQS } from '../data/pricing'
import { SEO } from '../components/SEO'

function TierCard({
  tier,
}: {
  tier: (typeof TIERS)[number]
}) {
  const border = tier.featured
    ? 'border-indigo-500 ring-2 ring-indigo-500/30'
    : 'border-slate-800'
  return (
    <div
      className={`rounded-2xl border ${border} bg-slate-950/50 p-6 flex flex-col`}
    >
      {tier.featured && (
        <div className="mb-3 inline-block self-start rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-indigo-300">
          Most popular
        </div>
      )}
      <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
      <p className="mt-2 text-3xl font-bold text-white">{tier.priceHeadline}</p>
      {tier.perDpu && (
        <p className="mt-1 text-sm text-slate-400">
          or {tier.perDpu} / DPU
        </p>
      )}
      {tier.trial && (
        <p className="mt-1 text-xs text-indigo-300">{tier.trial}</p>
      )}

      <a
        href={tier.cta.href}
        className={`mt-6 block rounded-full px-5 py-2.5 text-center text-sm font-semibold transition ${
          tier.featured
            ? 'bg-indigo-600 text-white hover:bg-indigo-500'
            : 'border border-slate-700 text-slate-100 hover:border-slate-500'
        }`}
      >
        {tier.cta.label} →
      </a>

      <ul className="mt-6 space-y-2 text-sm text-slate-300">
        {tier.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2">
            <span className="mt-0.5 text-indigo-400">✓</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PayOptionsTable() {
  return (
    <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-950/30 p-6">
      <h3 className="text-lg font-semibold text-white">
        Other ways to pay
      </h3>
      <p className="mt-1 text-sm text-slate-400">
        Pure usage-based billing when a fixed plan doesn't fit — or when
        you run DataShuttle on your own infrastructure.
      </p>
      <table className="mt-4 w-full text-left text-sm">
        <thead className="text-slate-400">
          <tr>
            <th className="py-2 pr-3 font-medium">Option</th>
            <th className="py-2 pr-3 font-medium">Rate</th>
            <th className="py-2 pr-3 font-medium">When to pick</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {PAY_OPTIONS.map((opt) => (
            <tr key={opt.option}>
              <td className="py-3 pr-3 text-slate-100">{opt.option}</td>
              <td className="py-3 pr-3 font-mono text-indigo-300">
                {opt.rate}
              </td>
              <td className="py-3 pr-3 text-slate-400">{opt.when}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function FeatureMatrix() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold text-white">Feature comparison</h2>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/50 text-slate-300">
            <tr>
              <th className="py-3 pl-6 pr-3 font-medium">Feature</th>
              {TIERS.map((t) => (
                <th key={t.tier} className="py-3 px-3 text-center font-medium">
                  {t.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {FEATURE_MATRIX.map((row) => (
              <tr key={row.label}>
                <td className="py-3 pl-6 pr-3 text-slate-100">{row.label}</td>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className="py-3 px-3 text-center text-slate-300"
                  >
                    {v === '-' ? (
                      <span className="text-slate-600">—</span>
                    ) : v === '✓' ? (
                      <span className="text-indigo-400">✓</span>
                    ) : (
                      v
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-800 py-4">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-[15px] font-medium text-slate-100">{q}</span>
        <span
          className={`text-slate-500 transition-transform ${
            open ? 'rotate-45' : ''
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{a}</p>
      )}
    </div>
  )
}

function FaqSection() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold text-white">
        Frequently asked questions
      </h2>
      <div className="mt-6">
        {FAQS.map((f) => (
          <FaqItem key={f.q} q={f.q} a={f.a} />
        ))}
      </div>
    </div>
  )
}

export default function Pricing() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <SEO
        title="Pricing — DataShuttle"
        description="Community, Team, Business, Enterprise plans. 10K–unlimited DPU. Self-host free."
        path="/pricing"
        ogImage="og-pricing.jpg"
      />
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-white md:text-5xl">
          Plans for every team size
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-slate-400">
          Start free, pay for what you use. Cloud or self-host — same binary,
          same features, only the bill changes.
        </p>
      </header>

      {/* DPU explainer */}
      <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-300">
          What's a DPU?
        </h2>
        <p className="mt-2 text-slate-300">
          <strong className="text-white">1 DPU</strong> = 1 GB processed
          = 250,000 CDC events = 1 connector-hour = 1 vCPU-hour. Whichever
          meter ticks first is what we charge — so the same amount of real
          work costs the same whether it arrives as a batch, a stream, or a
          catch-up replay.
        </p>
      </section>

      {/* Four tier cards */}
      <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((t) => (
          <TierCard key={t.tier} tier={t} />
        ))}
      </section>

      <PayOptionsTable />

      <FeatureMatrix />

      <FaqSection />

      {/* Bottom CTA */}
      <section className="mt-20 rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-900/30 to-slate-950/30 p-8 text-center">
        <h2 className="text-2xl font-semibold text-white">Ready to start?</h2>
        <p className="mt-2 text-slate-400">
          Spin up a cloud tenant in under a minute, or run the self-hosted
          binary in your own environment.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/cloud"
            className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Start free on Cloud →
          </a>
          <a
            href="https://ghcr.io/datashuttle-ai/datashuttle"
            className="rounded-full border border-slate-700 px-6 py-2.5 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            Self-host with Docker
          </a>
        </div>
      </section>
    </main>
  )
}
