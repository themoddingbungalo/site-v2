import { useRef } from 'react'
import { Link } from 'react-router'
import { SiteFooterWide } from '../components/layout/SiteFooter'
import { useTitle } from '../components/layout/ScrollManager'
import { DiscordIcon, DownloadIcon, KofiIcon, StrokeIcon, YouTubeIcon } from '../components/ui/Icons'
import { useParallax, useReveal } from '../components/ui/useReveal'
import { guideSections, type GuideSectionId } from '../data/guides'
import { modlistPath, modlists } from '../data/modlists'
import { asset, pageTitle, site } from '../data/site'
import styles from './Home.module.css'

const stats = [
  { value: '6', label: 'Hosted modlists' },
  { value: '2', label: 'Games covered' },
  { value: '12', label: 'Modding guides' },
]

const guideBlurbs: Record<GuideSectionId, string> = {
  wabbajack: 'Install the tool correctly once and every list afterwards just works.',
  'create-modlist': 'From an empty Mod Organizer profile to a list other people can install.',
  lodgen: 'xLODGen, grass cache and DynDOLOD in the right order, with the right settings.',
  xedit: 'Make a patch, merge leveled lists, remove masters without breaking saves.',
  'creation-kit': 'Fix any landscape seam — the Northern Roads problem, solved properly.',
}

const guideIcons: Record<GuideSectionId, React.ReactNode> = {
  wabbajack: (
    <StrokeIcon>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </StrokeIcon>
  ),
  'create-modlist': (
    <StrokeIcon>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
      <path d="M14 2v6h6" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </StrokeIcon>
  ),
  lodgen: (
    <StrokeIcon>
      <path d="m2 20 5-14 5 8 3-4 7 10H2Z" />
      <circle cx="17" cy="5" r="2" />
    </StrokeIcon>
  ),
  xedit: (
    <StrokeIcon>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
    </StrokeIcon>
  ),
  'creation-kit': (
    <StrokeIcon>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </StrokeIcon>
  ),
}

const startSteps = [
  {
    title: 'Install Wabbajack',
    icon: <DownloadIcon size={22} stroke="#D9A03C" />,
    text: (
      <>
        Grab the latest release, drop it in a folder like <span className="mono">C:\Games\Wabbajack</span> — never Program Files or Downloads.
      </>
    ),
  },
  {
    title: 'Prep your game',
    icon: (
      <StrokeIcon size={22}>
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </StrokeIcon>
    ),
    text: 'Fresh English Steam install outside Program Files, auto-updates off, Creation Kit installed and run once. Do not verify files.',
  },
  {
    title: 'Pick a list and press play',
    icon: (
      <StrokeIcon size={22}>
        <polygon points="5 3 19 12 5 21 5 3" />
      </StrokeIcon>
    ),
    text: 'Browse modlists in Wabbajack, set an install folder, hit play. Then go pet your nearest fluffy animal while it downloads.',
  },
]

