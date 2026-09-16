import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { useTitle } from '../../components/layout/ScrollManager'
import { Callout } from '../../components/ui/Callout'
import { DiscordBand } from '../../components/ui/DiscordBand'
import { BookIcon, DownloadIcon } from '../../components/ui/Icons'
import { ModlistHero } from '../../components/ui/ModlistHero'
import { SectionNav } from '../../components/ui/SectionNav'
import { SpecCards, SpecToggle } from '../../components/ui/Specs'
import { StepList, StuckTile, TroubleTile } from '../../components/ui/Steps'
import { YouTubeEmbed } from '../../components/ui/YouTubeEmbed'
import { readmePath } from '../../data/modlists'
import { asset, pageTitle, site } from '../../data/site'
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

const ext = { target: '_blank', rel: 'noopener' } as const

interface Shot { src: string; alt: string }
const SHOTS: Shot[] = [
  { src: 'assets/heroes/ghoulified-stones.webp', alt: 'Standing stones' },
  { src: 'assets/logos/Ghoulified-cover.webp', alt: 'Ghoulified cover art' },
]

/** Pre-installation steps; `hot` rows get the gold highlight (Rare Curios). */
const PRE_INSTALL: { body: ReactNode; hot?: boolean }[] = [
  { body: <>Install <a href="https://aka.ms/vs/17/release/vc_redist.x64.exe" {...ext}>Visual C++ x64</a> and the <a href="https://dotnet.microsoft.com/en-us/download/dotnet/8.0" {...ext}>.NET desktop runtime x64</a>.</> },
  { body: <>Stop Skyrim from <a href="https://help.steampowered.com/en/faqs/view/71AB-698D-57EB-178C#disable" {...ext}>auto-updating</a>.</> },
  { body: <>Fully uninstall Skyrim — the game folder <em>and</em> the Skyrim Special Edition folder in <span className="mono">\Documents\My Games\</span>.</> },
  { body: <>Disable OneDrive and anything else that hooks into user file areas.</> },
  { body: <>Reinstall Skyrim outside Program Files — somewhere like <span className="mono">C:\Games</span>.</> },
  { body: <>Start the game once and let it run the graphics check.</> },
  { body: <>Launch to the main menu and let the free Creation Club files download. <strong>Do not verify your game files.</strong></> },
  { body: <>In <span className="mono">…\Skyrim Special Edition\Data</span>, delete <span className="mono">ccbgssse037-curios.bsa</span> and <span className="mono">ccbgssse037-curios.esp</span>.</>, hot: true },
  { body: <>Relaunch Skyrim, go to the Creation Club and redownload <strong>Rare Curios</strong>. Back to main menu, then close the game.</>, hot: true },
  { body: <>Download the <a href="https://store.steampowered.com/app/1946180/Skyrim_Special_Edition_Creation_Kit/" {...ext}>Skyrim SE Creation Kit</a> on Steam and run it once.</> },
  { body: <>Remove or disable third-party antivirus such as MalwareBytes or Webroot.</> },
]

