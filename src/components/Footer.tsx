import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="ds-footer">
      <div className="ds-wrap">
        <div className="ds-footer-grid">
          <div className="col">
            <div className="brand">
              <img src="/brand/logo-wordmark.svg" alt="DataShuttle" />
            </div>
            <p className="tag">
              An Iceberg-native ingestion engine. One Rust binary. Cloud,
              self-hosted, or airgapped.
            </p>
          </div>
          <div className="col">
            <h4>Product</h4>
            <Link to="/product">Product</Link>
            <Link to="/deployment">Deployment</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/changelog">Changelog</Link>
            <Link to="/status">Status</Link>
          </div>
          <div className="col">
            <h4>Developers</h4>
            <a href="https://docs.datashuttle.ai">Docs</a>
            <a href="https://docs.datashuttle.ai/api-reference/rest.html">API reference</a>
            <a href="https://docs.datashuttle.ai/sql-reference/connections.html">SQL reference</a>
            <Link to="/install">Install</Link>
            <a href="https://github.com/datashuttle-ai/datashuttle/releases">Releases</a>
          </div>
          <div className="col">
            <h4>Company</h4>
            <a href="mailto:hello@datashuttle.ai">Contact</a>
            <a href="mailto:sales@datashuttle.ai">Sales</a>
            <a href="mailto:security@datashuttle.ai">Security</a>
            <a href="https://github.com/datashuttle-ai/datashuttle">GitHub</a>
          </div>
        </div>
        <div className="ds-footer-base">
          <span>© 2024–{year} DataShuttle Labs. All rights reserved.</span>
          <span className="license-note">
            DataShuttle is distributed under a proprietary license.
          </span>
        </div>
      </div>
    </footer>
  )
}
