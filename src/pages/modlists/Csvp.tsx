import { useState } from 'react'
import { Link } from 'react-router'
import { useTitle } from '../../components/layout/ScrollManager'
import { Callout } from '../../components/ui/Callout'
import { DiscordBand } from '../../components/ui/DiscordBand'
import { FaqAccordion, type FaqItem } from '../../components/ui/FaqAccordion'
import { Gallery, type Shot } from '../../components/ui/Gallery'
import { BookIcon, DownloadIcon, StrokeIcon } from '../../components/ui/Icons'
import { ModlistHero } from '../../components/ui/ModlistHero'
import { SectionNav, type SectionNavItem } from '../../components/ui/SectionNav'
import { SizeCards, SpecCards, SpecToggle } from '../../components/ui/Specs'
import { FeatureCard, StepList, StuckTile, TroubleTile } from '../../components/ui/Steps'
import { YouTubeEmbed } from '../../components/ui/YouTubeEmbed'
import { guidePath } from '../../data/guides'
import { readmePath } from '../../data/modlists'
import { pageTitle, site } from '../../data/site'
import s from './Csvp.module.css'

const NEXUS = 'https://www.nexusmods.com/skyrimspecialedition/mods/135701'
const LOAD_ORDER = 'https://loadorderlibrary.com/lists/csvp-colloquy-s-skyrim-vanilla-plus-a-ngvo-fork-2'
const PLAYLIST = 'https://www.youtube.com/playlist?list=PLS5kKAZcoLrw'

const nav: SectionNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'philosophy', label: 'How it plays' },
  { id: 'specs', label: 'Requirements' },
  { id: 'install', label: 'Installation' },
  { id: 'guides', label: 'Guides' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'hotkeys', label: 'Hotkeys' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'gallery', label: 'Showcase' },
]

type Profile = 'main' | 'perf'

const profiles: Record<Profile, { cpu: string; gpu: string; vram: string; download: string; install: string; total: string; count: string }> = {
  main: {
    cpu: '12th Gen i5 (Ryzen 7) or higher',
    gpu: '30 Series (RX 6000) with 12 GB VRAM',
    vram: 'Up to 10.5 GB',
    download: '~147 GB',
    install: '~178 GB',
    total: '~325 GB',
    count: '1881 mods · 1377 plugins · 126 ESPs',
  },
  perf: {
    cpu: '10th Gen i5 (Ryzen 5) or higher',
    gpu: '20 Series (VEGA) with 8 GB VRAM',
    vram: 'Up to 7.5 GB',
    download: '~133 GB',
    install: '~183 GB',
    total: '~316 GB',
    count: '1863 mods · 1301 plugins · 125 ESPs',
  },
}

const hotkeys: [string, string][] = [
  ['ENB', 'SHIFT + ENTER'],
  ['Community Shaders', 'END'],
  ['KreatE', 'HOME'],
  ['Open Animation Replacer', 'SHIFT + O'],
  ['Immersive Equipment Displays', 'BACKSPACE'],
  ['Improved Camera SE', 'SHIFT + HOME'],
  ['SmoothCam toggle', 'UP ARROW'],
  ['Switch shoulders', 'M4'],
  ['Third person zoom', 'M5'],
  ['Simplest Horses', 'H'],
  ['iHUD / moreHUD', 'X'],
  ['Toggle HUD', 'N'],
  ['Dual wield blocking', 'V'],
  ['AutoHorse', 'B'],
  ['Teleport followers to you', 'G'],
  ['Photo Mode', '\\'],
  ['Object Manipulation Overhaul', "'"],
  ['Hotkey reminder', 'F11'],
]

