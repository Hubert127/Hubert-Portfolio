import { LuArrowUpRight } from 'react-icons/lu'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { projects } from '../data/site'

export default function Projects() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Things I have built"
        text="A selection of work, from ideas to shipped products."
      />
      <section className="mx-auto mt-14 grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 100}>
            <a
              href={p.link}
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-panel-2 to-panel p-6 transition hover:-translate-y-1 hover:border-brand/60"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-serif text-2xl text-white">{p.title}</h3>
                <LuArrowUpRight
                  size={20}
                  className="text-slate-500 transition group-hover:text-sky"
                />
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{p.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-brand/15 px-3 py-1 text-xs text-sky"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </a>
          </Reveal>
        ))}
      </section>
    </>
  )
}
