import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import '../styles/marketing.css'

export default function Layout() {
  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: 'var(--bg)', color: 'var(--fg)' }}
    >
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
