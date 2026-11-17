import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { experience } from '../data/site'

export default function Experience() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="My journey so far"
        text="Roles, teams and studies that shaped how I work."
      />
      <section className="mx-auto mt-14 max-w-3xl px-6">
        <ol className="relative space-y-8 border-l border-white/10 pl-8">
          {experience.map((e, i) => (
            <Reveal key={e.role} delay={i * 100}>
              <li className="relative">
                <span className="absolute -left-[2.45rem] top-1.5 h-3 w-3 rounded-full bg-brand ring-4 ring-ink" />
                <p className="text-xs font-semibold uppercase tracking-widest text-sky">
                  {e.period}
                </p>
                <h3 className="mt-1 font-serif text-2xl text-white">{e.role}</h3>
                <p className="text-sm text-slate-400">{e.org}</p>
                <p className="mt-2 text-slate-300">{e.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  )
}
