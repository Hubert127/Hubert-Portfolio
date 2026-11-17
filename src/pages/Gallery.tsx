import { useEffect, useState } from 'react'
import { LuX } from 'react-icons/lu'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { gallery } from '../data/site'

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  // Close the viewer with the Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments"
        text="Select a photo to view it full screen."
      />
      <section className="mx-auto mt-14 grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((g, i) => (
          <Reveal
            key={g.src}
            delay={(i % 3) * 100}
            className={'wide' in g && g.wide ? 'sm:col-span-2' : ''}
          >
            <button
              onClick={() => setActive(i)}
              className="group block w-full overflow-hidden rounded-2xl border border-white/10 text-left"
            >
              <img
                src={g.src}
                alt={g.caption}
                loading="lazy"
                className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                  'wide' in g && g.wide ? 'aspect-[16/9]' : 'aspect-[3/4]'
                }`}
              />
            </button>
          </Reveal>
        ))}
      </section>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={gallery[active].caption}
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            <LuX size={22} />
          </button>
          <img
            src={gallery[active].src}
            alt={gallery[active].caption}
            className="max-h-[88vh] max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
