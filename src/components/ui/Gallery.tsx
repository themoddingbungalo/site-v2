import { useEffect, useState, type ReactNode } from 'react'
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
  const [open, setOpen] = useState<Shot | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

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
        {shots.map((s) => (
          <button
            key={s.src}
            type="button"
            className={`${styles.tile} ${s.wide ? styles.wide : ''} ${s.feature ? styles.feature : ''}`}
            onClick={() => setOpen(s)}
            aria-label={`View ${s.alt} full size`}
          >
            <img src={asset(s.thumb ?? s.src)} alt={s.alt} loading="lazy" />
          </button>
        ))}
        {!extraFirst && extra}
      </div>
      {open && (
        <div className={styles.lightbox} onClick={() => setOpen(null)} role="dialog" aria-label={open.alt}>
          <img src={asset(open.src)} alt={open.alt} />
          <button type="button" className={styles.close} aria-label="Close" onClick={() => setOpen(null)}>×</button>
        </div>
      )}
    </>
  )
}
