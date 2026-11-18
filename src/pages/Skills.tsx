import { LuCheck } from 'react-icons/lu'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { skills } from '../data/site'

export default function Skills() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="What I bring"
        text="Technologies and strengths I use to build and lead."
      />
      <section className="mx-auto mt-14 grid max-w-4xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <Reveal key={s} delay={(i % 3) * 80}>
            <div className="flex items-center gap-3 rounded-xl border border-line bg-panel px-5 py-4 text-fg">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand/20 text-sky">
                <LuCheck size={15} />
              </span>
              {s}
            </div>
          </Reveal>
        ))}
      </section>
    </>
  )
}
