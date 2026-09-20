import { useState } from 'react'
import { Link } from 'react-router'
import { useTitle } from '../../components/layout/ScrollManager'
import { DiscordBand } from '../../components/ui/DiscordBand'
import { Gallery, galleryExtra, shotsFor, type Shot } from '../../components/ui/Gallery'
import { BookIcon, DownloadIcon } from '../../components/ui/Icons'
import { ModlistHero } from '../../components/ui/ModlistHero'
import { ReadMeCard } from '../../components/ui/ReadMeCard'
import { SectionNav } from '../../components/ui/SectionNav'
import { SpecCards, SpecToggle } from '../../components/ui/Specs'
import { StepList, StuckTile, TroubleTile, type Step } from '../../components/ui/Steps'
import { Tile } from '../../components/ui/Tile'
import { YouTubeEmbed } from '../../components/ui/YouTubeEmbed'
import {
  AntivirusTile,
  DownloadFailedTile,
  NotWhitelistedTile,
  SkyrimRequirements,
  UpdatingTile,
  step,
  wabbajackInstall,
} from '../../content/install'
import { readmePath } from '../../data/modlists'
import { ext, pageTitle, site } from '../../data/site'
import styles from './Ghoulified.module.css'

const NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'specs', label: 'Requirements' },
  { id: 'install', label: 'Installation' },
  { id: 'optional', label: 'Optional mods' },
  { id: 'tweaks', label: '3BFTweaks' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'showcase', label: 'Showcase' },
]

const NEXUS = 'https://www.nexusmods.com/skyrimspecialedition/mods/121811'
const TWEAKS_GUIDES = 'https://sites.google.com/view/3bftweaksrequiem/home'
const WULF_BUILDS = 'https://docs.google.com/document/d/1cNxdbVA-1_Zdtsb1Bmxv1ffQ5jNCPcVOW-mwgAyIx_A/mobilebasic'

const shot = shotsFor('ghoulified')

// The video and the first two shots are 2x2, which packs the ten shots plus the video
// into five complete rows of the four-column grid.
const SHOTS: Shot[] = [
  { ...shot('solstheim', 'Red Mountain erupting over the Solstheim ashlands'), feature: true },
  { ...shot('sovngarde', 'The Hall of Valor in Sovngarde'), feature: true },
  shot('whiterun', 'Whiterun and the mountains beyond'),
  shot('markarth', "Markarth's Dwemer stonework by torchlight"),
  shot('riverwood-trader', 'Firelight inside the Riverwood Trader'),
  shot('the-rift', 'Autumn birches in the Rift'),
  shot('jarl-ballin', "An audience in the Jarl's hall"),
  shot('tundra-sunset', 'Sunset over the tundra'),
  shot('woods-rain', 'Rain through the pines'),
  shot('molag-bal-vyrthur', 'Vyrthur in the Forgotten Vale'),
]

/**
 * The shared pre-installation steps, with the Rare Curios dance spliced in. No other
 * list needs it, which is why those two steps live here and are flagged `hot`.
 */
const PRE_INSTALL: Step[] = [
  step.runtimes(),
  step.stopAutoUpdates,
  step.uninstallSkyrim,
  step.disableOneDrive,
  step.reinstallSkyrim,
  step.graphicsCheck,
  step.creationClub,
  {
    body: <>In <span className="mono">…\Skyrim Special Edition\Data</span>, delete <span className="mono">ccbgssse037-curios.bsa</span> and <span className="mono">ccbgssse037-curios.esp</span>.</>,
    hot: true,
  },
  {
    body: <>Relaunch Skyrim, go to the Creation Club and redownload <strong>Rare Curios</strong>. Back to main menu, then close the game.</>,
    hot: true,
  },
  step.creationKitLinked,
  step.antivirus,
]

