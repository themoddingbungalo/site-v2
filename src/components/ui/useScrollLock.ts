import { useEffect } from 'react'

/**
 * Freezes the page behind a full-screen overlay (lightbox, player, search, drawer)
 * while `locked` is true. The page keeps its scroll position, and the width the
 * vanishing scrollbar frees up is padded back onto the body so nothing shifts
 * sideways as the overlay opens.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const { body } = document
    const gap = window.innerWidth - document.documentElement.clientWidth
    const prev = { overflow: body.style.overflow, padding: body.style.paddingRight }
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    return () => {
      body.style.overflow = prev.overflow
      body.style.paddingRight = prev.padding
    }
  }, [locked])
}