export function Home() {
  useTitle(pageTitle())
  const rootRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLImageElement>(null)
  useReveal(rootRef)
  useParallax(heroImgRef)

  return (
    <div ref={rootRef}>
      {/* ---- hero -------------------------------------------------------- */}
      <section id="top" className={styles.hero}>
        <div className={styles.heroBg}>
          <img ref={heroImgRef} src={asset('assets/heroes/lorerim-gate.webp')} alt="" className={styles.heroImg} />
        </div>
        <div className={styles.heroRadial} />
        <div className={styles.heroLinear} />
        <div className={styles.heroInner}>
          <p data-reveal className={styles.heroEyebrow}>Community-run since 2024</p>
          <h1 data-reveal className={styles.heroTitle}>The Modding<br />Bungalo</h1>
          <p data-reveal className={styles.heroBlurb}>
            Curated Wabbajack modlists, install guides and modding documentation — built and maintained by the community.
          </p>
          <div data-reveal className={styles.heroActions}>
            <Link to="/#modlists" className={`btn btn--gold ${styles.heroBtn} ${styles.heroBtnGold}`}>Browse the modlists</Link>
            <Link to="/#start" className={`btn btn--ghost ${styles.heroBtn}`}>New to modding?</Link>
          </div>
          <div data-reveal className={styles.stats}>
            {stats.map((s) => (
              <div key={s.label}>
                <div className={styles.statNum}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- start here -------------------------------------------------- */}
      <section id="start" className={`container ${styles.startSection}`}>
        <div data-reveal className={styles.startHead}>
          <div className={styles.startHeadText}>
            <p className="eyebrow">Start here</p>
            <h2 className="h2 h2--lg">Never modded before?</h2>
            <p className={styles.headText}>
              Wabbajack automates the whole thing. Three steps and you are playing a fully modded game — no manual load orders, no guesswork.
            </p>
          </div>
          <Link to="/guides" className="btn btn--gold-line">All guides →</Link>
        </div>
        <div className={styles.startGrid}>
          {startSteps.map((s, i) => (
            <div key={s.title} data-reveal className={styles.startCard}>
              <div className={styles.startNum}>{i + 1}</div>
              <div className={styles.startIcon}>{s.icon}</div>
              <h3 className={styles.startTitle}>{s.title}</h3>
              <p className={styles.startText}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- LoreRim spotlight ------------------------------------------- */}
      <section className={`container ${styles.spotSection}`}>
        <div data-reveal className={`${styles.split} ${styles.spot}`}>
          <div className={`${styles.media} ${styles.spotMedia}`}>
            <img src={asset('assets/logos/LoreRim-cover.webp')} alt="LoreRim" className={styles.mediaImg} />
            <div className={`${styles.mediaScrim} ${styles.spotScrim}`} />
          </div>
          <div className={styles.spotBody}>
            <div className={styles.spotBadge}>
              <span className={styles.spotDot} />
              <span className={styles.spotBadgeText}>Most popular</span>
            </div>
            <h2 className={styles.spotTitle}>LoreRim</h2>
            <p className={styles.spotMeta}>Skyrim SE · by biggie_boss</p>
            <p className={styles.spotText}>
              Skyrim as a modern action RPG with roleplaying put back in — EnaiRim, Requiem and hundreds of custom addons and patches. Cities are bigger. Forests are lush. Enemies from previous games return. This is Skyrim in 2026.
            </p>
            <div className={styles.actions}>
              <a href={site.lorerim} target="_blank" rel="noopener" className="btn btn--gold btn--sm">Visit lorerim.com</a>
              <Link to={`${modlistPath('lorerim')}#trailer`} className="btn btn--outline btn--sm">Watch the trailer</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---- every list we host ------------------------------------------ */}
      <section id="modlists" className={`container ${styles.modlistsSection}`}>
        <div data-reveal className={styles.sectionHead}>
          <p className="eyebrow">Wabbajack lists</p>
          <h2 className="h2 h2--lg">Every list we host</h2>
          <p className={`${styles.headText} ${styles.headTextWide}`}>
            Curated by modders in the Bungalo, installable in a few clicks. Each list has its own read me, FAQ and support channel.
          </p>
        </div>
        <div className={styles.modlistGrid}>
          {modlists.map((m) => (
            <Link
              key={m.slug}
              data-reveal
              to={modlistPath(m.slug)}
              className={`${styles.card} ${m.slug === 'ngvo' ? styles.cardGold : ''}`}
            >
              <div className={styles.cardMedia}>
                <img
                  src={asset(m.cover)}
                  alt=""
                  className={`${styles.cardImg} ${m.coverContain ? styles.cardImgContain : ''}`}
                  loading="lazy"
                />
                <span className={styles.cardChip}>{m.game}</span>
                {m.badge && <span className={styles.cardBadge}>{m.badge}</span>}
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{m.name}</h3>
                <p className={styles.cardText}>{m.blurb}</p>
                <div className={styles.cardFoot}>
                  <span className={styles.cardAuthor}>by {m.author}</span>
                  <span className={styles.cardSize}>{m.size}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---- build your own list ----------------------------------------- */}
      <section id="guides" className={styles.guidesSection}>
        <div className={`container ${styles.guidesInner}`}>
          <div data-reveal className={styles.sectionHead}>
            <p className="eyebrow">Documentation</p>
            <h2 className="h2 h2--lg">Build your own list</h2>
            <p className={`${styles.headText} ${styles.headTextWide}`}>
              The perfect list that has exactly what you want is the one you build yourself. Start from NGVO as a base, then follow the guides.
            </p>
          </div>
          <div className={styles.guideGrid}>
            {guideSections.map((g) => (
              <Link key={g.id} data-reveal to={`/guides#${g.id}`} className={styles.guideCard}>
                <div className={styles.guideIcon}>{guideIcons[g.id]}</div>
                <div>
                  <h3 className={styles.guideTitle}>{g.label}</h3>
                  <p className={styles.guideText}>{guideBlurbs[g.id]}</p>
                </div>
              </Link>
            ))}
            <Link data-reveal to={modlistPath('ngvo')} className={`${styles.guideCard} ${styles.guideCardGold}`}>
              <div className={`${styles.guideIcon} ${styles.guideIconGold}`}>
                <StrokeIcon stroke="#F0C070">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </StrokeIcon>
              </div>
              <div>
                <h3 className={styles.guideTitle}>Start from NGVO</h3>
                <p className={`${styles.guideText} ${styles.guideTextGold}`}>
                  Read the full NGVO documentation — system specs, install walkthrough and FAQs.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Biggie Boss ------------------------------------------------- */}
      <section id="biggie" className={`container ${styles.biggieSection}`}>
        <div data-reveal className={`${styles.split} ${styles.biggie}`}>
          <div className={styles.media}>
            <img src={asset('assets/biggie-boss.png')} alt="Biggie Boss" className={styles.mediaImg} />
            <div className={`${styles.mediaScrim} ${styles.biggieScrim}`} />
          </div>
          <div className={styles.panelBody}>
            <p className={`${styles.panelEyebrow} ${styles.biggieEyebrow}`}>Founder</p>
            <h2 className={styles.panelTitle}>Biggie Boss</h2>
            <p className={`${styles.panelText} ${styles.biggieText}`}>
              Modder, YouTuber and streamer. &ldquo;The #1 Modlist Enthusiast. I hate vanilla.&rdquo; Released LoreRim in early 2024 after building it live on stream.
            </p>
            <div className={styles.panelActions}>
              <a href={site.biggie.youtube} target="_blank" rel="noopener" className={`${styles.brandBtn} ${styles.ytBtn}`}>
                <YouTubeIcon size={17} />YouTube
              </a>
              <a href={site.biggie.kofi} target="_blank" rel="noopener" className={`${styles.brandBtn} ${styles.kofiBtn}`}>
                <KofiIcon size={17} />Ko-fi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- The Modding Bordello ---------------------------------------- */}
      <section id="bordello" className={`container ${styles.bordelloSection}`}>
        <div data-reveal className={`${styles.split} ${styles.bordello}`}>
          <div className={`${styles.panelBody} ${styles.bordelloBody}`}>
            <p className={`${styles.panelEyebrow} ${styles.bordelloEyebrow}`}>Sister server</p>
            <h2 className={styles.panelTitle}>The Modding Bordello</h2>
            <p className={`${styles.panelText} ${styles.bordelloText}`}>
              The Bungalo is rated R, not XXX. Schtevie&rsquo;s server hosts the NSFW modlists so this one stays safe for work &mdash; head there for adult content and support.
            </p>
            <div className={styles.panelActions}>
              <a href={site.bordello.discord} target="_blank" rel="noopener" className={`${styles.brandBtn} ${styles.bordelloBtn}`}>Join the Bordello</a>
              <a href={site.bordello.site} target="_blank" rel="noopener" className={`${styles.brandBtn} ${styles.bordelloOutline}`}>Visit their site</a>
            </div>
          </div>
          <div className={`${styles.media} ${styles.bordelloMedia}`}>
            <img src={asset('assets/themoddingbordello.webp')} alt="The Modding Bordello" className={styles.mediaImg} />
            <div className={`${styles.mediaScrim} ${styles.bordelloScrim}`} />
          </div>
        </div>
      </section>

      {/* ---- join the Bungalo -------------------------------------------- */}
      <section className={styles.cta}>
        <div className={styles.ctaBg}>
          <img src={asset('assets/heroes/partysnax.webp')} alt="" className={styles.ctaImg} />
        </div>
        <div className={styles.ctaScrim} />
        <div data-reveal className={styles.ctaInner}>
          <img src={asset('assets/themoddingbungalo-vertical.svg')} alt="The Modding Bungalo" className={styles.ctaLogo} />
          <h2 className={styles.ctaTitle}>Join the Bungalo</h2>
          <p className={styles.ctaText}>
            Support channels for every list, modding help from the people who built them, and a community that keeps modding free.
          </p>
          <a href={site.discord} target="_blank" rel="noopener" className={`btn btn--gold btn--lg ${styles.ctaBtn}`}>
            <DiscordIcon size={21} />
            Join the Discord
          </a>
        </div>
      </section>

      <SiteFooterWide />
    </div>
  )
}
