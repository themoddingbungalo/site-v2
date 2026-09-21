import { Link } from 'react-router'
import { useTitle } from '../../components/layout/ScrollManager'
import { DiscordBand } from '../../components/ui/DiscordBand'
import { DiscordIcon, StrokeIcon } from '../../components/ui/Icons'
import { ModlistHero } from '../../components/ui/ModlistHero'
import { SectionNav } from '../../components/ui/SectionNav'
import { KeyRows, type KeyRow } from '../../components/ui/Tile'
import { YouTubeEmbed } from '../../components/ui/YouTubeEmbed'
import { asset, ext, pageTitle, site } from '../../data/site'
import styles from './LoreRim.module.css'

const NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'trailer', label: 'Trailer' },
  { id: 'docs', label: 'Documentation' },
  { id: 'support', label: 'Support' },
]

const GLANCE: KeyRow[] = [
  { key: 'Game', value: 'Skyrim Special Edition' },
  { key: 'Author', value: 'biggie_boss' },
  { key: 'Gameplay base', value: 'Requiem + EnaiRim' },
  { key: 'Released', value: 'Early 2024' },
  { key: 'Documentation', value: <a href={site.lorerim} {...ext}>lorerim.com</a> },
]

function GlobeIcon() {
  return (
    <StrokeIcon size={18} stroke="currentColor">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z" />
    </StrokeIcon>
  )
}

export function LoreRim() {
  useTitle(pageTitle('LoreRim'))

  return (
    <>
      <ModlistHero
        image="assets/heroes/lorerim-cover.webp"
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
        <a href={site.lorerim} {...ext} className="btn btn--gold btn--glow">
          <GlobeIcon />
          Visit lorerim.com
        </a>
        <Link to="#trailer" className="btn btn--ghost">Watch the trailer</Link>
        <a href={site.discord} {...ext} className="btn btn--ghost">Support</a>
      </ModlistHero>

      <SectionNav items={NAV} />

      {/* The body sections share one field of light — the same wash the home page runs
          behind its dark run. It stops before the documentation band, which carries its
          own art and needs no help from it. */}
      <div className="lit">
        <div className="container">
          <section id="overview" className="section--intro">
            <div className="grid grid--2">
              <div className="flow">
                <p className="eyebrow">Overview</p>
                <h2 className="h2 head--loose">Every aspect, overhauled</h2>
                <p className="lead">
                  LoreRim was built to turn Skyrim into both a modern action game and a genuine roleplaying one, by
                  integrating many of EnaiSiaion's EnaiRim mods, Requiem – The Roleplaying Overhaul, and hundreds of
                  custom addons and patches on top.
                </p>
                <p className="lead">
                  Biggie Boss released it in early 2024, having built it live across multiple streams after testing
                  dozens of other people's lists first.
                </p>
              </div>
              <div className="card">
                <p className={`label label--gold ${styles.glanceLabel}`}>At a glance</p>
                <KeyRows rows={GLANCE} />
              </div>
            </div>
          </section>

          <section id="trailer" className="section--tight">
            <h2 className="h2 head--gap">Trailer</h2>
            <YouTubeEmbed id="9T50lRVFAmE" title="LoreRim trailer" />
          </section>
        </div>
      </div>

      {/* Full-bleed rather than a card: the docs live somewhere else, and the band is
          the page handing the reader over. Same construction as the home page's join
          band, but left-aligned like the hero so the copy clears the moon. */}
      <section id="docs" className={styles.docs}>
        <div className={styles.docsBg}>
          <img src={asset('assets/heroes/alduin.webp')} alt="" loading="lazy" className={styles.docsImg} />
        </div>
        <div className={styles.docsScrim} />
        <div className={`container ${styles.docsInner}`}>
          <div className={styles.docsCopy}>
            <p className="eyebrow">Documentation</p>
            <h2 className="h2 head--tight">LoreRim has its own site</h2>
            <p className={styles.docsText}>
              Install instructions, system requirements, mechanics documentation and the changelog all live on
              lorerim.com — it is the authoritative source and is kept current with each release.
            </p>
            <div className={styles.docsActions}>
              <a href={site.lorerim} {...ext} className="btn btn--gold">Read the docs</a>
              <a href={site.biggie.youtube} {...ext} className="btn btn--ghost">Dev streams</a>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div id="support">
          <DiscordBand
            title="Support lives in the Bungalo"
            text="Install help, release pings and build advice from the people who made it — plus everyone else playing the same list."
            primary={{ label: 'Join the Discord', icon: <DiscordIcon size={19} /> }}
            secondary={[{ href: site.biggie.kofi, label: 'Support on Ko-fi' }]}
          />
        </div>
      </div>
    </>
  )
}
