import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** Offset for the fixed header plus the sticky "on this page" strip. */
const HASH_OFFSET = 130

/**
 * On navigation: scroll to the hash target if there is one, otherwise to the top.
 * Content may render a tick later (lazy markdown), so hash scrolling retries briefly.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    let attempts = 0
    let timer = 0
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - HASH_OFFSET
        window.scrollTo({ top, behavior: 'smooth' })
        return
      }
      if (attempts++ < 20) timer = window.setTimeout(tryScroll, 60)
    }
    tryScroll()
    return () => window.clearTimeout(timer)
  }, [pathname, hash, key])

  return null
}

/** Set document.title for the current page. */
export function useTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
