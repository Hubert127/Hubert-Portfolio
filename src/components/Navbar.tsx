import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LuMenu, LuX } from 'react-icons/lu'
import { navLinks, profile } from '../data/site'
import ThemeToggle from './ThemeToggle'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-1.5 text-sm transition-colors ${
    isActive ? 'bg-tint-2 text-fg' : 'text-muted hover:text-fg'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-nav px-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-sm font-bold text-white">
            NH
          </span>
          <span className="font-serif text-xl text-fg">{profile.name}</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-line bg-tint p-1 md:flex">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/contact"
            className="hidden rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand/85 md:block"
          >
            Let&apos;s Talk
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-fg md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <LuX size={20} /> : <LuMenu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mb-3 max-w-6xl rounded-2xl border border-line bg-panel p-3 md:hidden">
          {[...navLinks, { label: 'Contact', to: '/contact' }].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm ${
                  isActive ? 'bg-tint-2 text-fg' : 'text-body'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
