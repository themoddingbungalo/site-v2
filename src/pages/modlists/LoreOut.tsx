import { Link } from 'react-router'
import { useTitle } from '../../components/layout/ScrollManager'
import { Callout } from '../../components/ui/Callout'
import { DiscordBand } from '../../components/ui/DiscordBand'
import { Gallery, shotsFor, type Shot } from '../../components/ui/Gallery'
import { BookIcon, DownloadIcon, StrokeIcon } from '../../components/ui/Icons'
import { ModlistHero } from '../../components/ui/ModlistHero'
import { ReadMeCard } from '../../components/ui/ReadMeCard'
import { SectionNav, type SectionNavItem } from '../../components/ui/SectionNav'
import { SpecCards } from '../../components/ui/Specs'
import { FeatureCard } from '../../components/ui/Steps'
import { Tile } from '../../components/ui/Tile'
import { readmePath } from '../../data/modlists'
import { ext, pageTitle, site } from '../../data/site'
import styles from './LoreOut.module.css'

const NAV: SectionNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: "What's changed" },
  { id: 'specs', label: 'Requirements' },
  { id: 'install', label: 'Installation' },
  { id: 'setup', label: 'Post-install' },
  { id: 'mods', label: 'Key mods' },
  { id: 'showcase', label: 'Showcase' },
]

const shot = shotsFor('loreout')

// The first two shots are 2x2, which packs the ten into four complete rows of the
// four-column grid. There is no video tile here.
const SHOTS: Shot[] = [
  { ...shot('immense', 'A long walk through overgrown woodland'), feature: true },
  { ...shot('aura-farming-nuke', 'Watching a distant blast from the treeline'), feature: true },
  shot('city', 'A ruined main street, still standing'),
  shot('what-remains', "What's left of the suburbs"),
  shot('stop-for-fuel', 'An old filling station at dusk'),
  shot('city-in-distance', 'A skyline through the haze'),
  shot('interior-ruins', 'Light through a gutted building'),
  shot('fresh-kill', 'Standing over a fresh kill'),
  shot('nuke', 'A detonation lights up the horizon'),
  shot('dog-cave', 'A dog waiting in the dark'),
]

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

export function LoreOut() {
  useTitle(pageTitle('LoreOut'))

  return (
    <>
      <ModlistHero
        image="assets/heroes/loreout.webp"
        position="center 45%"
        scrimClassName={styles.scrim}
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
      >
        <a href={site.wabbajack} {...ext} className="btn btn--gold btn--glow"><DownloadIcon />Install with Wabbajack</a>
        <a href={site.discord} {...ext} className="btn btn--ghost">Support</a>
        <Link to={readmePath('loreout')} className="btn btn--gold-outline"><BookIcon />Read Me</Link>
      </ModlistHero>

      <SectionNav items={NAV} />

      <div className="lit">
        <div className="container">
          <section id="overview" className="section--intro">
            <div className={`flow ${styles.overview}`}>
              <p className="eyebrow">Overview</p>
              <h2 className="h2 head--loose">A full redesign of Fallout 4</h2>
              <p className="lead">Every aspect has been shaped to enhance gameplay, visuals and roleplayability. An auto-installing Wabbajack list filled with some of the best mods the community has to offer, designed for replayability so no two playthroughs are the same.</p>
              <Callout kind="warning" icon={false} compact label="A note about difficulty">
                <p>LoreOut is built around a custom tweaked <strong>Survival</strong> setting — the only staff-supported difficulty. Read up on what the overhauls do, especially the perks and skills in You Are Exceptional. Difficulty is adjustable, but it is tuned for a more involved experience out of the box. Don't get discouraged.</p>
              </Callout>
            </div>
          </section>

          <section id="features" className="section--tight">
            <h2 className="h2 head--gap">What's changed</h2>
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
            <h2 className="h2 head--sub">System requirements</h2>
            <p className={`sub ${styles.specSub}`}>Recommended for roughly 90–120 FPS at 1080p.</p>
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
              <p>You must use a <strong>full, latest, English Steam</strong> Fallout 4 with all DLC and <em>without</em> high-res textures. Do not downgrade the game — LoreOut requires your Steam copy of Fallout 4 to be updated to the <strong>latest version</strong>. Linux is not officially supported.</p>
            </Callout>
          </section>

          <section id="install" className="section">
            <p className="eyebrow">Read me</p>
            <h2 className="h2 head--gap">Installation</h2>
            <ReadMeCard slug="loreout" />
          </section>

          <section id="setup" className="section">
            <h2 className="h2 head--gap">Post-installation</h2>
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
              <Tile title="Required MCM setup" tone="gold">
                Imperative for the intended experience. Create your character, exit the vault, press ESC → Mod Config → MCM settings → “MCM Settings” dropdown → <strong>MCM Settings Manager</strong> → Apply. Return to the game and choose <strong>Remove</strong> on the Legendary effects popup. Save, quit to desktop, restart.
              </Tile>
              <Tile title="Updating" tone="red">
                Check the changelog first — it says whether the update is save-safe. Rerun Wabbajack to overwrite. It <strong>deletes every file that is not part of the list</strong>; prefix a mod's name with <span className="mono">[NoDelete]</span> to keep it, though added mods are unsupported.
              </Tile>
              <Tile title="Removing the list">
                Just remove the install folder. Simple as.
              </Tile>
            </div>
          </section>

          <section id="mods" className="section">
            <h2 className="h2 head--tight">Key mods</h2>
            <p className="lead section-lead">A fraction of the 800+ in the list — these are the ones most worth reading up on before you start.</p>
            <div className={styles.modsGrid}>
              {MODS.map((group) => (
                <div key={group.label}>
                  <p className="label label--gold">{group.label}</p>
                  <div className={styles.modList}>
                    {group.links.map((m) => (
                      <a key={m.id} href={nexus(m.id)} {...ext} className={styles.modLink}>{m.name}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="showcase" className="section">
            <Gallery shots={SHOTS} />
          </section>

          <DiscordBand
            credits={<>Credits — <strong>you</strong> for reading and playing, Biggie_Boss for the collab, Alexerator, RetroPaladin, Micalov, DegenerateDak, CSEPteam, ShimSham, Grilledturkey, VishVadeva and the F4NV, Project Mojave and F4CW teams, Ungeziefi for The Midnight Ride, and A Raven of Many Hats.</>}
          />
        </div>
      </div>
    </>
  )
}
