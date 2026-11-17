import { Link } from 'react-router-dom'
import { navLinks, profile, skills } from '../data/site'
import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-panel/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-2xl text-white">{profile.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Final-year Business and ICT student specializing in software and AI systems
            engineering, and co-founder of JEHE TECH. Skills: {skills.slice(0, 6).join(', ')}.
          </p>
        </div>

        <div className="md:mx-auto">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white">
            Quick links
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[...navLinks, { label: 'Contact', to: '/contact' }].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-slate-400 transition hover:text-sky">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:ml-auto">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white">
            Follow me on
          </h4>
          <div className="mt-4">
            <SocialLinks />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
      </div>
    </footer>
  )
}
