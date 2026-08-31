import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ImageBroken, X } from '@phosphor-icons/react'
import { Reveal } from './Reveal'
import { gallery } from '../content'

type Status = 'loading' | 'ready' | 'failed'

function Frame({ index, onOpen }: { index: number; onOpen: (i: number) => void }) {
  const photo = gallery[index]
  const [status, setStatus] = useState<Status>('loading')

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-bone-50/5 bg-ink-900 text-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 active:translate-y-0 sm:mb-5"
    >
      {status === 'loading' && (
        <span className="shimmer relative block aspect-[4/5] w-full overflow-hidden bg-ink-850" aria-hidden />
      )}

      {status === 'failed' ? (
        <span className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 bg-ink-850 text-bone-600">
          <ImageBroken size={26} weight="light" />
          <span className="px-6 text-center text-xs">{photo.caption}</span>
        </span>
      ) : (
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('failed')}
          className={`w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${
            status === 'ready' ? 'opacity-100' : 'absolute inset-0 opacity-0'
          } brightness-[0.94] saturate-[0.88] group-hover:brightness-105 group-hover:saturate-100`}
        />
      )}

      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-transparent p-4 pt-14 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
        <span className="text-sm font-medium text-bone-50">{photo.caption}</span>
        {photo.year && <span className="font-mono text-[0.625rem] text-steel-300">{photo.year}</span>}
      </span>
    </button>
  )
}

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  const step = useCallback((dir: 1 | -1) => {
    setActive((cur) => (cur === null ? cur : (cur + dir + gallery.length) % gallery.length))
  }, [])

  useEffect(() => {
    if (active === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [active, step])

  return (
    <section id="gallery" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">03 — The archive</p>
            <h2 className="display mt-5 max-w-[16ch] text-[clamp(2rem,5.5vw,3.25rem)]">
              Fifteen years of <span className="text-steel-400">Sundays</span>
            </h2>
          </div>
          <p className="max-w-[42ch] text-sm leading-relaxed text-bone-600 sm:text-base">
            Photos from past runs, drives, and clubhouse nights. Click any frame to open it.
          </p>
        </div>
      </Reveal>

      {gallery.length === 0 ? (
        <div className="rule mt-12 flex flex-col items-start gap-5 py-16">
          <span
            aria-hidden
            className="grid size-14 place-items-center rounded-full border border-dashed border-bone-600/40 text-bone-600"
          >
            <ImageBroken size={20} weight="light" />
          </span>
          <div>
            <h3 className="display text-2xl text-bone-50">No photos posted yet</h3>
            <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-bone-400">
              Shots from the next run will land here. If you took some, send them to the clubhouse email.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-12 columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
          {gallery.map((photo, i) => (
            <Frame key={photo.src} index={i} onOpen={setActive} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={gallery[active].caption}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-md sm:p-10"
          >
            <motion.figure
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: 'spring', stiffness: 140, damping: 24 }}
              className="max-h-full w-full max-w-4xl overflow-hidden rounded-2xl"
            >
              <img
                src={gallery[active].src}
                alt={gallery[active].alt}
                className="max-h-[74dvh] w-full rounded-2xl object-contain"
              />
              <figcaption className="mt-4 flex items-center justify-between gap-4 px-1">
                <span className="text-sm text-bone-200">{gallery[active].caption}</span>
                <span className="shrink-0 font-mono text-xs text-bone-600">
                  {gallery[active].year ? `${gallery[active].year} · ` : ''}
                  {active + 1}/{gallery.length}
                </span>
              </figcaption>
            </motion.figure>

            <div
              className="glass fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full p-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => step(-1)}
                className="grid size-10 place-items-center rounded-full text-bone-200 transition-colors hover:bg-bone-50/10 active:scale-95"
              >
                <ArrowLeft size={17} weight="bold" />
              </button>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setActive(null)}
                className="grid size-10 place-items-center rounded-full text-bone-200 transition-colors hover:bg-bone-50/10 active:scale-95"
              >
                <X size={17} weight="bold" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => step(1)}
                className="grid size-10 place-items-center rounded-full text-bone-200 transition-colors hover:bg-bone-50/10 active:scale-95"
              >
                <ArrowRight size={17} weight="bold" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
