import Reveal from './Reveal'

type Props = { eyebrow: string; title: string; text: string }

export default function PageHeader({ eyebrow, title, text }: Props) {
  return (
    <Reveal className="mx-auto max-w-3xl px-6 pt-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky">{eyebrow}</p>
      <h1 className="mt-4 font-serif text-5xl text-white md:text-6xl">{title}</h1>
      <p className="mt-5 text-slate-400">{text}</p>
    </Reveal>
  )
}
