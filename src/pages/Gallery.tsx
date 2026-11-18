import { useCallback, useEffect, useRef, useState } from 'react'
import { LuCalendar, LuChevronLeft, LuChevronRight, LuMapPin, LuX } from 'react-icons/lu'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { gallery, profile, type GalleryItem } from '../data/site'
import { formatDate } from '../utils/formatDate'

type PostProps = {
  item: GalleryItem
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
  onClose: () => void
}

/** The pop-up: photo on the left, story on the right, over the gallery page. */
function Post({ item, index, total, onPrev, onNext, onClose }: PostProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const date = formatDate(item.date)
  const hasText = item.title || item.caption || item.tags?.length

  // Move focus into the pop-up when it opens
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  const roundBtn =
    'grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title || 'Photo'}
      className="fixed inset-0 z-[60] overflow-y-auto bg-ink/75 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="grid min-h-full place-items-center px-4 py-16 sm:px-20">
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className={`${roundBtn} fixed right-4 top-4 z-10`}
        >
          <LuX size={22} />
        </button>

        {total > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onPrev()
              }}
              aria-label="Previous photo"
              className={`${roundBtn} fixed left-3 top-1/2 z-10 -translate-y-1/2`}
            >
              <LuChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNext()
              }}
              aria-label="Next photo"
              className={`${roundBtn} fixed right-3 top-1/2 z-10 -translate-y-1/2`}
            >
              <LuChevronRight size={24} />
            </button>
          </>
        )}

        <article
          onClick={(e) => e.stopPropagation()}
          className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-line bg-panel shadow-2xl lg:h-[min(80vh,640px)] lg:grid-cols-[1.25fr_1fr]"
        >
          {/* Photo, framed with breathing room */}
          <div className="grid place-items-center bg-tint p-4 sm:p-6">
            <img
              src={item.src}
              alt={item.title || 'Gallery photo'}
              className="max-h-[52vh] w-full rounded-2xl object-contain lg:max-h-full"
            />
          </div>

          {/* Story */}
          <div className="flex min-h-0 flex-col">
            <header className="flex items-center gap-3 px-6 pb-4 pt-6">
              <img
                src={profile.photo}
                alt=""
                className="h-12 w-12 rounded-full border border-line object-cover object-[50%_20%]"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-fg">{profile.name}</p>
                {item.location && (
                  <p className="flex items-center gap-1 truncate text-xs text-muted">
                    <LuMapPin size={12} className="shrink-0" />
                    {item.location}
                  </p>
                )}
              </div>
            </header>

            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 pb-6 pt-2">
              {item.title && <h2 className="font-serif text-3xl text-fg">{item.title}</h2>}
              {item.caption && (
                <p className="whitespace-pre-line text-sm leading-relaxed text-body">
                  {item.caption}
                </p>
              )}
              {item.tags && item.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <li key={t} className="rounded-full bg-brand/15 px-3 py-1 text-xs text-sky">
                      #{t}
                    </li>
                  ))}
                </ul>
              )}
              {!hasText && <p className="text-sm text-faint">No description yet.</p>}
            </div>

            <footer className="flex items-center justify-between gap-4 border-t border-line px-6 py-4 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                {date && (
                  <>
                    <LuCalendar size={13} />
                    {date}
                  </>
                )}
              </span>
              <span>
                {index + 1} / {total}
              </span>
            </footer>
          </div>
        </article>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null)
  const total = gallery.length

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % total)),
    [total],
  )
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + total) % total)),
    [total],
  )

  // Esc closes, arrow keys move; the page behind does not scroll while the pop-up is open
  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [active, close, next, prev])

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments"
        text="Select a photo to open it with its story, place and date."
      />
      <section className="mx-auto mt-14 grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((g, i) => {
          const date = formatDate(g.date)
          return (
            <Reveal key={g.src} delay={(i % 3) * 100} className={g.wide ? 'sm:col-span-2' : ''}>
              <button
                onClick={() => setActive(i)}
                aria-label={`Open ${g.title || 'photo'}`}
                className="group relative block w-full overflow-hidden rounded-2xl border border-line text-left"
              >
                <img
                  src={g.src}
                  alt={g.title || 'Gallery photo'}
                  loading="lazy"
                  className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                    g.wide ? 'aspect-[16/9]' : 'aspect-[3/4]'
                  }`}
                />
                {(g.title || date) && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-12 text-white opacity-100 transition md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                    {g.title && <p className="font-serif text-xl">{g.title}</p>}
                    {date && <p className="text-xs text-white/75">{date}</p>}
                  </div>
                )}
              </button>
            </Reveal>
          )
        })}
      </section>

      {active !== null && (
        <Post
          item={gallery[active]}
          index={active}
          total={total}
          onPrev={prev}
          onNext={next}
          onClose={close}
        />
      )}
    </>
  )
}