const faqs: FaqItem[] = [
  {
    q: 'What is CSVP?',
    a: (
      <>
        <p>An immersive, vanilla-focused modlist built on the visuals in Next Generation Visual Overhaul. It is a packaged experience you can play immediately after download, but sparing enough in sweeping overhauls to allow customisation.</p>
        <p>Skyrim Anniversary Edition with the full $20 upgrade is required, and CSVP runs on 1.6.1170.</p>
      </>
    ),
  },
  {
    q: 'How is it different from NGVO?',
    a: (
      <>
        <p>NGVO is a high-end visual baseline — it focuses on graphics and was designed to be built upon. CSVP adds hundreds of gameplay mods to enrich the experience and bring the author's vision for Skyrim to fruition.</p>
        <p>It is also not a one-to-one baseline: quite a few things were changed visually to personal taste, and NGVO requirements like the Creation Kit and BodySlide Studio were removed to streamline setup.</p>
      </>
    ),
  },
  {
    q: 'Main or Performance — which do I want?',
    a: (
      <>
        <p>The two versions are completely identical gameplay and backend systems-wise. The difference is strictly visual and performance focused: Main can use up to 10.5 GB of VRAM in the most taxing areas, while Performance uses downscaling and a different combination of flora mods to limit that to 7.5 GB.</p>
        <p>As of update 2.1 Performance is also on ENB, and FrameGen ships as an optional for both versions — off by default so you can experiment after install.</p>
      </>
    ),
  },
  {
    q: 'How do I enable a gamepad?',
    a: (
      <>
        <p>Three steps: bind Dual Wield Block to <strong>L1</strong> in Valhalla's MCM, activate the <strong>Controller Config (ON)</strong> profile in the MCM Recorder menu, then open and close moreHUD's MCM. To switch back, bind Dual Wield Block to V again and activate Controller Config (OFF).</p>
        <p>Hotkeys 1–6 need to be set on the keyboard — they are mapped but cannot be assigned by the gamepad itself. With STB Hotkey Quick Cast you can swap between powers and shouts on the fly by binding them to a hotkey.</p>
        <div style={{ marginTop: 4 }}>
          <YouTubeEmbed id="VxIci4aqVpg" title="CSVP gamepad setup" radius={11} />
        </div>
      </>
    ),
  },
  {
    q: 'Where is my HUD? How do I change FOV?',
    a: (
      <>
        <p>iHUD, A Matter of Time and moreHUD are all bound to <strong>X</strong> by default, so nearly all UI hides unless you hold it — and the crosshair only appears when sneaking or using ranged weapons and magic. Set those three to “Always Active” in their MCMs if you would rather not. <strong>N</strong> still fully toggles the HUD.</p>
        <p>FOV is handled by Improved Camera SE, which has its own menu for fine tuning.</p>
      </>
    ),
  },
  {
    q: 'Do I have to play the cart intro?',
    a: <p>CSVP is intended to be used with the vanilla cart opening, but it is optional. Skip the intro and you start at the end of the Helgen cave, with a chest of starter items outside under a tree to your right.</p>,
  },
]

const shots: Shot[] = [
  { src: 'assets/heroes/csvp-talos.webp', alt: 'Whiterun market' },
  { src: 'assets/logos/CSVP-cover.webp', alt: 'CSVP cover art' },
  { src: 'assets/heroes/partysnax.webp', alt: 'Landscape vista' },
]

const ext = { target: '_blank', rel: 'noopener' } as const

