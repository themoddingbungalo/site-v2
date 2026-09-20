import { useRef } from 'react'
import { Link } from 'react-router'
import { useTitle } from '../components/layout/ScrollManager'
import { BordelloPanel } from '../components/ui/BordelloPanel'
import { DiscordIcon, PlayIcon, SteamIcon, StrokeIcon } from '../components/ui/Icons'
import { useParallax, useReveal } from '../components/ui/useReveal'
import { guideSections, type GuideSectionId } from '../data/guides'
import { modlistPath, modlists } from '../data/modlists'
import { asset, ext, pageTitle, site } from '../data/site'
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
    mark: <img src={asset('assets/wabbajack-mark.png')} alt="" />,
    text: (
      <>
        Grab the latest release, drop it in a folder like <span className="mono">C:\Games\Wabbajack</span> — never Program Files or Downloads.
      </>
    ),
  },
  {
    title: 'Prep your game',
    mark: <SteamIcon size={30} />,
    text: 'Fresh English Steam install outside Program Files, auto-updates off, Creation Kit installed and run once. Do not verify files.',
  },
  {
    title: 'Pick a list and press play',
    mark: <PlayIcon size={26} fill="currentColor" />,
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
          <h1 data-reveal className={styles.heroTitle}>The Modding<br />Bungalo</h1>
          <p data-reveal className={styles.heroBlurb}>
            Curated Wabbajack modlists, install guides and modding documentation — built and maintained by the community.
          </p>
          <div data-reveal className={styles.heroActions}>
            <a
              href={site.discord} {...ext}
              className={`btn btn--gold ${styles.heroBtn} ${styles.heroBtnGold}`}
            >
              <DiscordIcon size={20} />
              Join the Discord
            </a>
            <Link to="/#start" className={`btn btn--ghost ${styles.heroBtn}`}>Learn more</Link>
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

      {/* The four dark sections share one field of light — see .lit in the stylesheet.
          It has to be one element spanning all of them: a glow per section would die
          at every boundary and leave a dark seam between each pair. */}
      <div className={styles.lit}>
        {/* ---- start here -------------------------------------------------- */}
        <section id="start">
          <div className={`container ${styles.startInner}`}>
            <div data-reveal className={styles.startHead}>
              <div className={styles.startHeadText}>
                <p className="eyebrow">Start here</p>
                <h2 className="h2 h2--lg">Never modded before?</h2>
                <p className={styles.headText}>
                  Wabbajack automates the whole thing. Three steps and you are playing a fully modded game — no manual load orders, no guesswork.
                </p>
              </div>
            </div>
            <ol role="list" className={styles.startGrid}>
              {startSteps.map((s, i) => (
                <li key={s.title} data-reveal className={styles.startStep}>
                  <div className={styles.startTop}>
                    <span className={styles.startNum} aria-hidden="true">{i + 1}</span>
                    <span className={styles.startMark} aria-hidden="true">{s.mark}</span>
                  </div>
                  <h3 className={styles.startTitle}>{s.title}</h3>
                  <p className={styles.startText}>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---- every list we host ------------------------------------------ */}
        <section id="modlists">
          <div className={`container ${styles.modlistsInner}`}>
            <div data-reveal className={styles.sectionHead}>
              <p className="eyebrow">Wabbajack lists</p>
              <h2 className="h2 h2--lg">Every list we host</h2>
              <p className={`${styles.headText} ${styles.headTextWide}`}>
                Curated by modders in the Bungalo, installable in a few clicks. Each list has its own read me, FAQ and support channel.
              </p>
            </div>
            <ul role="list" className={styles.modlistGrid}>
              {modlists.map((m) => (
                <li key={m.slug} data-reveal>
                  <Link to={modlistPath(m.slug)} className={styles.plate}>
                    <div className={styles.plateStage}>
                      <img src={asset(m.cover)} alt="" className={styles.plateArt} loading="lazy" />
                      {m.badge && <span className={styles.plateBadge}>{m.badge}</span>}
                    </div>
                    <div className={styles.plateBody}>
                      <div className={styles.plateHead}>
                        <h3 className={styles.plateTitle}>{m.name}</h3>
                        <span className={styles.plateSize}>{m.size}</span>
                      </div>
                      <p className={styles.plateText}>{m.blurb}</p>
                      <div className={styles.plateMeta}>
                        <span>{m.game}</span>
                        <span>by {m.author}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---- build your own list ----------------------------------------- */}
        <section id="guides">
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

        {/* ---- the community ----------------------------------------------- */}
        <section id="community" className={`container ${styles.communitySection}`}>
          <div data-reveal className={styles.startHead}>
            <div className={styles.startHeadText}>
              <p className="eyebrow">Community</p>
              <h2 className="h2 h2--lg">The people behind the lists</h2>
              <p className={styles.headText}>
                Every list here is made and supported by someone in the Discord. Meet the founder, the team and the
                server next door.
              </p>
            </div>
            <Link to="/community" className="btn btn--gold btn--sm">Meet the community →</Link>
          </div>
          <div className={styles.communityGrid}>
            <Link data-reveal to="/community#biggie" className={`${styles.communityCard} ${styles.communityBiggie}`}>
              <p className={`${styles.communityEyebrow} ${styles.biggieEyebrow}`}>Founder</p>
              <h3 className={styles.communityTitle}>Biggie Boss</h3>
              <p className={styles.communityText}>Modder, YouTuber and streamer. Released LoreRim after building it live on stream.</p>
            </Link>
            <Link data-reveal to="/community#team" className={styles.communityCard}>
              <p className={styles.communityEyebrow}>The roster</p>
              <h3 className={styles.communityTitle}>The Bungalo team</h3>
              <p className={styles.communityText}>List authors, patchers and the people keeping the wiki upright.</p>
            </Link>
            <BordelloPanel className={styles.communityWide} headingLevel={3} />
          </div>
        </section>
      </div>

      {/* ---- join the Bungalo -------------------------------------------- */}
      <section className={styles.cta}>
        <div className={styles.ctaBg}>
          <img src={asset('assets/heroes/whiterun-guards.webp')} alt="" className={styles.ctaImg} />
        </div>
        <div className={styles.ctaScrim} />
        <div data-reveal className={styles.ctaInner}>
          <img src={asset('assets/themoddingbungalo-vertical.svg')} alt="The Modding Bungalo" className={styles.ctaLogo} />
          <h2 className={styles.ctaTitle}>Join the Bungalo</h2>
          <p className={styles.ctaText}>
            Support channels for every list, modding help from the people who built them, and a community that keeps modding free.
          </p>
          <a href={site.discord} {...ext} className={`btn btn--gold btn--lg ${styles.ctaBtn}`}>
            <DiscordIcon size={21} />
            Join the Discord
          </a>
        </div>
      </section>
    </div>
  )
}
