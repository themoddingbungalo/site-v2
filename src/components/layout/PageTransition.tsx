import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useLocation, type Location } from 'react-router'
import styles from './PageTransition.module.css'

/** Must match the .out transition-duration in the CSS module. */
const FADE_OUT_MS = 160

const DisplayedLocation = createContext<Location | null>(null)

/**
 * The location the routes are currently rendering, which lags the router by one fade
 * while the outgoing page is still on screen. Anything that reacts to navigation by
 * touching the viewport — scrolling, chiefly — should follow this rather than
 * `useLocation`, so it happens under the blank frame instead of in plain sight.
 */
export function useDisplayedLocation() {
  return useContext(DisplayedLocation)
}

/**
 * Cross-fades the routed page: the outgoing one fades out, the route swaps while
 * nothing is visible, the new one fades in. Hash-only changes (the "on this page"
 * links) stay on the same page, so they never fade.
 */
export function PageTransition({ children }: { children: (location: Location) => ReactNode }) {
  const location = useLocation()
  const [displayed, setDisplayed] = useState(location)
  const [fading, setFading] = useState(false)

  const to = location.pathname + location.search
  const from = displayed.pathname + displayed.search

  useEffect(() => {
    if (to === from) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(location)
      return
    }
    setFading(true)
    const timer = window.setTimeout(() => {
      // One commit: the new page mounts at opacity 0 and then transitions up.
      setDisplayed(location)
      setFading(false)
    }, FADE_OUT_MS)
    return () => window.clearTimeout(timer)
  }, [to, from, location])

  return (
    <div className={`${styles.page} ${fading ? styles.out : styles.in}`}>
      <DisplayedLocation value={displayed}>{children(displayed)}</DisplayedLocation>
    </div>
  )
}