/** Colloquy's Skyrim Vanilla Plus — modlist page. */
export function Csvp() {
  useTitle(pageTitle('CSVP'))
  const [profile, setProfile] = useState<Profile>('main')
  const p = profiles[profile]

  return (
    <>
      <ModlistHero
        image="assets/heroes/csvp-talos.webp"
        position="center 45%"
        logo="assets/logos/CSVP.webp"
        logoAlt="CSVP"
        title="Colloquy's Skyrim Vanilla Plus"
        blurb="NGVO's visuals with hundreds of gameplay mods layered on — a packaged Vanilla Plus experience you can play immediately, sparing enough in sweeping overhauls that you can still make it yours."
        chips={[
          { label: 'Skyrim AE 1.6.1170' },
          { label: 'by TheConversation' },
          { label: '1881 mods', gold: true },
          { label: 'An NGVO fork' },
        ]}
      >
        <a href={NEXUS} {...ext} className="btn btn--gold btn--glow"><DownloadIcon />Get the Wabbajack file</a>
        <a href={LOAD_ORDER} {...ext} className="btn btn--ghost">Load order</a>
        <a href={PLAYLIST} {...ext} className="btn btn--ghost">Showcases</a>
        <Link to={readmePath('csvp')} className="btn btn--gold-outline"><BookIcon />Read Me</Link>
        <Link to={guidePath('csvp-colloquy-guide')} className="btn btn--gold-outline">
          <StrokeIcon size={17} stroke="currentColor">
            <path d="M2 4.5A1.5 1.5 0 0 1 3.5 3H9a3 3 0 0 1 3 3v15a2.5 2.5 0 0 0-2.5-2.5H2Z" />
            <path d="M22 4.5A1.5 1.5 0 0 0 20.5 3H15a3 3 0 0 0-3 3v15a2.5 2.5 0 0 1 2.5-2.5H22Z" />
          </StrokeIcon>
          Guides
        </Link>
      </ModlistHero>

      <SectionNav items={nav} />

      <div className="container">
        {/* ---- Overview ---------------------------------------------------- */}
        <section id="overview" className={s.overview}>
          <div className="grid grid--2">
            <div>
              <p className="eyebrow">Overview</p>
              <h2 className={`h2 ${s.h2Loose}`}>That 2011 feeling, with 2026 visuals</h2>
              <p className={s.overviewP}>A true homebrewed vanilla experience — it was important that this list feels like something anyone can make. Many of NGVO's systems and requirements were taken out to streamline everything: no Creation Kit, no BodySlide Studio.</p>
              <p className={s.overviewP}>Colloquy is a proud vanilla apologist, so the only goal was a fresh coat of paint. No custom followers, no new lands, no sweeping changes to combat or world scaling. Everything present has simply been enhanced.</p>
              <div className={s.quote}>
                <div>
                  <p className={s.quoteLabel}>From the author</p>
                  <p className={s.quoteText}>“This isn't an ongoing project or anything, it is simply my personal Modlist that I wanted to make accessible for the people close to me. Please don't expect the work of an expert — I am only a passionate fan.”</p>
                </div>
              </div>
            </div>
            <YouTubeEmbed id="asuwknZghMU" title="CSVP trailer" />
          </div>
        </section>

        {/* ---- How it plays ------------------------------------------------ */}
        <section id="philosophy" className={s.philosophy}>
          <p className="eyebrow">How it plays</p>
          <h2 className={`h2 ${s.h2Tight}`}>CSVP is about taking your time</h2>
          <p className={`lead ${s.intro} ${s.introPhilosophy}`}>Questlines are stretched out, fast travel is limited in an immersive way, and you can trip on a rug if you move haphazardly. Everything about this list asks you to slow down.</p>
          <div className="grid grid--cards">
            <FeatureCard
              title="Survival, softened"
              icon={<StrokeIcon><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 14" /></StrokeIcon>}
            >
              Custom scaled Master difficulty with Survival Mode on — but hunger, warmth and rest are toned right down. They exist to give you an excuse to relax at an inn, not to punish you.
            </FeatureCard>
            <FeatureCard
              title="Exploration pays"
              icon={<StrokeIcon><path d="m2 20 5-14 5 8 3-4 7 10H2Z" /><circle cx="17" cy="5" r="2" /></StrokeIcon>}
            >
              Fast travel is limited, but exploring levels your character. Carriages, horseback, ferries and the landscape itself all work together to make Skyrim the most explorable it has ever been.
            </FeatureCard>
            <FeatureCard
              title="Combat that rewards skill"
              icon={<StrokeIcon><path d="M14.5 17.5 3 6V3h3l11.5 11.5" /><path d="m13 19 6-6" /><path d="m16 16 4 4" /><path d="m19 21 2-2" /></StrokeIcon>}
            >
              Hard at the start, incentivising preparation, eventually building into a late-game power fantasy. A custom level curve keeps things from stagnating as a playthrough goes on.
            </FeatureCard>
            <FeatureCard
              title="AE content, curated"
              icon={<StrokeIcon><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></StrokeIcon>}
            >
              Built on AE, but a lot of its content was cut or reworked for lore reasons and personal taste. Everything that remains has been integrated into the world properly.
              <span className={s.disabled}>Disabled: Sunder &amp; Wraithguard, Umbra, Staff of Sheogorath, Divine Crusader, Arms of Chaos, Bow of Shadows, Plague of the Dead, Dawnfang &amp; Duskfang, Saturalia, Shadowfoot Sanctum, Bloodchill Manor, Hendraheim, Civil War Champions.</span>
            </FeatureCard>
          </div>
        </section>

        {/* ---- Requirements ------------------------------------------------ */}
        <section id="specs" className="section">
          <div className="section-head">
            <div>
              <h2 className={`h2 ${s.h2Sub}`}>System requirements</h2>
              <p className={s.subtitle}>Two profiles, identical gameplay. The difference is strictly visual and performance.</p>
            </div>
            <SpecToggle<Profile>
              options={[{ key: 'main', label: 'Main' }, { key: 'perf', label: 'Performance' }]}
              value={profile}
              onChange={setProfile}
            />
          </div>

          <SpecCards
            cards={[
              { label: 'CPU', value: p.cpu },
              { label: 'RAM', value: '16 GB' },
              { label: 'GPU', value: p.gpu, gold: true },
              { label: 'Peak VRAM use', value: p.vram },
            ]}
          />
          <SizeCards
            sizes={[
              { label: 'Download', value: p.download },
              { label: 'Install', value: p.install },
              { label: 'Total', value: p.total },
              { label: 'Contents', value: <span className={s.countValue}>{p.count}</span> },
            ]}
          />

          <Callout title="Read this before you start">
            <p>CSVP requires Skyrim updated to <strong>1.6.1170</strong> with the full Anniversary Edition upgrade. Only <strong>English Steam</strong> versions are supported — GOG and other languages are not.</p>
            <p>Windows 10 or 11, version 21H2 or newer. LTSC and modified variants will not work. Running from an HDD or external drive is strongly advised against — though you can move or delete the Downloads folder after install if space is tight.</p>
          </Callout>
        </section>

        {/* ---- Installation ------------------------------------------------ */}
        <section id="install" className="section">
          <p className="eyebrow">Read me</p>
          <h2 className={`h2 ${s.h2Tight}`}>Installation</h2>
          <p className={`lead ${s.introNarrow} ${s.introInstall}`}>Only the Main version appears in the Wabbajack UI — enable “Non Featured” lists when searching. Performance is a separate download from the Nexus page. Both install the same way.</p>

          <Link to={readmePath('csvp')} className={s.readmeBand}>
            <div className={s.readmeInner}>
              <BookIcon size={22} stroke="#F0C070" className={s.readmeIcon} />
              <div>
                <p className={s.readmeTitle}>Full CSVP Read Me</p>
                <p className={s.readmeText}>The summary below covers the shape of the install. The Read Me has every step in full, maintained by the modlist author.</p>
              </div>
            </div>
            <span className={`btn btn--gold btn--xs ${s.readmeBtn}`}>Open Read Me</span>
          </Link>

          <div className={s.installGrid}>
            <StepList
              number={1}
              title="Pre-installation"
              steps={[
                <>Install <a href="https://aka.ms/vs/17/release/vc_redist.x64.exe" {...ext}>Visual C++ x64</a> and the <a href="https://dotnet.microsoft.com/en-us/download/dotnet/8.0" {...ext}>.NET desktop runtime x64</a>.</>,
                <>Stop Skyrim from <a href="https://help.steampowered.com/en/faqs/view/71AB-698D-57EB-178C#disable" {...ext}>auto-updating</a>.</>,
                <>Fully uninstall Skyrim — the game folder <em>and</em> the Skyrim Special Edition folder in <span className="mono">\Documents\My Games\</span>.</>,
                <>Disable OneDrive and anything else that hooks into user file areas.</>,
                <>Reinstall Skyrim outside Program Files — somewhere like <span className="mono">C:\Games</span>.</>,
                <>Start the game once and let it run the graphics check.</>,
                <>Launch to the main menu and let the Creation Club files download. <strong>Do not verify your game files.</strong></>,
                <>Remove or disable third-party antivirus such as MalwareBytes or Webroot.</>,
              ]}
            />
            <div className={s.installCol}>
              <StepList
                number={2}
                title="Install from disk"
                steps={[
                  <>Put <a href={site.wabbajack} {...ext}>Wabbajack</a> in a folder like <span className="mono">C:\Games\Wabbajack</span>. CSVP always needs the latest version.</>,
                  <>Download the CSVP Wabbajack file from Main Files on the <a href={NEXUS} {...ext}>Nexus page</a>. That is the only thing you need from Nexus.</>,
                  <>In Wabbajack go to <strong>Browse Lists</strong>, then <strong>Install from Disk</strong>, and select that file.</>,
                  <>Set the install folder to something like <span className="mono">C:\CSVP</span> — not desktop, downloads or Program Files.</>,
                  <>Download and install locations can differ if storage is a concern. Press play and go pet your nearest fluffy animal.</>,
                  <>These same steps are how you update an already-installed list.</>,
                ]}
              />
              <StepList
                number={3}
                title="First launch"
                steps={[
                  <>Run <span className="mono">ModOrganizer.exe</span> from the install folder.</>,
                  <>On first open the CC files sit outside their separator. Optionally drag them into <strong>CORE FILES</strong>, above the Cleaned Plugins mod so it can overwrite them.</>,
                  <>Widescreen users: check the noted separators and mods before loading in.</>,
                  <>Set the dropdown on the right to <strong>CSVP - A NGVO Fork</strong> and press Run.</>,
                  <>Screenshots save to <span className="mono">CSVP\overwrite</span>.</>,
                ]}
              />
            </div>
          </div>
        </section>

        {/* ---- Guides ------------------------------------------------------ */}
        <section id="guides" className="section">
          <p className="eyebrow">Guides</p>
          <h2 className={`h2 ${s.h2Tight}`}>Written by Colloquy</h2>
          <p className={`lead ${s.intro} ${s.introGuides}`}>One guide for playing the list, one for taking it apart. Both live as markdown, so the author can edit them whenever the list changes.</p>
          <div className={s.guideGrid}>
            <Link to={guidePath('csvp-colloquy-guide')} className={s.guideCard}>
              <StrokeIcon size={26} className={s.guideIcon}>
                <path d="M12 3 4 6.5v6c0 5 3.4 7.7 8 8.5 4.6-.8 8-3.5 8-8.5v-6L12 3Z" />
                <path d="m9 12 2 2 4-4" />
              </StrokeIcon>
              <h3 className={s.guideTitle}>Colloquy's Guide</h3>
              <p className={s.guideText}>Twelve chapters on how CSVP plays — levelling, questline gating, followers, the Civil War, economy and difficulty. Read this before your first playthrough.</p>
              <div className={s.tags}>
                <span className={s.tag}>Gameplay</span>
                <span className={s.tag}>12 sections</span>
              </div>
              <span className={s.guideCta}>Read the guide →</span>
            </Link>
            <Link to={guidePath('csvp-modification-manual')} className={s.guideCard}>
              <StrokeIcon size={26} className={s.guideIcon}>
                <path d="M20.3 5.7a4.5 4.5 0 0 1-5.9 5.9L6 20a2.1 2.1 0 1 1-3-3l8.4-8.4a4.5 4.5 0 0 1 5.9-5.9l-2.6 2.6.9 3.5 3.5.9 2.2-2.6Z" />
              </StrokeIcon>
              <h3 className={s.guideTitle}>Modification Manual</h3>
              <p className={s.guideText}>Adding mods of your own? This is what to rerun and in what order — Synthesis, VRAMr, ParallaxGen, xLODGen, TexGen, DynDOLOD, grass cache, ENB swaps and Pandora.</p>
              <div className={s.tags}>
                <span className={s.tag}>Advanced</span>
                <span className={s.tag}>With screenshots</span>
              </div>
              <span className={s.guideCta}>Open the manual →</span>
            </Link>
          </div>

          <Callout kind="warning" icon={false} className={s.warn}>
            <p className={s.warnLabel}>Before you modify</p>
            <p className={s.warnText}>Do not file official bug reports if you have changed anything in the list. Ask in the chats instead — help is happily given either way.</p>
          </Callout>
        </section>

        {/* ---- Troubleshooting --------------------------------------------- */}
        <section id="troubleshooting" className="section">
          <h2 className={`h2 ${s.h2Tight}`}>Troubleshooting</h2>
          <p className={`lead ${s.intro} ${s.introTrouble}`}>Rule of thumb: a browser window on failure means you are missing files from Skyrim itself. No browser means a Wabbajack issue — rerunning usually solves it. A system error usually means antivirus, and Windows Defender counts.</p>
          <div className="grid grid--tiles">
            <TroubleTile title="Could not download x">
              Large files fail on flaky connections. Rerun Wabbajack, or download manually into the same downloads folder. Make sure you own all the paid AE content.
            </TroubleTile>
            <TroubleTile title="x is not a whitelisted download">
              This happens while the list is being updated. Check for a new version or wait for the release ping in Discord.
            </TroubleTile>
            <TroubleTile title="Antivirus reports a virus">
              A pre-installation step was skipped. If you did follow them, add a Windows Defender exclusion for Mod Organizer.
            </TroubleTile>
            <TroubleTile title="Head skin tone bugs out on a new game" tone="gold">
              Almost always happens. Open the console, type <span className="mono">showracemenu</span>, confirm your character once more and it will not recur this playthrough.
            </TroubleTile>
            <TroubleTile title="Crash after dying and reloading" tone="gold">
              A DynDOLOD DLL NG issue. Disable the DLL and rerun DynDOLOD to fall back to papyrus scripts — heavier on FPS and worse LODs, but stable.
            </TroubleTile>
            <div className={s.tileGreen}>
              <p className={s.tileGreenTitle}>Optional post-game tidying</p>
              <p className={s.tileBody}>SKSE, ShaderCache and MCM files from Overwrite can go into <strong className="strong">CSVP - MCM &amp; INI Settings</strong>; KiLoader files into <strong className="strong">KiLoader Output</strong>. The <span className="mono">textures</span> folder is PhotoMode output and always regenerates.</p>
            </div>
            <StuckTile
              text="Post your Wabbajack or MO2 log in the CSVP channel and someone will take a look."
              href={site.discord}
            />
          </div>
        </section>

        {/* ---- Hotkeys ----------------------------------------------------- */}
        <section id="hotkeys" className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Reference</p>
              <h2 className="h2">Hotkeys</h2>
            </div>
            <p className={s.hotkeyNote}>Press <span className={s.kbd}>F11</span> in game for a reminder</p>
          </div>
          <div className={s.hotkeyWrap}>
            <div className={s.hotkeys} role="table" aria-label="CSVP hotkeys">
              {hotkeys.map(([label, key]) => (
                <div key={label} className={s.hotkeyRow} role="row">
                  <span className={s.hotkeyLabel} role="cell">{label}</span>
                  <span className={s.keycap} role="cell">{key}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- FAQs -------------------------------------------------------- */}
        <section id="faqs" className="section">
          <FaqAccordion items={faqs} />
        </section>

        {/* ---- Showcase ---------------------------------------------------- */}
        <section id="gallery" className={`section ${s.galleryWrap}`}>
          <Gallery
            shots={shots}
            title="See it in motion"
            extra={
              <>
                <YouTubeEmbed id="CClrbI8RK7k" title="CSVP showcase" radius={12} className={`${s.videoTile} ${s.videoWide}`} />
                <YouTubeEmbed id="VxIci4aqVpg" title="CSVP gamepad setup" radius={12} className={s.videoTile} />
              </>
            }
          />
        </section>

        <DiscordBand
          title="Our Discord is the hub for all things CSVP"
          text="“I would love to have you join! I'm always open to hearing suggestions and additions you made to your personal list that could be thrown in here.”"
          secondary={{ href: NEXUS, label: 'Nexus page' }}
          credits={<>Credits — <strong style={{ color: 'var(--text-2)' }}>you</strong> for reading this, Biggie_Boss for NGVO, JaySerpa for GTS, Halgari and the Wabbajack team, every mod author whose work made this list possible, and everyone in the Modding Bungalo Discord.</>}
        />
      </div>
    </>
  )
}
