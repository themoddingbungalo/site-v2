import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { asset } from '../../data/site'
import styles from './Gallery.module.css'

export interface Shot {
  /** Full-size image under public/, shown in the lightbox. */
  src: string
  alt: string
  /** Smaller variant for the grid tile. Falls back to `src` when absent. */
  thumb?: string
  /** Span two columns in the grid. */
  wide?: boolean
  /** Double-size tile: two columns and two rows. */
  feature?: boolean
}

interface Props {
  shots: Shot[]
  /** Extra tile rendered alongside the shots (usually a YouTube embed). */
  extra?: ReactNode
  /** Put `extra` before the shots instead of after. */
  extraFirst?: boolean
  eyebrow?: string
  title?: string
  hint?: string
}

/** Screenshot grid with a click-to-enlarge lightbox. */
export function Gallery({ shots, extra, extraFirst, eyebrow = 'Showcase', title = 'In-game screenshots', hint = 'Click any shot to view it full size' }: Props) {
  const [index, setIndex] = useState<number | null>(null)
  const open = index === null ? null : shots[index]
  const closeRef = useRef<HTMLButtonElement>(null)
  const isOpen = index !== null

  const close = useCallback(() => setIndex(null), [])
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + shots.length) % shots.length)),
    [shots.length],
  )

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, close, step])

  // Hold the page still behind the overlay. Replacing the scrollbar with padding
  // keeps the layout from jumping as it disappears.
  useEffect(() => {
    if (index === null) return
    const { body } = document
    const gap = window.innerWidth - document.documentElement.clientWidth
    const prev = { overflow: body.style.overflow, padding: body.style.paddingRight }
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    return () => {
      body.style.overflow = prev.overflow
      body.style.paddingRight = prev.padding
    }
  }, [index])

  // Move focus into the overlay so Escape and the arrows work without a click first.
  // preventScroll matters: plain focus() would scroll the page behind the overlay.
  // Keyed on open/closed rather than on the index, so stepping through the shots
  // does not yank focus back off the arrow the reader is clicking.
  useEffect(() => {
    if (!isOpen) return
    closeRef.current?.focus({ preventScroll: true })
  }, [isOpen])

  // Warm the neighbours so the arrows feel instant; the full-size images are far
  // heavier than the thumbnails in the grid.
  useEffect(() => {
    if (index === null || shots.length < 2) return
    for (const d of [1, -1]) {
      const img = new Image()
      img.src = asset(shots[(index + d + shots.length) % shots.length].src)
    }
  }, [index, shots])

  return (
    <>
      <div className="section-head">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2">{title}</h2>
        </div>
        <p className="small-muted">{hint}</p>
      </div>
      <div className={styles.grid}>
        {extraFirst && extra}
        {shots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={`${styles.tile} ${s.wide ? styles.wide : ''} ${s.feature ? styles.feature : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`View ${s.alt} full size`}
          >
            <img src={asset(s.thumb ?? s.src)} alt={s.alt} loading="lazy" />
          </button>
        ))}
        {!extraFirst && extra}
      </div>
      {open &&
        index !== null &&
        createPortal(
          // Portalled to the body so no ancestor's stacking or overflow can clip it.
          <div className={styles.lightbox} onClick={close} role="dialog" aria-modal="true" aria-label={open.alt}>
            {/* Clicks inside the frame must not reach the backdrop's close handler. */}
            <div className={styles.frame} onClick={(e) => e.stopPropagation()}>
              <img src={asset(open.src)} alt={open.alt} />
            </div>

            <button type="button" className={styles.close} aria-label="Close" onClick={close} ref={closeRef}>
              <span aria-hidden="true">×</span>
            </button>

            {shots.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.nav} ${styles.prev}`}
                  aria-label="Previous screenshot"
                  onClick={(e) => { e.stopPropagation(); step(-1) }}
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <button
                  type="button"
                  className={`${styles.nav} ${styles.next}`}
                  aria-label="Next screenshot"
                  onClick={(e) => { e.stopPropagation(); step(1) }}
                >
                  <span aria-hidden="true">›</span>
                </button>
                <p className={styles.caption}>
                  <span>{open.alt}</span>
                  <span className={styles.count}>{index + 1} / {shots.length}</span>
                </p>
              </>
            )}
          </div>,
          document.body,
        )}
    </>
  )
}
