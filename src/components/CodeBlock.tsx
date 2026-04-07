interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

// Minimal SQL syntax highlighter — no external deps
function highlight(code: string): string {
  const keywords = /\b(CREATE|PIPELINE|SOURCE|CONNECTION|DATABASE|TABLES|INTO|SCHEDULE|WITH|continuous|true|false|SELECT|FROM|WHERE|AND|OR|NOT|AS|ON|JOIN|LEFT|RIGHT|INNER|OUTER)\b/g
  const strings = /('(?:[^'\\]|\\.)*')/g
  const comments = /(--[^\n]*)/g
  const numbers = /\b(\d+)\b/g
  const params = /\b(iceberg_format_version|delete_mode|row_lineage|schema_evolution|snapshot_retention|compaction_strategy|deletion_vectors|compatible|auto)\b/g

  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(comments, '<span class="sql-comment">$1</span>')
    .replace(strings, '<span class="sql-string">$1</span>')
    .replace(keywords, '<span class="sql-keyword">$1</span>')
    .replace(params, '<span class="sql-param">$1</span>')
    .replace(numbers, '<span class="sql-number">$1</span>')
}

export default function CodeBlock({ code, language = 'sql', filename }: CodeBlockProps) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/80 backdrop-blur overflow-hidden shadow-2xl shadow-black/40 text-left">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/60 bg-slate-800/50">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        {filename && (
          <span className="text-xs text-slate-500 font-mono">{filename}</span>
        )}
        <span className="text-xs text-slate-600 font-mono uppercase">{language}</span>
      </div>

      {/* Code */}
      <div className="overflow-x-auto p-6">
        <style>{`
          .sql-keyword { color: #818CF8; font-weight: 600; }
          .sql-string  { color: #86EFAC; }
          .sql-comment { color: #475569; font-style: italic; }
          .sql-number  { color: #FCA5A5; }
          .sql-param   { color: #67E8F9; }
        `}</style>
        <pre
          className="text-sm font-mono text-slate-300 leading-7 whitespace-pre"
          dangerouslySetInnerHTML={{ __html: highlight(code) }}
        />
      </div>
    </div>
  )
}
