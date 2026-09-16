import { useState } from 'react'
import { Link } from 'react-router'
import { useTitle } from '../../components/layout/ScrollManager'
import { Callout } from '../../components/ui/Callout'
import { DiscordBand } from '../../components/ui/DiscordBand'
import { FaqAccordion, type FaqItem } from '../../components/ui/FaqAccordion'
import { Gallery, type Shot } from '../../components/ui/Gallery'
import { BookIcon, DownloadIcon, StrokeIcon } from '../../components/ui/Icons'
import { ModlistHero } from '../../components/ui/ModlistHero'
import { SectionNav } from '../../components/ui/SectionNav'
import { SizeCards, SpecCards, SpecToggle } from '../../components/ui/Specs'
import { FeatureCard, StepList, StuckTile, TroubleTile } from '../../components/ui/Steps'
import { YouTubeEmbed } from '../../components/ui/YouTubeEmbed'
import { readmePath } from '../../data/modlists'
import { pageTitle, site } from '../../data/site'
import styles from './Ngvo.module.css'

const NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'specs', label: 'Requirements' },
  { id: 'install', label: 'Installation' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'gallery', label: 'Showcase' },
]

const NGVO_DISCORD = 'https://discord.gg/Tb5ETzBYjd'
const LOAD_ORDER = 'https://loadorderlibrary.com/lists/next-generation-visual-overhaul-NGVO'

const ext = { target: '_blank', rel: 'noopener' } as const

// Full-size images open in the lightbox; the -thumb variants fill the grid tiles.
const shot = (name: string, alt: string): Shot => ({
  src: `assets/shots/ngvo/${name}.webp`,
  thumb: `assets/shots/ngvo/${name}-thumb.webp`,
  alt,
})

const SHOTS: Shot[] = [
  shot('riverwood', 'Riverwood at sunrise, outside the Sleeping Giant Inn'),
  shot('whiterun-night', 'Whiterun under the aurora at night'),
  shot('magnus-snow', 'Sunrise through pines on a snowbound mountain pass'),
  shot('tundra', 'Mist over the Whiterun tundra at dawn'),
  shot('mer-overlook', 'A character in Elven armour on a cliff above snowy peaks'),
  shot('magine-moonlight', 'A traveller on a moonlit mountain path'),
  shot('dungeon-interior', 'Carved stonework inside a Nordic ruin'),
]

const FAQS: FaqItem[] = [
  {
    q: 'What is NGVO?',
    a: (
      <>
        <p>A visual, bugfix and tooling modlist. Either play vanilla Skyrim with the best possible visuals, or expand it by adding your own gameplay changes on top.</p>
        <p>Skyrim Anniversary Edition with the full $20 upgrade is required and NGVO runs on the latest version of Skyrim. You also need the free Creation Kit for Skyrim SE on Steam.</p>
      </>
    ),
  },
  {
    q: 'How do I remove Northern Roads?',
    a: (
      <>
        <p>Northern Roads is the main culprit for plugin conflicts. You can fix landscape seams by following the seam guide on YouTube, or remove it entirely:</p>
        <ol>
          <li>Disable or delete all mods under the <strong>Northern Roads</strong> separator in MO2.</li>
          <li>Disable <span className="mono">Nature of the Wild Lands - Northern Roads Patch.esp</span> and <span className="mono">NGVO - Northern Roads Patch.esp</span>.</li>
          <li>Delete the current ParallaxGen, xLODGen, TexGen and DynDOLOD outputs.</li>
          <li>Temporarily disable all plugins in the Flat Map Framework separator.</li>
          <li>Rerun Synthesis, ParallaxGen, xLODGen, grass cache, TexGen, then DynDOLOD — in that order.</li>
          <li>Re-enable the Flat Map Framework plugins.</li>
        </ol>
      </>
    ),
  },
  {
    q: 'The list will not launch — what do I try first?',
    a: (
      <>
        <ol>
          <li>Install Visual C++ x64 and the .NET runtime.</li>
          <li>Make sure the Creation Kit is installed and has been opened once — let it extract everything when it asks.</li>
          <li>Make sure you have a fresh install of Skyrim.</li>
          <li>Launch to the main menu and let the paid addon files download. <strong>Do not verify your game files.</strong></li>
          <li>Disable or add exemptions for any third-party antivirus.</li>
        </ol>
        <p>If you have done all of these and still have issues, reinstall the list — it resolves problems that crop up from time to time.</p>
      </>
    ),
  },
  {
    q: 'Can I run it on the GOG version?',
    a: <p>Not officially — only English Steam versions are supported, because master files need cleaning. A community guide by Specific-Judgment410 covers getting Wabbajack and NGVO working with GOG, but you are on your own if it breaks.</p>,
  },
  {
    q: 'How do I update the modlist?',
    a: (
      <>
        <p>Check the changelog and back up your saves first — some updates need a new game. Then install exactly as before, keeping the same paths, and tick <strong>overwrite existing modlist</strong>.</p>
        <p>Any mods you added yourself will be deleted when updating. To uninstall entirely, just delete the folder.</p>
      </>
    ),
  },
  {
    q: 'What are Stock Game and Root Builder?',
    a: <p>Stock Game makes a copy of your Skyrim install inside the list's folder, so NGVO never touches your Steam copy and plays nicely alongside other lists. Root Builder sits on top of it to manage hooks like ENB, ReShade and Engine Fixes.</p>,
  },
]