export function Ghoulified() {
  useTitle(pageTitle('Ghoulified Reality'))
  const [res, setRes] = useState<'1080' | '1440'>('1080')
  const hi = res === '1440'
  const [lightbox, setLightbox] = useState<Shot | null>(null)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <>
      <ModlistHero
        className={styles.hero}
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
        <section id="overview" className={styles.overview}>
          <div className="grid grid--2">
            <div>
              <p className="eyebrow">Overview</p>
              <h2 className={`h2 ${styles.overviewTitle}`}>Dangerous, but fair</h2>
              <p className={`lead ${styles.copy}`}>Ghoulified Reality completely overhauls both visuals and gameplay for a more challenging and immersive Skyrim. It forks NGVO — a visual-only list — and layers Requiem on top for a strategic experience, from combat through character progression.</p>
              <p className={`lead ${styles.copy}`}>What separates it from other Requiem lists is 3BFTweaks and its addons, which make the world more dangerous while maintaining a sense of fairness and balance. Perma-death is available but optional.</p>
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
          <Callout title="Read this before you start">
            <p>Requires Skyrim updated to the <strong>latest version</strong> and the <strong>AE DLC</strong>. Only English Steam versions are supported — GOG and other languages are not. Around <strong>300 GB</strong> total space.</p>
            <p>Windows 10 or 11, 21H2 or newer. LTSC and modified variants will not work. AMD RX 580 and older cards are not supported. HDDs and external drives are strongly advised against.</p>
          </Callout>
        </section>

        <section id="install" className="section">
          <p className="eyebrow">Read me</p>
          <h2 className={`h2 ${styles.installTitle}`}>Installation</h2>
          <p className={`lead ${styles.installIntro}`}>Note steps 8 and 9 — Ghoulified needs Rare Curios deleted and redownloaded, which no other list here asks for. Skipping it breaks the install.</p>

          <Link to={readmePath('ghoulified')} className={styles.readmeCard}>
            <div className={styles.readmeLead}>
              <BookIcon size={22} stroke="#F0C070" className={styles.readmeIcon} />
              <div>
                <p className={styles.readmeTitle}>Full Ghoulified Reality Read Me</p>
                <p className={styles.readmeText}>The summary below covers the shape of the install. The Read Me has every step in full, maintained by the modlist author.</p>
              </div>
            </div>
            <span className={styles.readmeCta}>Open Read Me</span>
          </Link>

          <div className={styles.installGrid}>
            <div>
              <div className={styles.stepHead}>
                <span className={styles.stepBadge}>1</span>
                <h3 className={styles.stepTitle}>Pre-installation</h3>
              </div>
              <ol className={styles.stepList}>
                {PRE_INSTALL.map((s, i) => (
                  <li key={i} className={`${styles.stepRow} ${s.hot ? styles.stepRowHot : ''}`}>
                    <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span>{s.body}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <StepList
                number={2}
                title="Download and install"
                steps={[
                  <>Put <a href={site.wabbajack} {...ext}>Wabbajack</a> in a folder like <span className="mono">C:\Games\Wabbajack</span>. Always the latest version.</>,
                  <>Open Wabbajack, click <strong>Browse Modlists</strong>, press download on Ghoulified Reality.</>,
                  <>Set the install folder to something like <span className="mono">C:\Ghoulified Reality</span>.</>,
                  <>Downloads do not need an SSD, but it is faster if they are on one.</>,
                  <>Press play and go pet your nearest fluffy animal.</>,
                ]}
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
          <h2 className={`h2 ${styles.optTitle}`}>Optional mods</h2>
          <p className={`lead ${styles.optIntro}`}>MO2 has two separators labelled optional — one for gameplay, one for combat animations. Everything in them can be toggled at any time, and this is where you enable perma-death.</p>
          <div className="grid grid--tiles">
            <div className={styles.optCard}>
              <h3 className={styles.optCardTitle}>3BFTweaks</h3>
              <p className={styles.optCardText}>The core of what makes this list what it is. Read the <Link to="#tweaks">3BFTweaks section</Link> below before you start.</p>
            </div>
            <div className={`${styles.optCard} ${styles.optCardRed}`}>
              <h3 className={styles.optCardTitle}>AD-Mortem perma-death</h3>
              <p className={styles.optCardText}>Automatically deletes all your saves when you die. Enable it only if you mean it.</p>
            </div>
            <div className={styles.optCard}>
              <h3 className={styles.optCardTitle}>Smart Harvest NG AutoLoot</h3>
              <p className={styles.optCardText}>Can auto-loot anything you walk near. By default it only picks up alchemy ingredients.</p>
            </div>
            <div className={styles.optCard}>
              <h3 className={styles.optCardTitle}>Modex — Mod Explorer Menu</h3>
              <p className={styles.optCardText}>Your go-to for testing and potentially fixing bugs mid-playthrough.</p>
            </div>
            <div className={styles.optCard}>
              <h3 className={styles.optCardTitle}>SKSE Menu Framework</h3>
              <p className={styles.optCardText}>Controls SKSE mods — hit <span className="mono">F1</span> in game. This is also where you change your FOV.</p>
            </div>
          </div>
        </section>

        <section id="tweaks" className="section">
          <div className={styles.tweaksPanel}>
            <p className="eyebrow">Guide · by WhisperDealer</p>
            <h2 className={`h2 ${styles.tweaksTitle}`}>What is 3BFTweaks?</h2>
            <p className={`lead ${styles.tweaksIntro}`}>Often shortened to 3Tweaks, it is a comprehensive overhaul for Requiem – The Roleplaying Overhaul, created by ANoobInDisguise and the Requiem community. It refines and rebalances an already challenging experience, aimed squarely at veteran players.</p>
            <div className={styles.tweaksGrid}>
              <div className={styles.tweaksItem}>
                <h3 className={styles.tweaksItemTitle}>Difficulty and balance</h3>
                <p className={styles.tweaksItemText}>Adjusts the difficulty curve so the game stays challenging throughout, reducing your potential to become overwhelmingly powerful.</p>
              </div>
              <div className={styles.tweaksItem}>
                <h3 className={styles.tweaksItemTitle}>Integration</h3>
                <p className={styles.tweaksItemText}>Version 4.3.3 requires Requiem 5.4.5 and patches four free Creation Club mods, keeping popular expansions balanced within Requiem.</p>
              </div>
              <div className={styles.tweaksItem}>
                <h3 className={styles.tweaksItemTitle}>Customisation</h3>
                <p className={styles.tweaksItemText}>Designed for a high level of customisation — adjust most aspects to suit your own preferences.</p>
              </div>
            </div>
            <div className={styles.tweaksActions}>
              <a href={TWEAKS_GUIDES} {...ext} className="btn btn--gold btn--sm">Official guides</a>
              <a href={WULF_BUILDS} {...ext} className="btn btn--outline btn--sm">Wulf's builds</a>
            </div>
          </div>
        </section>

        <section id="troubleshooting" className="section">
          <h2 className={`h2 ${styles.troubleTitle}`}>Troubleshooting</h2>
          <div className="grid grid--tiles">
            <TroubleTile title="Could not download x">
              Large files fail on flaky connections. Rerun Wabbajack, or download manually into the same downloads folder.
            </TroubleTile>
            <TroubleTile title="x is not a whitelisted download">
              This happens while the list is being updated. Check for a new version or wait for the release ping.
            </TroubleTile>
            <TroubleTile title="Antivirus reports a virus">
              A pre-installation step was skipped. If you did follow them, <a href="https://www.thewindowsclub.com/exclude-a-folder-from-windows-security-scan" {...ext}>add a Defender exclusion</a> for Mod Organizer.
            </TroubleTile>
            <TroubleTile title="Updating the list" tone="gold">
              Check the changelog and back up saves first — some updates need a new game. Keep the same paths and tick <strong>overwrite existing modlist</strong>. Mods you added yourself get deleted.
            </TroubleTile>
            <div className={styles.tileGreen}>
              <p className={styles.tileGreenTitle}>Stock Game &amp; Root Builder</p>
              <p className={styles.tileGreenBody}>A copy of Skyrim lives inside the install folder, so other lists stay compatible. Root Builder manages ENB, ReShade and Engine Fixes.</p>
            </div>
            <StuckTile text="Bring your MO2 log to the support channel." href={site.discord} />
          </div>
        </section>

        <section id="showcase" className="section">
          <h2 className={`h2 ${styles.showTitle}`}>Showcase</h2>
          <div className={styles.showGrid}>
            <YouTubeEmbed id="Lp8-XTgxJoI" title="Ghoulified showcase" radius={12} className={styles.showVideo} />
            {SHOTS.map((s) => (
              <button key={s.src} type="button" className={styles.showTile} onClick={() => setLightbox(s)} aria-label={`View ${s.alt} full size`}>
                <img src={asset(s.src)} alt={s.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </section>

        {lightbox && (
          <div className={styles.lightbox} onClick={() => setLightbox(null)} role="dialog" aria-label={lightbox.alt}>
            <img src={asset(lightbox.src)} alt={lightbox.alt} />
            <button type="button" className={styles.lightboxClose} aria-label="Close" onClick={() => setLightbox(null)}>×</button>
          </div>
        )}

        <DiscordBand
          title="Support and updates in Discord"
          text="Release pings, changelogs and build advice from people playing the same brutal list."
          credits={<>Credits — <strong className={styles.creditsYou}>you</strong> for reading this, Ghoul smasher Biggie Forn and LaLa for being super helpful, WhisperDealer for the website, Halgari and the Wabbajack team, and every mod author whose work made this list possible.</>}
        />
      </div>
    </>
  )
}
