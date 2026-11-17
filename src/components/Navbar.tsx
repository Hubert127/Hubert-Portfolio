import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LuMenu, LuX } from 'react-icons/lu'
import { navLinks, profile } from '../data/site'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-1.5 text-sm transition-colors ${
    isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink px-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-sm font-bold text-white">
            NH
          </span>
          <span className="font-serif text-xl text-white">{profile.name}</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 md:flex">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/contact"
          className="hidden rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand/85 md:block"
        >
          Let&apos;s Talk
        </Link>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <LuX size={20} /> : <LuMenu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mb-3 max-w-6xl rounded-2xl border border-white/10 bg-panel p-3 md:hidden">
          {[...navLinks, { label: 'Contact', to: '/contact' }].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm ${
                  isActive ? 'bg-white/10 text-white' : 'text-slate-300'
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