export function Ngvo() {
  useTitle(pageTitle('NGVO'))
  const [res, setRes] = useState<'1080' | '1440'>('1080')
  const hi = res === '1440'

  return (
    <>
      <ModlistHero
        image="assets/heroes/ngvo-hero.webp"
        position="center 38%"
        logo="assets/logos/NGVO.webp"
        logoAlt="NGVO"
        title="Next Gen Visual Overhaul"
        blurb="The best visuals you can find on a deliberately moddable base. Under 300 plugins and fewer than 40 ESP/ESMs — leaving you over 210 slots to build on top of."
        chips={[
          { label: 'Latest Skyrim AE' },
          { label: 'by ghoulified & not_docs' },
          { label: '~250 GB total', gold: true },
          { label: 'CC BY-NC-SA 4.0' },
        ]}
      >
        <a href={site.wabbajack} {...ext} className="btn btn--gold btn--glow">
          <DownloadIcon />
          Install with Wabbajack
        </a>
        <a href={LOAD_ORDER} {...ext} className="btn btn--ghost">Load order</a>
        <Link to={readmePath('ngvo')} className="btn btn--gold-outline">
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
              <h2 className={`h2 ${styles.overviewTitle}`}>A visual baseline, not a straitjacket</h2>
              <p className={`lead ${styles.copy}`}>NGVO is built around one philosophy: give you the absolute best visuals available while staying as moddable as possible. Everything is sorted into clear separators so you can pull a piece out, rerun the relevant tools, and keep going.</p>
              <p className={`lead ${styles.copy}`}>Play it as vanilla Skyrim with 2026 visuals, or treat it as the foundation for your own list. Requiem, EnaiRim and SimonRim all drop on top cleanly.</p>
            </div>
            <YouTubeEmbed id="ypRo6a3mTLw" title="NGVO showcase" />
          </div>
        </section>

        <section id="features" className={styles.features}>
          <h2 className={`h2 ${styles.featuresTitle}`}>Key features</h2>
          <div className="grid grid--cards">
            <FeatureCard
              title="Tools at your disposal"
              icon={<StrokeIcon><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" /></StrokeIcon>}
            >
              xEdit, Synthesis, ParallaxGen, DynDOLOD and the Creation Kit all pre-configured, so you can start editing on day one.
            </FeatureCard>
            <FeatureCard
              title="Graphical changes"
              icon={<StrokeIcon><path d="m2 20 5-14 5 8 3-4 7 10H2Z" /><circle cx="17" cy="5" r="2" /></StrokeIcon>}
            >
              A more vibrant Skyrim atmosphere via Fantasia Landscapes, Traverse the Ulvenwald, Cabbage ENB and the Vinland Grass Patch.
            </FeatureCard>
            <FeatureCard
              title="Modular by design"
              icon={<StrokeIcon><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></StrokeIcon>}
            >
              Northern Roads ships on by default. Disable its separator, rerun LODs, and you have Blended Roads instead. Everything works this way.
            </FeatureCard>
            <FeatureCard
              title="Engine enhancement"
              icon={<StrokeIcon><path d="M12 2v6" /><path d="m4.9 4.9 4.2 4.2" /><path d="M2 12h6" /><circle cx="12" cy="14" r="6" /></StrokeIcon>}
            >
              Every current bugfix and performance improvement, with stability and optimization treated as the design constraint — not an afterthought.
            </FeatureCard>
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
              { label: 'CPU', value: '12th Gen i7 or better' },
              { label: 'RAM', value: '32 GB DDR4 + 40 GB pagefile' },
              { label: 'Storage', value: hi ? 'M.2 SSD' : 'SATA SSD or higher' },
              { label: 'GPU', value: hi ? 'RTX 4080 or better' : 'RTX 3060 or better', gold: true },
            ]}
          />
          <SizeCards
            sizes={[
              { label: 'Download size', value: '~150 GB' },
              { label: 'Install size', value: '~100 GB' },
              { label: 'Total required', value: '~250 GB' },
            ]}
          />
          <Callout title="Read this before you start">
            <p>NGVO requires Skyrim updated to the <strong>latest version</strong> and the full $20 Anniversary Edition upgrade. Only <strong>English Steam</strong> versions are supported — GOG and other languages are not.</p>
            <p>Windows 10 or 11, version 21H2 or newer. LTSC and modified variants will not work. AMD RX 580 and older cards are not supported. Running from an HDD or external drive is strongly advised against.</p>
          </Callout>
        </section>

        <section id="install" className="section">
          <p className="eyebrow">Read me</p>
          <h2 className={`h2 ${styles.installTitle}`}>Installation</h2>
          <p className={`lead ${styles.installIntro}`}>With Nexus Premium this is mostly a waiting game. Work through pre-installation properly — almost every support ticket traces back to a skipped step here.</p>

          <Link to={readmePath('ngvo')} className={styles.readmeCard}>
            <div className={styles.readmeLead}>
              <BookIcon size={22} stroke="#F0C070" className={styles.readmeIcon} />
              <div>
                <p className={styles.readmeTitle}>Full NGVO Read Me</p>
                <p className={styles.readmeText}>The summary below covers the shape of the install. The Read Me has every step in full, maintained by the modlist author.</p>
              </div>
            </div>
            <span className={styles.readmeCta}>Open Read Me</span>
          </Link>

          <div className={styles.installGrid}>
            <StepList
              number={1}
              title="Pre-installation"
              steps={[
                <>Install <a href="https://aka.ms/vs/17/release/vc_redist.x64.exe" {...ext}>Visual C++ x64</a> and the <a href="https://dotnet.microsoft.com/en-us/download/dotnet/8.0" {...ext}>.NET desktop runtime x64</a>.</>,
                <>Stop Skyrim from <a href="https://help.steampowered.com/en/faqs/view/71AB-698D-57EB-178C#disable" {...ext}>auto-updating</a>.</>,
                <>Fully uninstall Skyrim — delete the game folder <em>and</em> the Skyrim Special Edition folder in <span className="mono">\Documents\My Games\</span>.</>,
                <>Disable OneDrive and anything else that hooks into user file areas.</>,
                <>Reinstall Skyrim outside Program Files — somewhere like <span className="mono">C:\Games</span>.</>,
                <>Start the game once and let it run the graphics check.</>,
                <>Launch to the main menu and let the Creation Club files download. <strong>Do not verify your game files.</strong></>,
                <>Remove or disable third-party antivirus such as MalwareBytes or Webroot.</>,
                <><strong>Install the Skyrim SE Creation Kit on Steam and run it at least once.</strong></>,
              ]}
            />
            <div>
              <StepList
                number={2}
                title="Download and install"
                steps={[
                  <>Put <a href={site.wabbajack} {...ext}>Wabbajack</a> in a folder like <span className="mono">C:\Games\Wabbajack</span> — not Program Files, desktop or Downloads.</>,
                  <>Open Wabbajack, click <strong>Browse Modlists</strong>, press download on NGVO.</>,
                  <>Set the install folder to something like <span className="mono">C:\NGVO</span>.</>,
                  <>Downloads do not need to be on an SSD, but it is faster if they are.</>,
                  <>Press play and go pet your nearest fluffy animal while Wabbajack works.</>,
                ]}
              />
              <StepList
                number={3}
                title="Post-installation"
                steps={[
                  <>Open the install folder and run <span className="mono">ModOrganizer.exe</span>.</>,
                  <>Set the dropdown on the right to <strong>NGVO</strong> and press Run.</>,
                  <>No MCM options are required. Load the SmoothCam preset if you want it.</>,
                  <>Screenshots save to <span className="mono">Overwrite\Stock Game</span>.</>,
                ]}
              />
            </div>
          </div>
        </section>

        <section id="troubleshooting" className="section">
          <h2 className={`h2 ${styles.troubleTitle}`}>Troubleshooting</h2>
          <div className="grid grid--tiles">
            <TroubleTile title="Could not download x">
              Large files fail on flaky connections. Rerun Wabbajack or download manually into the same downloads folder. Make sure you own all the paid AE content and that the Creation Kit is installed.
            </TroubleTile>
            <TroubleTile title="x is not a whitelisted download">
              This happens while the list is being updated. Check for a new version or wait for the release ping in Discord.
            </TroubleTile>
            <TroubleTile title="Antivirus reports a virus">
              Pre-installation step 8 was skipped. If you did follow it, <a href="https://www.thewindowsclub.com/exclude-a-folder-from-windows-security-scan" {...ext}>add a Defender exclusion</a> for Mod Organizer.
            </TroubleTile>
            <TroubleTile title="Crashing on an AMD GPU" tone="gold">
              Disable DLAA and enable TAA in <span className="mono">SkyrimPrefs.ini</span> inside the profile folder. Otherwise you <em>will</em> crash.
            </TroubleTile>
            <TroubleTile title="Crash after dying and reloading" tone="gold">
              A DynDOLOD DLL NG issue. Disable the DLL and rerun DynDOLOD to use papyrus scripts instead — heavier on FPS and worse LODs, but stable.
            </TroubleTile>
            <StuckTile text="Check the FAQs below, then bring your MO2 log to the support channel." href={site.discord} />
          </div>
        </section>

        <section id="faqs" className="section">
          <FaqAccordion items={FAQS} />
        </section>

        <section id="gallery" className="section">
          <Gallery shots={SHOTS} extra={<YouTubeEmbed id="nKkY0H4R3oU" title="NGVO second showcase" radius={12} />} />
        </section>

        <DiscordBand
          secondary={{ href: NGVO_DISCORD, label: 'NGVO Discord' }}
          credits="Credits — Althro & Ylikollikas for answering every question, ShadowSorcery for the NGVO logo, Halgari and the Wabbajack team, and every mod author whose work made this list possible."
        />
      </div>
    </>
  )
}
