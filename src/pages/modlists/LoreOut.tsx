import { Link } from 'react-router'
import { useTitle } from '../../components/layout/ScrollManager'
import { Callout } from '../../components/ui/Callout'
import { DiscordBand } from '../../components/ui/DiscordBand'
import { BookIcon, DownloadIcon, StrokeIcon } from '../../components/ui/Icons'
import { ModlistHero } from '../../components/ui/ModlistHero'
import { SectionNav, type SectionNavItem } from '../../components/ui/SectionNav'
import { SpecCards } from '../../components/ui/Specs'
import { FeatureCard, StepList } from '../../components/ui/Steps'
import { YouTubeEmbed } from '../../components/ui/YouTubeEmbed'
import { readmePath } from '../../data/modlists'
import { pageTitle, site } from '../../data/site'
import styles from './LoreOut.module.css'

const NAV: SectionNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: "What's changed" },
  { id: 'specs', label: 'Requirements' },
  { id: 'install', label: 'Installation' },
  { id: 'setup', label: 'Post-install' },
  { id: 'mods', label: 'Key mods' },
]

const ext = { target: '_blank', rel: 'noopener' } as const

const nexus = (id: number) => `https://www.nexusmods.com/fallout4/mods/${id}`

const MODS: { label: string; links: { id: number; name: string }[] }[] = [
  {
    label: 'Gameplay',
    links: [
      { id: 76739, name: 'You Are Exceptional — Skills & Perks' },
      { id: 48185, name: 'Classic Radiation Poisoning 2' },
      { id: 50555, name: 'Immersive Animation Framework' },
      { id: 61732, name: 'Silent Protagonist F4SE' },
    ],
  },
  {
    label: 'Quests',
    links: [
      { id: 43979, name: 'Fourville' },
      { id: 60330, name: 'Fallout 4 — Point Lookout' },
      { id: 73657, name: 'Brothers in Arms — Return Of The Outcasts' },
      { id: 61305, name: 'Commonwealth Killer' },
      { id: 70031, name: 'Loaded Bases' },
    ],
  },
  {
    label: 'New things',
    links: [
      { id: 68187, name: 'Mutant Menagerie — Life Finds A Way' },
      { id: 49680, name: 'DC and West Coast Supermutants' },
      { id: 50007, name: 'Capital Wasteland Raider Pack' },
      { id: 57161, name: 'Mojave Cazadores' },
    ],
  },
]

function Tile({ title, gold, red, children }: { title: string; gold?: boolean; red?: boolean; children: React.ReactNode }) {
  return (
    <div className={`${styles.tile} ${gold ? styles.tileGold : ''} ${red ? styles.tileRed : ''}`}>
      <h3 className={styles.tileTitle}>{title}</h3>
      <p className={styles.tileText}>{children}</p>
    </div>
  )
}