const OPTIONAL = [
  {
    title: '3BFTweaks',
    tone: 'plain' as const,
    body: <>The core of what makes this list what it is. Read the <Link to="#tweaks">3BFTweaks section</Link> below before you start.</>,
  },
  {
    title: 'AD-Mortem perma-death',
    tone: 'red' as const,
    body: 'Automatically deletes all your saves when you die. Enable it only if you mean it.',
  },
  {
    title: 'Smart Harvest NG AutoLoot',
    tone: 'plain' as const,
    body: 'Can auto-loot anything you walk near. By default it only picks up alchemy ingredients.',
  },
  {
    title: 'Modex — Mod Explorer Menu',
    tone: 'plain' as const,
    body: 'Your go-to for testing and potentially fixing bugs mid-playthrough.',
  },
  {
    title: 'SKSE Menu Framework',
    tone: 'plain' as const,
    body: <>Controls SKSE mods — hit <span className="mono">F1</span> in game. This is also where you change your FOV.</>,
  },
]

const TWEAKS = [
  {
    title: 'Difficulty and balance',
    text: 'Adjusts the difficulty curve so the game stays challenging throughout, reducing your potential to become overwhelmingly powerful.',
  },
  {
    title: 'Integration',
    text: 'Version 4.3.3 requires Requiem 5.4.5 and patches four free Creation Club mods, keeping popular expansions balanced within Requiem.',
  },
  {
    title: 'Customisation',
    text: 'Designed for a high level of customisation — adjust most aspects to suit your own preferences.',
  },
]

