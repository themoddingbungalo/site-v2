import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { guidePath, guideSections, guides } from '../../data/guides'
import { modlistPath, modlists, readmePath } from '../../data/modlists'
import { asset, ext, site } from '../../data/site'
import { team } from '../../data/team'
import { ChevronDownIcon, DiscordIcon, MenuIcon, SearchIcon } from '../ui/Icons'
import { useScrollLock } from '../ui/useScrollLock'
import styles from './SiteHeader.module.css'

type Menu = 'lists' | 'guides' | 'community' | null

interface SearchEntry { label: string; tag: string; to: string; external?: boolean }

function buildIndex(): SearchEntry[] {
  const out: SearchEntry[] = []
  for (const m of modlists) {
    out.push({ label: m.fullName === m.name ? m.name : m.fullName, tag: m.tagline, to: modlistPath(m.slug) })
    if (m.readme) out.push({ label: `${m.name} — Read Me`, tag: 'Read me', to: readmePath(m.slug) })
  }
  for (const g of guideSections) out.push({ label: g.label, tag: 'Guide', to: `/guides#${g.id}` })
  for (const g of guides) out.push({ label: `${g.title} (${g.listName})`, tag: 'Guide', to: guidePath(g.slug) })
  out.push({ label: 'The Bungalo team', tag: 'Community', to: '/community#team' })
  out.push({ label: 'Biggie Boss', tag: 'Community', to: '/community#biggie' })
  out.push({ label: 'The Modding Bordello', tag: 'Community', to: '/community#bordello' })
  for (const m of team) out.push({ label: m.name, tag: 'Team', to: '/community#team' })
  out.push({ label: 'Contribute to the Wiki', tag: 'GitHub', to: site.repo, external: true })
  out.push({ label: 'Join the Discord', tag: 'Discord', to: site.discord, external: true })
  return out
}