export function LoreOut() {
  useTitle(pageTitle('LoreOut'))

  return (
    <>
      <ModlistHero
        image="assets/heroes/loreout.webp"
        position="center 45%"
        logo="assets/logos/LoreOut.webp"
        logoAlt="LoreOut"
        title="The Modern Roleplaying Modlist"
        blurb="A modern, immersive, lore-focused reimagining of Fallout 4 with over 800 mods. From the maker of Wasteland Reborn, in collaboration with the author of LoreRim. Dive in and don't give up."
        chips={[
          { label: 'Latest Fallout 4' },
          { label: 'by Camora0' },
          { label: '800+ mods', gold: true },
          { label: 'Survival difficulty' },
        ]}
        className={styles.hero}
      >
        <a href={site.wabbajack} {...ext} className="btn btn--gold btn--glow"><DownloadIcon />Install with Wabbajack</a>
        <a href={site.discord} {...ext} className="btn btn--ghost">Support</a>
        <Link to={readmePath('loreout')} className="btn btn--gold-outline"><BookIcon />Read Me</Link>
      </ModlistHero>

      <SectionNav items={NAV} />

      <div className={`container ${styles.page}`}>
        <section id="overview" className={styles.overview}>
          <div className="grid grid--2">
            <div>
              <p className="eyebrow">Overview</p>
              <h2 className={`h2 ${styles.h2Overview}`}>A full redesign of Fallout 4</h2>
              <p className={styles.para}>Every aspect has been shaped to enhance gameplay, visuals and roleplayability. An auto-installing Wabbajack list filled with some of the best mods the community has to offer, designed for replayability so no two playthroughs are the same.</p>
              <Callout kind="warning" icon={false} className={styles.tagCallout}>
                <p className={styles.tag}>A note about difficulty</p>
                <p>LoreOut is built around a custom tweaked <strong>Survival</strong> setting — the only staff-supported difficulty. Read up on what the overhauls do, especially the perks and skills in You Are Exceptional. Difficulty is adjustable, but it is tuned for a more involved experience out of the box. Don't get discouraged.</p>
              </Callout>
            </div>
            <YouTubeEmbed id="NccDkn4NZFU" title="LoreOut installation" />
          </div>
        </section>

        <section id="features" className={styles.features}>
          <h2 className={`h2 ${styles.h2Features}`}>What's changed</h2>
          <div className="grid grid--cards">
            <FeatureCard
              title="Gunplay and roleplaying"
              icon={<StrokeIcon><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 3v3" /><path d="M12 18v3" /><path d="M3 12h3" /><path d="M18 12h3" /></StrokeIcon>}
            >
              Built on Lunar Fallout Overhaul Deluxe and You Are Exceptional. Skills are back, perks matter, weapons are rebalanced and modernised while staying lore-friendly. Aim for weak spots — enemies can do the same to you.
            </FeatureCard>
            <FeatureCard
              title="Visuals and atmosphere"
              icon={<StrokeIcon><path d="m2 20 5-14 5 8 3-4 7 10H2Z" /><circle cx="17" cy="5" r="2" /></StrokeIcon>}
            >
              NAC X weathers, Reactor ENB and a plethora of landscape, water and foliage overhauls. NPCs reimagined from concept art. Every tool used to get LODs and precombines done the right way.
            </FeatureCard>
            <FeatureCard
              title="Armors, weapons, collectibles"
              icon={<StrokeIcon><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></StrokeIcon>}
            >
              Items placed around the world or injected into leveled lists, so every enemy might drop something unique. No modern real-life weapons — only what canon confirms. Check every container.
            </FeatureCard>
            <FeatureCard
              title="Quests, lands, settlements"
              icon={<StrokeIcon><path d="M3 21h18" /><path d="M5 21V8l7-5 7 5v13" /><path d="M10 21v-6h4v6" /></StrokeIcon>}
            >
              Fourville, America Rising 2, Tales of the Commonwealth and more. New companions like Molly. Settlement building simplified with Rebuild Collection AIO — repair, then decorate and populate.
            </FeatureCard>
          </div>
        </section>

        <section id="specs" className="section">
          <h2 className={`h2 ${styles.h2Specs}`}>System requirements</h2>
          <p className={styles.specSub}>Recommended for roughly 90–120 FPS at 1080p.</p>
          <SpecCards
            cards={[
              { label: 'CPU', value: 'Ryzen 7 5700X3D or Intel equivalent' },
              { label: 'GPU', value: 'Radeon 6700XT / RTX 3070', gold: true },
              { label: 'RAM', value: '32 GB on Windows · 16 GB on Linux' },
              { label: 'Storage', value: 'SSD or M.2 NVMe' },
            ]}
          />
          <Callout kind="warning" title="An SSD is absolutely required">
            <p>Hard drives are too slow for stable performance and can cause install and general issues. The instance <strong>must</strong> be on an SSD — the downloads folder can live elsewhere.</p>
            <p>You must use a <strong>full, latest, English Steam</strong> Fallout 4 with all DLC and <em>without</em> high-res textures. Do not downgrade the game — LoreOut runs on the <strong>latest version</strong>. Linux is not officially supported.</p>
          </Callout>
        </section>

        <section id="install" className="section">
          <p className="eyebrow">Read me</p>
          <h2 className={`h2 ${styles.h2Tight}`}>Installation</h2>
          <p className={`lead ${styles.introWide}`}>Install LoreOut to the same drive as Fallout 4, and keep both out of <span className={`mono ${styles.mono15}`}>\Program Files\</span>.</p>

          <Link to={readmePath('loreout')} className={styles.readme}>
            <div className={styles.readmeLeft}>
              <BookIcon size={22} stroke="#F0C070" className={styles.readmeIcon} />
              <div>
                <p className={styles.readmeTitle}>Full LoreOut Read Me</p>
                <p className={styles.readmeText}>The summary below covers the shape of the install. The Read Me has every step in full, maintained by the modlist author.</p>
              </div>
            </div>
            <span className={styles.readmeBtn}>Open Read Me</span>
          </Link>

          <div className={styles.installGrid}>
            <StepList
              number={1}
              title="Pre-installation"
              steps={[
                <>Add <span className="mono">f4se.exe</span> and <span className="mono">ModOrganizer.exe</span> as antivirus / Defender exceptions.</>,
                <>Install the <a href="https://aka.ms/vs/16/release/vc_redist.x64.exe" {...ext}>Visual C++ x64 redistributable</a> — required by MO2.</>,
                <>In Steam properties → Updates, set automatic updates to <strong>only update on launch</strong>. Turn off Steam Overlay, Medal and other overlays.</>,
                <>Disable your GPU's own upscaling and frame generation in the Nvidia settings — LoreOut provides its own.</>,
                <>Clean Fallout 4: uninstall through Steam, delete the game folder, the <span className="mono">Fallout4</span> folder in Documents/My Games, and everything in <span className="mono">%LocalAppData%/Fallout 4</span>. <strong>Back up saves first.</strong></>,
                <>Reinstall, run the Launcher once for the graphics check — then never launch through it again or it reverts your INIs.</>,
              ]}
            />
            <div>
              <StepList
                number={2}
                title="Wabbajack"
                steps={[
                  <>Put <a href={site.wabbajack} {...ext}>Wabbajack.exe</a> in a root-level folder like <span className="mono">C:\Wabbajack</span> — never Desktop, Downloads or Program Files.</>,
                  <>Click <strong>Browse Lists</strong>, tick <strong>Non-featured</strong> below the search bar, then pick LoreOut.</>,
                  <>Use a blank folder at the root of a drive, ideally not C — e.g. <span className="mono">D:\LoreOut</span>. Then hit Install.</>,
                  <>If downloads fail, rerun before asking in Discord — it resumes. Otherwise sign out of Nexus via the gear icon, restart Wabbajack, sign back in.</>,
                ]}
              />
              <Callout kind="important" icon={false} title="Missing Nexus files" className={styles.nexusCallout}>
                <p>Two mods were removed from Nexus and must be fetched externally. Start the install; if it fails, close Wabbajack, drop the zips into <span className="mono" style={{ color: 'var(--gold-light)' }}>LoreOut/Downloads</span>, and rerun — it resumes. Grab MiscHairstyle 1.6 and MoreHairstyles-MoreBeards from <a href="https://fo4-mischairstyle.tumblr.com/post/139169515871/mischairstyle16-download-47-new-hairs-for-male" {...ext}>fo4-mischairstyle.tumblr.com</a>.</p>
              </Callout>
            </div>
          </div>
        </section>

        <section id="setup" className="section">
          <h2 className={`h2 ${styles.h2Setup}`}>Post-installation</h2>
          <div className="grid grid--tiles">
            <Tile title="Pick your resolution">
              Near the bottom of MO2's left pane find <strong>“INI SETTINGS - Choose only one!”</strong> and select the file for your display. Ultrawide users also activate the matching option under OPTIONAL PLUGINS.
            </Tile>
            <Tile title="Zoomed or misaligned display">
              Right-click <span className="mono">LoreOut\Stock Game\Fallout4.exe</span> → Properties → Compatibility → Change High DPI settings → Enable Override → set scaling to Application. A few users need the same on <span className="mono">f4se_loader.exe</span>.
            </Tile>
            <Tile title="Launching the game">
              Set the MO2 dropdown to <strong>LoreOut</strong> and press Run. You must launch through Mod Organizer — it handles most mods via its virtual file system.
            </Tile>
            <Tile title="Required MCM setup" gold>
              Imperative for the intended experience. Create your character, exit the vault, press ESC → Mod Config → MCM settings → “MCM Settings” dropdown → <strong>MCM Settings Manager</strong> → Apply. Return to the game and choose <strong>Remove</strong> on the Legendary effects popup. Save, quit to desktop, restart.
            </Tile>
            <Tile title="Updating" red>
              Check the changelog first — it says whether the update is save-safe. Rerun Wabbajack to overwrite. It <strong>deletes every file that is not part of the list</strong>; prefix a mod's name with <span className="mono">[NoDelete]</span> to keep it, though added mods are unsupported.
            </Tile>
            <Tile title="Removing the list">
              Just remove the install folder. Simple as.
            </Tile>
          </div>
        </section>

        <section id="mods" className="section">
          <h2 className={`h2 ${styles.h2Tight}`}>Key mods</h2>
          <p className={`lead ${styles.intro}`}>A fraction of the 800+ in the list — these are the ones most worth reading up on before you start.</p>
          <div className={styles.modsGrid}>
            {MODS.map((group) => (
              <div key={group.label}>
                <p className={styles.subLabel}>{group.label}</p>
                <div className={styles.modList}>
                  {group.links.map((m) => (
                    <a key={m.id} href={nexus(m.id)} {...ext} className={styles.modLink}>{m.name}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <DiscordBand
          title="Hosted in the Bungalo"
          text="LoreOut's support, install help and changelogs all live in the Discord."
          primaryLabel="Join the Discord"
          credits={<>Credits — <strong className={styles.creditStrong}>you</strong> for reading and playing, Biggie_Boss for the collab, Alexerator, RetroPaladin, Micalov, DegenerateDak, CSEPteam, ShimSham, Grilledturkey, VishVadeva and the F4NV, Project Mojave and F4CW teams, Ungeziefi for The Midnight Ride, and A Raven of Many Hats.</>}
        />
      </div>
    </>
  )
}
