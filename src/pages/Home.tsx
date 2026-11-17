import { Link } from 'react-router-dom'
import {
  LuArrowRight,
  LuBriefcase,
  LuCpu,
  LuFolderKanban,
  LuImage,
  LuMail,
  LuUser,
} from 'react-icons/lu'
import Reveal from '../components/Reveal'
import { profile, skills } from '../data/site'

const cards = [
  {
    title: 'About',
    text: 'Every great build starts with understanding the person behind it.',
    to: '/about',
    Icon: LuUser,
  },
  {
    title: 'Experience',
    text: 'Growth happens when you build, lead and keep showing up.',
    to: '/experience',
    Icon: LuBriefcase,
  },
  {
    title: 'Projects',
    text: 'Ideas only matter once they are shipped and in use.',
    to: '/projects',
    Icon: LuFolderKanban,
  },
  {
    title: 'Skills',
    text: 'Curiosity is the tool that sharpens every other tool.',
    to: '/skills',
    Icon: LuCpu,
  },
  {
    title: 'Gallery',
    text: 'Moments behind the work, captured along the way.',
    to: '/gallery',
    Icon: LuImage,
  },
  {
    title: 'Contact',
    text: 'The next big idea might start with a simple hello.',
    to: '/contact',
    Icon: LuMail,
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-12 pt-14 md:grid-cols-2 md:pt-20">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-10 rounded-full bg-brand/30 blur-3xl" aria-hidden />
          <div className="relative aspect-[3/4] overflow-hidden rounded-[50%] border border-white/15 shadow-[0_0_80px_rgba(47,107,255,0.35)]">
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              className="h-full w-full object-cover object-[50%_28%]"
              fetchPriority="high"
            />
          </div>
        </Reveal>

        <Reveal delay={120} className="text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-sky" />
            Available for projects
          </span>

          <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Hi, I&apos;m <em className="text-brand">{profile.firstName}.</em>
          </h1>

          <ul className="mt-6 space-y-1.5 text-sm uppercase tracking-[0.18em] text-slate-400">
            {profile.titleLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <p className="mx-auto mt-6 max-w-md text-slate-400 md:mx-0">{profile.pitch}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/85"
            >
              View Portfolio <LuArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <LuMail size={16} /> Contact Me
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Skills strip */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Tools I work with
          </p>
          <ul className="mt-5 flex flex-wrap justify-center gap-3">
            {skills.map((s) => (
              <li
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Explore cards */}
      <section className="mx-auto max-w-6xl px-6 pt-16">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky">Explore</p>
          <h2 className="mt-3 font-serif text-4xl text-white md:text-5xl">
            Explore more about me
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ title, text, to, Icon }, i) => (
            <Reveal key={title} delay={(i % 3) * 100}>
              <Link
                to={to}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-panel-2 to-panel p-6 transition hover:-translate-y-1 hover:border-brand/60"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-sky">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-serif text-2xl text-white">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky">
                  Explore {title.toLowerCase()}
                  <LuArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
