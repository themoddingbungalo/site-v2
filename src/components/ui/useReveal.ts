import { useEffect, type RefObject } from 'react'
import './reveal.css'

/**
 * Fade-and-rise every `[data-reveal]` element inside `root` as it scrolls into view.
 * Elements get `data-shown` once revealed; the CSS lives in reveal.css. Respects
 * prefers-reduced-motion (everything is simply shown).
 */
export function useReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current
    if (!el) return
    const nodes = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.setAttribute('data-shown', ''))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          ;(e.target as HTMLElement).setAttribute('data-shown', '')
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [root])
}

/** Subtle parallax on a hero image while the top of the page is in view. */
export function useParallax(img: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = img.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onScroll = () => {
      const y = window.scrollY
      if (y > window.innerHeight * 1.2) return
      el.style.transform = `translate3d(0,${(y * 0.16).toFixed(2)}px,0) scale(1.02)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [img])
}
