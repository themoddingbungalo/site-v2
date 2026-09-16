import { useEffect, useRef, useState } from 'react'
import styles from './SectionNav.module.css'

export interface SectionNavItem { id: string; label: string }

interface Props {
  items: SectionNavItem[]
  /** `strip`: sticky horizontal bar under the header. `side`: vertical list for a sidebar. */
  variant?: 'strip' | 'side'
  /** Title above the side variant. */
  title?: string
}

/**
 * "On this page" navigation with scroll-spy. The active item is the last section
 * whose top has scrolled past the line just under the sticky nav.
 */
export function SectionNav({ items, variant = 'strip', title = 'On this page' }: Props) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null)
  const navRef = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const side = variant === 'side'

  useEffect(() => {
    let queued = false
    const update = () => {
      queued = false
      const nav = navRef.current
      if (!nav || !items.length) return
      const line = (side ? 160 : nav.getBoundingClientRect().bottom) + 14
      let current: string | null = null
      for (const it of items) {
        const el = document.getElementById(it.id)
        if (el && el.getBoundingClientRect().top <= line) current = it.id
      }
      if (!current) current = items[0].id
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = items[items.length - 1].id
      setActive(current)
    }
    const onScroll = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items, side])

  // Keep the active link in view inside the scrollable strip / side list.
  useEffect(() => {
    const strip = stripRef.current
    if (!strip || !active) return
    const el = strip.querySelector<HTMLAnchorElement>(`a[data-id="${CSS.escape(active)}"]`)
    if (!el) return
    if (side) {
      if (strip.scrollHeight <= strip.clientHeight + 4) return
      const top = Math.max(0, Math.min(el.offsetTop - (strip.clientHeight - el.offsetHeight) / 2, strip.scrollHeight - strip.clientHeight))
      if (Math.abs(strip.scrollTop - top) > 6) strip.scrollTo({ top, behavior: 'smooth' })
    } else {
      if (strip.scrollWidth <= strip.clientWidth + 4) return
      const left = Math.max(0, Math.min(el.offsetLeft - (strip.clientWidth - el.offsetWidth) / 2, strip.scrollWidth - strip.clientWidth))
      if (Math.abs(strip.scrollLeft - left) > 6) strip.scrollTo({ left, behavior: 'smooth' })
    }
  }, [active, side])

  if (!items.length) return null

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    const offset = side ? 100 : 130
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
  }

  if (side) {
    return (
      <nav aria-label="On this page" className={styles.side} ref={navRef}>
        <p className={styles.sideTitle}>{title}</p>
        <div className={styles.sideScroll} ref={stripRef}>
          {items.map((it) => (
            <a key={it.id} href={`#${it.id}`} data-id={it.id} data-active={active === it.id || undefined} className={styles.sideLink} onClick={(e) => onClick(e, it.id)}>
              {it.label}
            </a>
          ))}
        </div>
      </nav>
    )
  }

  return (
    <nav aria-label="On this page" className={styles.strip} ref={navRef}>
      <div className={styles.stripScroll} ref={stripRef}>
        {items.map((it) => (
          <a key={it.id} href={`#${it.id}`} data-id={it.id} data-active={active === it.id || undefined} className={styles.stripLink} onClick={(e) => onClick(e, it.id)}>
            {it.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
