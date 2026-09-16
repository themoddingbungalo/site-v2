import { Link } from 'react-router'
import { useTitle } from '../../components/layout/ScrollManager'
import { DiscordIcon, StrokeIcon } from '../../components/ui/Icons'
import { ModlistHero } from '../../components/ui/ModlistHero'
import { SectionNav } from '../../components/ui/SectionNav'
import { FeatureCard } from '../../components/ui/Steps'
import { YouTubeEmbed } from '../../components/ui/YouTubeEmbed'
import { asset, pageTitle, site } from '../../data/site'
import styles from './LoreRim.module.css'

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'trailer', label: 'Trailer' },
  { id: 'features', label: "What's overhauled" },
  { id: 'docs', label: 'Documentation' },
  { id: 'support', label: 'Support' },
]

const glance: { key: string; value: React.ReactNode }[] = [
  { key: 'Game', value: 'Skyrim Special Edition' },
  { key: 'Author', value: 'biggie_boss' },
  { key: 'Gameplay base', value: 'Requiem + EnaiRim' },
  { key: 'Released', value: 'Early 2024' },
  {
    key: 'Documentation',
    value: <a href={site.lorerim} target="_blank" rel="noopener" className={styles.glanceLink}>lorerim.com</a>,
  },
]

const features = [
  {
    title: 'Modern action combat',
    text: 'Skyrim plays like a current-generation action game — movement, animation and impact all brought up to date.',
    icon: (
      <StrokeIcon>
        <path d="M14.5 17.5 3 6V3h3l11.5 11.5" />
        <path d="m13 19 6-6" />
        <path d="m16 16 4 4" />
      </StrokeIcon>
    ),
  },
  {
    title: 'Roleplaying restored',
    text: 'Requiem and EnaiRim reintroduce real mechanical consequence to how you build and play your character.',
    icon: (
      <StrokeIcon>
        <path d="M12 2 2 7l10 5 10-5-10-5Z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </StrokeIcon>
    ),
  },
  {
    title: 'Bigger cities, lusher forests',
    text: 'The world itself has been rebuilt at scale — settlements feel inhabited and the wilds feel genuinely wild.',
    icon: (
      <StrokeIcon>
        <path d="M3 21h18" />
        <path d="M5 21V8l7-5 7 5v13" />
        <path d="M10 21v-6h4v6" />
      </StrokeIcon>
    ),
  },
  {
    title: 'Returning enemies and places',
    text: 'Enemies and areas from earlier Elder Scrolls games are reintroduced, integrated rather than bolted on.',
    icon: (
      <StrokeIcon>
        <path d="M12 2a7 7 0 0 0-7 7c0 3 2 5 2 7h10c0-2 2-4 2-7a7 7 0 0 0-7-7Z" />
        <path d="M9 21h6" />
      </StrokeIcon>
    ),
  },
]

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z" />
    </svg>
  )
}

export function LoreRim() {
  useTitle(pageTitle('LoreRim'))

  return (
    <>
      <ModlistHero
        image="assets/heroes/lorerim-gate.webp"
        position="center 42%"
        logo="assets/logos/LoreRim.webp"
        logoAlt="LoreRim"
        title="This is Skyrim in 2026"
        blurb="A modern action game that also puts roleplaying back in — EnaiRim, Requiem and hundreds of custom addons and patches, so every single aspect of the game has been overhauled. Cities are bigger. Forests are lush. Enemies and areas from previous games return."
        chips={[
          { label: 'Latest Skyrim SE' },
          { label: 'by biggie_boss' },
          { label: 'Flagship list', gold: true },
          { label: 'EnaiRim + Requiem' },
        ]}
      >
        <a href={site.lorerim} target="_blank" rel="noopener" className="btn btn--gold btn--glow">
          <GlobeIcon />
          Visit lorerim.com
        </a>
        <Link to="#trailer" className="btn btn--ghost">Watch the trailer</Link>
        <a href={site.discord} target="_blank" rel="noopener" className="btn btn--ghost">Support</a>
      </ModlistHero>

      <SectionNav items={navItems} />

      <div className="container">
        <section id="overview" className={styles.overview}>
          <div className="grid grid--2">
            <div>
              <p className="eyebrow">Overview</p>
              <h2 className={`h2 ${styles.overviewTitle}`}>Every aspect, overhauled</h2>
              <p className={styles.para}>
                LoreRim was built to turn Skyrim into both a modern action game and a genuine roleplaying one, by integrating many of EnaiSiaion's EnaiRim mods, Requiem – The Roleplaying Overhaul, and hundreds of custom addons and patches on top.
              </p>
              <p className={styles.para}>
                Biggie Boss released it in early 2024, having built it live across multiple streams after testing dozens of other people's lists first.
              </p>
            </div>
            <div className={styles.glance}>
              <p className={styles.glanceLabel}>At a glance</p>
              <div className={styles.glanceRows}>
                {glance.map((row) => (
                  <div key={row.key} className={styles.glanceRow}>
                    <span className={styles.glanceKey}>{row.key}</span>
                    {typeof row.value === 'string' ? <span className={styles.glanceVal}>{row.value}</span> : row.value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="trailer" className={styles.trailer}>
          <h2 className={`h2 ${styles.trailerTitle}`}>Trailer</h2>
          <YouTubeEmbed id="9T50lRVFAmE" title="LoreRim trailer" />
        </section>

        <section id="features" className="section">
          <h2 className={`h2 ${styles.featuresTitle}`}>What's overhauled</h2>
          <div className="grid grid--cards">
            {features.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title}>{f.text}</FeatureCard>
            ))}
          </div>
        </section>

        <section id="docs" className="section">
          <div className={styles.docs}>
            <div className={styles.docsMedia}>
              <img src={asset('assets/logos/LoreRim-cover.webp')} alt="LoreRim" className={styles.docsImg} />
              <div className={styles.docsScrim} />
            </div>
            <div className={styles.docsBody}>
              <p className="eyebrow">Documentation</p>
              <h2 className={styles.docsTitle}>LoreRim has its own site</h2>
              <p className={styles.docsText}>
                Install instructions, system requirements, mechanics documentation and the changelog all live on lorerim.com — it is the authoritative source and is kept current with each release.
              </p>
              <div className={styles.docsActions}>
                <a href={site.lorerim} target="_blank" rel="noopener" className="btn btn--gold btn--sm">Read the docs</a>
                <a href={site.biggie.youtube} target="_blank" rel="noopener" className="btn btn--outline btn--sm">Dev streams</a>
              </div>
            </div>
          </div>
        </section>

        <section id="support" className={styles.support}>
          <div className={styles.supportPanel}>
            <h2 className={styles.supportTitle}>Support lives in the Bungalo</h2>
            <p className={styles.supportText}>
              Install help, release pings and build advice from the people who made it — plus everyone else playing the same list.
            </p>
            <div className={styles.supportActions}>
              <a href={site.discord} target="_blank" rel="noopener" className={`btn btn--gold ${styles.supportBtn}`}>
                <DiscordIcon size={19} />
                Join the Discord
              </a>
              <a href={site.biggie.kofi} target="_blank" rel="noopener" className={`btn btn--outline ${styles.supportBtn}`}>Support on Ko-fi</a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
