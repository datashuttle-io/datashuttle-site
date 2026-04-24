import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="ds-nav">
      <div className="ds-wrap row">
        <Link to="/" className="brand">
          <img src="/brand/logo-wordmark.svg" alt="DataShuttle" />
        </Link>
        <div className="links">
          <Link to="/">Product</Link>
          <a href="https://docs.datashuttle.ai">Docs</a>
          <Link to="/pricing">Pricing</Link>
          <Link to="/whats-new">Changelog</Link>
        </div>
        <div className="cta">
          <a className="ds-btn ds-btn-ghost" href="https://app.datashuttle.ai">Sign in</a>
          <Link className="ds-btn ds-btn-primary" to="/cloud">Start free</Link>
        </div>
      </div>
    </nav>
  )
}
