import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { profile } from '../data/site'

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Get to know me"
        text="A short story of who I am, what I study and what I am building."
      />
      <section className="mx-auto mt-14 grid max-w-5xl items-center gap-10 px-6 md:grid-cols-[320px_1fr]">
        <Reveal>
          <div className="aspect-[3/4] overflow-hidden rounded-[50%] border border-line shadow-[0_0_60px_rgba(47,107,255,0.3)]">
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              className="h-full w-full object-cover object-[50%_28%]"
            />
          </div>
        </Reveal>
        <Reveal delay={120} className="space-y-4 leading-relaxed text-body">
          <p>
            I&apos;m {profile.name}, a final-year student in Business and ICT, specializing in
            software and AI systems engineering.
          </p>
          <p>
            I am also a co-founder of the JEHE TECH team, where we turn ideas into working
            software.
          </p>
          <p className="text-faint">
            Replace this text with your own story in <code>src/pages/About.tsx</code>.
          </p>
        </Reveal>
      </section>
    </>
  )
}
