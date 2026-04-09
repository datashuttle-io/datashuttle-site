type Cell = string | boolean

interface Row {
  feature: string
  datashuttle: Cell
  debezium: Cell
  dlt: Cell
  fivetran: Cell
}

const rows: Row[] = [
  { feature: 'Iceberg native',         datashuttle: true,          debezium: false,            dlt: false,          fivetran: false },
  { feature: 'Deletion vectors',           datashuttle: true,          debezium: false,            dlt: false,          fivetran: false },
  { feature: 'Continuous CDC',             datashuttle: true,          debezium: true,             dlt: '⚠️ Limited',   fivetran: true },
  { feature: 'Schema auto-evolution',      datashuttle: true,          debezium: '⚠️ Partial',     dlt: true,           fivetran: '⚠️ Limited' },
  { feature: 'Auto compaction',            datashuttle: true,          debezium: false,            dlt: true,           fivetran: false },
  { feature: 'Arrow Flight buffer',        datashuttle: true,          debezium: false,            dlt: false,          fivetran: false },
  { feature: 'Built-in lineage',           datashuttle: true,          debezium: false,            dlt: false,          fivetran: false },
  { feature: 'Inline transforms (SQL)',    datashuttle: true,          debezium: false,            dlt: true,           fivetran: '⚠️ Limited' },
  { feature: 'No coordinator / broker',    datashuttle: true,          debezium: false,            dlt: false,          fivetran: 'SaaS' },
  { feature: 'Self-hosted',               datashuttle: true,          debezium: true,             dlt: true,           fivetran: false },
  { feature: 'Single binary',             datashuttle: true,          debezium: false,            dlt: false,          fivetran: false },
]

function CellContent({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15">
        <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10">
        <svg className="w-3.5 h-3.5 text-red-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    )
  }
  return <span className="text-xs text-slate-500">{value}</span>
}

export default function Comparison() {
  return (
    <section className="bg-slate-950 py-28 px-6 border-t border-slate-800/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4">Comparison</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Built for Iceberg.<br className="hidden sm:block" /> Not adapted for it.
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/70">
                <th className="px-4 py-4 text-left text-slate-500 font-medium w-48">Feature</th>
                <th className="px-4 py-4 text-center font-semibold text-white bg-indigo-950/40 border-x border-indigo-500/20">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-indigo-400">DataShuttle</span>
                    <span className="text-xs font-normal text-indigo-500/60">Iceberg-native</span>
                  </div>
                </th>
                <th className="px-4 py-4 text-center text-slate-500 font-medium">
                  <div className="flex flex-col items-center gap-1">
                    <span>Debezium + Flink</span>
                    <span className="text-xs font-normal text-slate-600">DIY stack</span>
                  </div>
                </th>
                <th className="px-4 py-4 text-center text-slate-500 font-medium">
                  <div className="flex flex-col items-center gap-1">
                    <span>Delta Live Tables</span>
                    <span className="text-xs font-normal text-slate-600">Databricks only</span>
                  </div>
                </th>
                <th className="px-4 py-4 text-center text-slate-500 font-medium">
                  <div className="flex flex-col items-center gap-1">
                    <span>Fivetran</span>
                    <span className="text-xs font-normal text-slate-600">SaaS</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-slate-800/60 ${i % 2 === 0 ? 'bg-slate-900/20' : ''} hover:bg-slate-800/20 transition-colors`}
                >
                  <td className="px-4 py-3 text-slate-300 font-medium">{row.feature}</td>
                  <td className="px-4 py-3 text-center bg-indigo-950/20 border-x border-indigo-500/10">
                    <CellContent value={row.datashuttle} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <CellContent value={row.debezium} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <CellContent value={row.dlt} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <CellContent value={row.fivetran} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
