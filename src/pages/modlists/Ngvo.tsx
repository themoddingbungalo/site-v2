import { useState } from 'react'
import { Link } from 'react-router'
import { useTitle } from '../../components/layout/ScrollManager'
import { DiscordBand } from '../../components/ui/DiscordBand'
import { FaqAccordion, type FaqItem } from '../../components/ui/FaqAccordion'
import { Gallery, galleryExtra, shotsFor, type Shot } from '../../components/ui/Gallery'
import { BookIcon, DownloadIcon, StrokeIcon } from '../../components/ui/Icons'
import { ModlistHero } from '../../components/ui/ModlistHero'
import { ReadMeCard } from '../../components/ui/ReadMeCard'
import { SectionNav } from '../../components/ui/SectionNav'
import { SizeCards, SpecCards, SpecToggle } from '../../components/ui/Specs'
import { FeatureCard, StepList, StuckTile, TroubleTile } from '../../components/ui/Steps'
import { YouTubeEmbed } from '../../components/ui/YouTubeEmbed'
import {
  AntivirusTile,
  DownloadFailedTile,
  DynDolodCrashTile,
  NotWhitelistedTile,
  SkyrimRequirements,
  skyrimPreInstall,
  step,
  wabbajackInstall,
} from '../../content/install'
import { readmePath } from '../../data/modlists'
import { ext, pageTitle, site } from '../../data/site'

const NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'specs', label: 'Requirements' },
  { id: 'install', label: 'Installation' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'gallery', label: 'Showcase' },
]

const LOAD_ORDER = 'https://loadorderlibrary.com/lists/next-generation-visual-overhaul-NGVO'

const shot = shotsFor('ngvo')

// The video and the first two shots are 2x2, which packs the ten shots plus the video
// into five complete rows of the four-column grid.
const SHOTS: Shot[] = [
  { ...shot('riverwood', 'Riverwood at sunrise, outside the Sleeping Giant Inn'), feature: true },
  { ...shot('dragon', 'A dragon perched on a snowbound crag'), feature: true },
  shot('whiterun-night', 'Whiterun under the aurora at night'),
  shot('magnus-snow', 'Sunrise through pines on a snowbound mountain pass'),
  shot('solitude', "Katla's farm outside Solitude"),
  shot('tundra', 'Mist over the Whiterun tundra at dawn'),
  shot('bloodmoon', 'Sinding under the Bloodmoon'),
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
        <p>NGVO requires your Steam copy of Skyrim to be updated to the latest version, along with the full $20 Anniversary Edition upgrade. You also need the free Creation Kit for Skyrim SE on Steam.</p>
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
        <section id="overview" className="section--intro">
          <div className="grid grid--2">
            <div className="flow">
              <p className="eyebrow">Overview</p>
              <h2 className="h2 head--loose">A visual baseline, not a straitjacket</h2>
              <p className="lead">NGVO is built around one philosophy: give you the absolute best visuals available while staying as moddable as possible. Everything is sorted into clear separators so you can pull a piece out, rerun the relevant tools, and keep going.</p>
              <p className="lead">Play it as vanilla Skyrim with 2026 visuals, or treat it as the foundation for your own list. Requiem, EnaiRim and SimonRim all drop on top cleanly.</p>
            </div>
            <YouTubeEmbed id="ypRo6a3mTLw" title="NGVO showcase" />
          </div>
        </section>

        <section id="features" className="section--tight">
          <h2 className="h2 head--gap">Key features</h2>
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
          <SkyrimRequirements name="NGVO" />
        </section>

        <section id="install" className="section">
          <p className="eyebrow">Read me</p>
          <h2 className="h2 head--tight">Installation</h2>
          <p className="lead section-lead section-lead--roomy">With Nexus Premium this is mostly a waiting game. Work through pre-installation properly — almost every support ticket traces back to a skipped step here.</p>

          <ReadMeCard slug="ngvo" />

          <div className="grid grid--install">
            <StepList number={1} title="Pre-installation" steps={[...skyrimPreInstall, step.creationKit]} />
            <div>
              <StepList
                number={2}
                title="Download and install"
                steps={wabbajackInstall({ name: 'NGVO', folder: 'C:\\NGVO' })}
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
          <h2 className="h2 head--gap">Troubleshooting</h2>
          <div className="grid grid--tiles">
            <DownloadFailedTile>Make sure you own all the paid AE content and that the Creation Kit is installed.</DownloadFailedTile>
            <NotWhitelistedTile />
            <AntivirusTile />
            <TroubleTile title="Crashing on an AMD GPU" tone="gold">
              Disable DLAA and enable TAA in <span className="mono">SkyrimPrefs.ini</span> inside the profile folder. Otherwise you <em>will</em> crash.
            </TroubleTile>
            <DynDolodCrashTile />
            <StuckTile text="Check the FAQs below, then bring your MO2 log to the support channel." href={site.discord} />
          </div>
        </section>

        <section id="faqs" className="section">
          <FaqAccordion items={FAQS} />
        </section>

        <section id="gallery" className="section">
          <Gallery
            shots={SHOTS}
            extraFirst
            extra={<YouTubeEmbed id="nKkY0H4R3oU" title="NGVO second showcase" radius={12} className={galleryExtra.feature} />}
          />
        </section>

        <DiscordBand
          credits="Credits — Althro & Ylikollikas for answering every question, ShadowSorcery for the NGVO logo, Halgari and the Wabbajack team, and every mod author whose work made this list possible."
        />
      </div>
    </>
  )
}