export function SiteHeader() {
  const [menu, setMenu] = useState<Menu>(null)
  const [drawer, setDrawer] = useState(false)
  const [search, setSearch] = useState(false)
  const [q, setQ] = useState('')
  const location = useLocation()
  const navRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchBtnRef = useRef<HTMLButtonElement>(null)
  const wasSearching = useRef(false)

  // The search overlay and the drawer both cover the page; hold it still underneath.
  useScrollLock(search || drawer)

  // Close everything on navigation.
  useEffect(() => { setMenu(null); setDrawer(false); setSearch(false) }, [location.pathname, location.hash])

  // Click outside closes dropdowns.
  useEffect(() => {
    if (!menu) return
    const onDoc = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      if (t?.closest?.('[data-menu]')) return
      setMenu(null)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [menu])

  // Escape closes; Ctrl/Cmd+K opens search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSearch(false); setDrawer(false); setMenu(null) }
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearch(true)
        setDrawer(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Opening the overlay moves focus to the field; closing it hands focus back to the
  // button that opened it, so a keyboard reader does not land at the top of the page.
  useEffect(() => {
    if (search) {
      setQ('')
      window.setTimeout(() => inputRef.current?.focus(), 0)
    } else if (wasSearching.current) {
      searchBtnRef.current?.focus()
    }
    wasSearching.current = search
  }, [search])

  const index = useMemo(buildIndex, [])
  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return null
    return index.filter((e) => (e.label + ' ' + e.tag).toLowerCase().includes(needle))
  }, [q, index])

  const toggle = (m: Exclude<Menu, null>) => setMenu((cur) => (cur === m ? null : m))

  return (
    <>
      <header className={styles.header}>
        <div className={styles.bar}>
          <Link to="/" className={styles.logoLink} aria-label="The Modding Bungalo home">
            <img src={asset('assets/themoddingbungalo-horizontal.svg')} alt="The Modding Bungalo" className={styles.logo} />
          </Link>

          <nav aria-label="Main" className={styles.desktopNav} ref={navRef}>
            <div data-menu className={styles.menu}>
              <button type="button" className={styles.menuBtn} aria-haspopup="true" aria-expanded={menu === 'lists'} onClick={() => toggle('lists')}>
                Modlists<ChevronDownIcon size={13} className={`${styles.caret} ${menu === 'lists' ? styles.caretOpen : ''}`} />
              </button>
              {menu === 'lists' && (
                <div className={styles.dropdown} style={{ minWidth: 258 }}>
                  {modlists.map((m) => (
                    <Link key={m.slug} to={modlistPath(m.slug)} className={styles.listItem}>
                      <span>{m.name}</span><span className={styles.listTag}>{m.gameShort}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div data-menu className={styles.menu}>
              <button type="button" className={styles.menuBtn} aria-haspopup="true" aria-expanded={menu === 'guides'} onClick={() => toggle('guides')}>
                Guides<ChevronDownIcon size={13} className={`${styles.caret} ${menu === 'guides' ? styles.caretOpen : ''}`} />
              </button>
              {menu === 'guides' && (
                <div className={styles.dropdown} style={{ minWidth: 300, padding: 10 }}>
                  {guideSections.map((g) => (
                    <Link key={g.id} to={`/guides#${g.id}`} className={styles.guideItem}>
                      {g.label}<span className={styles.guideSub}>{g.menuLabel}</span>
                    </Link>
                  ))}
                  <p className={styles.dropdownDivider}>Per list</p>
                  {guides.map((g) => (
                    <Link key={g.slug} to={guidePath(g.slug)} className={styles.guideItem}>
                      {g.title}<span className={styles.guideSub}>{g.menuLabel}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div data-menu className={styles.menu}>
              <button type="button" className={styles.menuBtn} aria-haspopup="true" aria-expanded={menu === 'community'} onClick={() => toggle('community')}>
                Community<ChevronDownIcon size={13} className={`${styles.caret} ${menu === 'community' ? styles.caretOpen : ''}`} />
              </button>
              {menu === 'community' && (
                <div className={styles.dropdown} style={{ minWidth: 232 }}>
                  <Link to="/community" className={styles.plainItem}>The Bungalo team</Link>
                  <Link to="/community#biggie" className={styles.plainItem}>Biggie Boss</Link>
                  <Link to="/community#bordello" className={styles.plainItem}>The Modding Bordello</Link>
                  <a href={site.repo} {...ext} className={styles.plainItem}>Contribute to the Wiki</a>
                </div>
              )}
            </div>
          </nav>

          <div className={styles.right}>
            <button type="button" aria-label="Menu" aria-expanded={drawer} className={`${styles.iconBtn} ${styles.mobileToggle}`} onClick={() => setDrawer((d) => !d)}>
              <MenuIcon />
            </button>
            <button type="button" aria-label="Search" ref={searchBtnRef} className={styles.iconBtn} onClick={() => { setSearch(true); setDrawer(false) }}>
              <SearchIcon />
            </button>
            <a href={site.discord} {...ext} className={styles.cta}>
              <DiscordIcon />
              <span className={styles.ctaLabel}>Join Discord</span>
            </a>
          </div>
        </div>

        {drawer && (
          <div className={styles.drawer}>
            <p className={styles.drawerTitle}>Modlists</p>
            <div className={styles.drawerGroup}>
              {modlists.map((m) => (
                <Link key={m.slug} to={modlistPath(m.slug)} className={styles.drawerLink}>{m.name}</Link>
              ))}
            </div>
            <p className={styles.drawerTitle}>Guides</p>
            <div className={styles.drawerGroup}>
              {guideSections.map((g) => (
                <Link key={g.id} to={`/guides#${g.id}`} className={styles.drawerLink}>{g.label}</Link>
              ))}
              {guides.map((g) => (
                <Link key={g.slug} to={guidePath(g.slug)} className={styles.drawerLink}>{g.title}</Link>
              ))}
            </div>
            <p className={styles.drawerTitle}>Community</p>
            <div className={styles.drawerGroup}>
              <Link to="/" className={styles.drawerLink}>Home</Link>
              <Link to="/community" className={styles.drawerLink}>The Bungalo team</Link>
              <Link to="/community#biggie" className={styles.drawerLink}>Biggie Boss</Link>
              <Link to="/community#bordello" className={styles.drawerLink}>The Modding Bordello</Link>
              <a href={site.repo} {...ext} className={styles.drawerLink}>Contribute to the Wiki</a>
            </div>
          </div>
        )}
      </header>

      {search && (
        <div
          className={styles.searchOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Search the site"
          onClick={(e) => { if (e.target === e.currentTarget) setSearch(false) }}
        >
          <div className={styles.searchBox}>
            <div className={styles.searchRow}>
              <SearchIcon size={24} stroke="#D9A03C" />
              <input
                ref={inputRef}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search guides, modlists, FAQs…"
                className={styles.searchInput}
                aria-label="Search the site"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <button type="button" className={styles.esc} onClick={() => setSearch(false)}>ESC</button>
            </div>
            <p className={styles.searchLabel}>{results ? (results.length ? 'Results' : 'No matches') : 'Modlists'}</p>
            <div className={styles.searchList}>
              {(results ?? index.filter((e) => modlists.some((m) => modlistPath(m.slug) === e.to))).map((e) =>
                e.external ? (
                  <a key={e.to + e.label} href={e.to} {...ext} className={styles.searchItem}>
                    <span className={styles.searchItemName}>{e.label}</span><span className={styles.searchItemTag}>{e.tag}</span>
                  </a>
                ) : (
                  <Link key={e.to + e.label} to={e.to} className={styles.searchItem}>
                    <span className={styles.searchItemName}>{e.label}</span><span className={styles.searchItemTag}>{e.tag}</span>
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