export function Ghoulified() {
  useTitle(pageTitle('Ghoulified Reality'))
  const [res, setRes] = useState<'1080' | '1440'>('1080')
  const hi = res === '1440'

  return (
    <>
      <ModlistHero
        scrimClassName={styles.scrim}
        image="assets/heroes/ghoulified-stones.webp"
        position="center 50%"
        logo="assets/logos/Ghoulified.webp"
        logoAlt="Ghoulified Reality"
        title="Ghoulified Reality"
        blurb="A hardcore, optionally perma-death Requiem list built on NGVO's visuals. 3BFTweaks and its addons make the world genuinely dangerous — while keeping it fair."
        chips={[
          { label: 'Latest Skyrim AE' },
          { label: 'by Ghoulified' },
          { label: '~300 GB total', gold: true },
          { label: 'CC BY-NC-SA 4.0' },
        ]}
      >
        <a href={site.wabbajack} {...ext} className="btn btn--gold btn--glow">
          <DownloadIcon />
          Install with Wabbajack
        </a>
        <a href={NEXUS} {...ext} className="btn btn--ghost">Nexus page</a>
        <Link to="#showcase" className="btn btn--ghost">Showcase</Link>
        <Link to={readmePath('ghoulified')} className="btn btn--gold-outline">
          <BookIcon />
          Read Me
        </Link>
      </ModlistHero>

      <SectionNav items={NAV} />

      <div className="container">
        <section id="overview" className="section--intro">
          <div className="grid grid--2">
            <div className="flow">
              <p className="eyebrow">Overview</p>
              <h2 className="h2 head--loose">Dangerous, but fair</h2>
              <p className="lead">Ghoulified Reality completely overhauls both visuals and gameplay for a more challenging and immersive Skyrim. It forks NGVO — a visual-only list — and layers Requiem on top for a strategic experience, from combat through character progression.</p>
              <p className="lead">What separates it from other Requiem lists is 3BFTweaks and its addons, which make the world more dangerous while maintaining a sense of fairness and balance. Perma-death is available but optional.</p>
            </div>
            <YouTubeEmbed id="Lp8-XTgxJoI" title="Ghoulified Reality showcase" />
          </div>
        </section>

        <section id="specs" className="section">
          <div className="section-head">
            <h2 className="h2">System requirements</h2>
            <SpecToggle
              options={[{ key: '1080', label: '1080p' }, { key: '1440', label: '1440p' }]}
              value={res}
              onChange={setRes}
            />
          </div>
          <SpecCards
            cards={[
              { label: 'CPU', value: hi ? '12th Gen i7 or better' : '10th Gen i5 or better' },
              { label: 'RAM', value: hi ? '32 GB DDR4 + 40 GB pagefile' : '16 GB DDR4 + 40 GB pagefile' },
              { label: 'Storage', value: hi ? 'M.2 SSD' : 'SATA SSD or higher' },
              { label: 'GPU', value: hi ? 'RTX 4070 or better' : 'RTX 3070 or better', gold: true },
            ]}
          />
          <SkyrimRequirements name="Ghoulified Reality" space="300 GB" />
        </section>

        <section id="install" className="section">
          <p className="eyebrow">Read me</p>
          <h2 className="h2 head--tight">Installation</h2>
          <p className="lead section-lead section-lead--roomy">Note steps 8 and 9 — Ghoulified needs Rare Curios deleted and redownloaded, which no other list here asks for. Skipping it breaks the install.</p>

          <ReadMeCard slug="ghoulified" />

          <div className="grid grid--install">
            <StepList number={1} title="Pre-installation" steps={PRE_INSTALL} />
            <div>
              <StepList
                number={2}
                title="Download and install"
                steps={wabbajackInstall({ name: 'Ghoulified Reality', folder: 'C:\\Ghoulified Reality' })}
              />
              <StepList
                number={3}
                title="First launch"
                steps={[
                  <>Run <span className="mono">ModOrganizer.exe</span>. An NXM popup appears on first launch — hit ignore.</>,
                  <>Set the dropdown on the right to <strong>Ghoulified Reality</strong> and press Run.</>,
                  <>MCM options run themselves — stand still until the popup says it has finished.</>,
                  <>Once the MCM is done, open your inventory and close it to start 3BFTweaks.</>,
                  <>Screenshots save to <span className="mono">Overwrite\Stock Game</span>.</>,
                ]}
              />
            </div>
          </div>
        </section>

        <section id="optional" className="section">
          <h2 className="h2 head--tight">Optional mods</h2>
          <p className="lead section-lead">MO2 has two separators labelled optional — one for gameplay, one for combat animations. Everything in them can be toggled at any time, and this is where you enable perma-death.</p>
          <div className="grid grid--tiles">
            {OPTIONAL.map((o) => (
              <Tile key={o.title} title={o.title} tone={o.tone}>{o.body}</Tile>
            ))}
          </div>
        </section>

        <section id="tweaks" className="section">
          <div className={styles.tweaksPanel}>
            <p className="eyebrow">Guide · by WhisperDealer</p>
            <h2 className={`h2 ${styles.tweaksTitle}`}>What is 3BFTweaks?</h2>
            <p className={`lead ${styles.tweaksIntro}`}>Often shortened to 3Tweaks, it is a comprehensive overhaul for Requiem – The Roleplaying Overhaul, created by ANoobInDisguise and the Requiem community. It refines and rebalances an already challenging experience, aimed squarely at veteran players.</p>
            <div className={styles.tweaksGrid}>
              {TWEAKS.map((t) => (
                <div key={t.title} className={styles.tweaksItem}>
                  <h3 className={styles.tweaksItemTitle}>{t.title}</h3>
                  <p className={styles.tweaksItemText}>{t.text}</p>
                </div>
              ))}
            </div>
            <div className={styles.tweaksActions}>
              <a href={TWEAKS_GUIDES} {...ext} className="btn btn--gold btn--sm">Official guides</a>
              <a href={WULF_BUILDS} {...ext} className="btn btn--outline btn--sm">Wulf's builds</a>
            </div>
          </div>
        </section>

        <section id="troubleshooting" className="section">
          <h2 className="h2 head--gap">Troubleshooting</h2>
          <div className="grid grid--tiles">
            <DownloadFailedTile />
            <NotWhitelistedTile />
            <AntivirusTile />
            <UpdatingTile />
            <TroubleTile title="Stock Game &amp; Root Builder" tone="green">
              A copy of Skyrim lives inside the install folder, so other lists stay compatible. Root Builder manages ENB, ReShade and Engine Fixes.
            </TroubleTile>
            <StuckTile text="Bring your MO2 log to the support channel." href={site.discord} />
          </div>
        </section>

        <section id="showcase" className="section">
          <Gallery
            shots={SHOTS}
            extraFirst
            extra={<YouTubeEmbed id="Lp8-XTgxJoI" title="Ghoulified showcase" radius={12} className={galleryExtra.feature} />}
          />
        </section>

        <DiscordBand
          title="Support and updates in Discord"
          text="Release pings, changelogs and build advice from people playing the same brutal list."
          credits={<>Credits — <strong>you</strong> for reading this, Ghoul smasher Biggie Forn and LaLa for being super helpful, WhisperDealer for the website, Halgari and the Wabbajack team, and every mod author whose work made this list possible.</>}
        />
      </div>
    </>
  )
}
