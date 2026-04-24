export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="ds-footer">
      <div className="ds-wrap row">
        <div className="brand">
          <img src="/brand/logo-wordmark.svg" alt="DataShuttle" />
        </div>
        <div className="links">
          <a href="https://docs.datashuttle.ai">Docs</a>
          <a href="https://github.com/datashuttle-ai/datashuttle">GitHub</a>
          <a href="mailto:hello@datashuttle.ai">Contact</a>
          <span>© {year} DataShuttle Labs</span>
        </div>
      </div>
    </footer>
  )
}
