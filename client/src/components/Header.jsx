import React, { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { AuthContext } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/about', label: 'About' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useContext(AuthContext)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
      <div className="page-container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-primary">Heart & Brew</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-colors duration-150
                ${location.pathname === to
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:bg-surface-container'}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/admin" className="btn-primary text-sm">Dashboard</Link>
              <button onClick={logout} className="btn-ghost text-sm">Logout</button>
            </>
          ) : (
            <Link to="/admin/login" className="btn-ghost text-sm">Admin</Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-surface-container">
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-outline-variant/30 bg-surface-container-low">
          <nav className="page-container py-4 flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg font-body text-sm font-medium transition-colors
                  ${location.pathname === to
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:bg-surface-container'}`}
              >
                {label}
              </Link>
            ))}
            <div className="border-t border-outline-variant/30 mt-2 pt-2 flex flex-col gap-1">
              {user ? (
                <>
                  <Link to="/admin" onClick={() => setOpen(false)} className="px-4 py-3 rounded-lg font-body text-sm font-medium text-secondary">Dashboard</Link>
                  <button onClick={() => { logout(); setOpen(false) }} className="px-4 py-3 rounded-lg font-body text-sm font-medium text-on-surface-variant text-left">Logout</button>
                </>
              ) : (
                <Link to="/admin/login" onClick={() => setOpen(false)} className="px-4 py-3 rounded-lg font-body text-sm font-medium text-on-surface-variant">Admin Login</Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
