import { useState } from 'react'
import { Link } from 'react-router'
import { useTitle } from '../../components/layout/ScrollManager'
import { Callout } from '../../components/ui/Callout'
import { DiscordBand } from '../../components/ui/DiscordBand'
import { FaqAccordion, type FaqItem } from '../../components/ui/FaqAccordion'
import { BookIcon, DownloadIcon } from '../../components/ui/Icons'
import { ModlistHero } from '../../components/ui/ModlistHero'
import { ReadMeCard } from '../../components/ui/ReadMeCard'
import { SectionNav, type SectionNavItem } from '../../components/ui/SectionNav'
import { SizeCards, SpecCards, SpecToggle } from '../../components/ui/Specs'
import { KeyRows, Tile } from '../../components/ui/Tile'
import { YouTubeEmbed } from '../../components/ui/YouTubeEmbed'
import { readmePath } from '../../data/modlists'
import { ext, pageTitle, site } from '../../data/site'
import styles from './Dngg.module.css'

const NAV: SectionNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'specs', label: 'Requirements' },
  { id: 'install', label: 'Installation' },
  { id: 'firstplay', label: 'Starting out' },
  { id: 'visuals', label: 'ENB & shaders' },
  { id: 'optional', label: 'Optional mods' },
  { id: 'faqs', label: 'FAQs' },
]

type SpecKey = 'rec' | 'author'
const SPEC_OPTIONS: { key: SpecKey; label: string }[] = [
  { key: 'rec', label: 'Recommended 1080p' },
  { key: 'author', label: "Author's rig" },
]
const SPECS: Record<SpecKey, { cpu: string; gpu: string; ram: string; storage: string; pagefile: string }> = {
  rec: { cpu: '8 core / 16 thread, i9-9900k or better', gpu: '6–8 GB VRAM or more', ram: '16 GB or more', storage: 'SSD or M.2 NVMe', pagefile: '20–40 GB' },
  author: { cpu: 'i9-12900k', gpu: 'RTX 3090', ram: '32 GB', storage: '2 TB M.2 NVMe', pagefile: '40 GB' },
}

const REQUIEM_DISCORD = 'https://discord.gg/JycmyqzZz7'
const GITHUB = 'https://github.com/Arkay-1248/Do-Not-Go-Gentle'

const FAQS: FaqItem[] = [
  {
    q: 'I thought I crashed, but it reloaded my save',
    a: <p>That is Clean Save Auto-reloader, enabled by default to preserve your save from bugs that still exist in Skyrim around saving and reloading. You can turn the mod off, but it is on for a reason.</p>,
  },
  {
    q: 'How do I fast travel?',
    a: (
      <p>
        Some combination of <a href="https://www.nexusmods.com/skyrimspecialedition/mods/71135" {...ext}>More Carriages</a>,{' '}
        <a href="https://www.nexusmods.com/skyrimspecialedition/mods/35418" {...ext}>Wait Carriage in Towns</a>, or travel packs from{' '}
        <a href="https://www.nexusmods.com/skyrimspecialedition/mods/92220" {...ext}>Journeyman</a> — craft packs at a cooking pot, or buy them from general merchants and some innkeepers. There are also teleportation spells from two separate schools of magic.
      </p>
    ),
  },
  {
    q: 'Screenshake in third person?',
    a: <p>Check the Precision MCM first. If that does not cut it, enable the mod to disable screenshake in the Optional separator.</p>,
  },
  {
    q: 'I ran into someone and everyone attacked',
    a: <p>You were sprinting, weren't you. Don't be rude — sprinting full speed into someone would hurt in real life too. There is an option to turn the feature off in the Requiem MCM.</p>,
  },
  {
    q: 'Can you add my favourite mod?',
    a: <p>Maybe, but probably not. If it is a cool weapon or armour there is a chance — the author admits to being a sucker for those. Otherwise, probably not.</p>,
  },
  {
    q: 'Where are my Ebony Vampires?',
    a: <p>Vampire Collection reduces the number of Ebony Vampires while making the Dawnguard bosses stronger. They aren't gone. If you want to find one specifically, go to Forebears Holdout — there is one there.</p>,
  },
]

const ENB_PERFORMANCE = [
  { key: 'Amon ENB', value: 'Heaviest' },
  { key: 'PiCho / Rudy ENB', value: 'Better' },
  { key: 'Amethyst ReShade + KreatE', value: 'Better still' },
  { key: 'Community Shaders alone', value: 'Fastest' },
]

const OPTIONAL = [
  {
    title: 'Journeyman Disabler',
    body: 'Lets you fast travel without Journeyman’s travel packs. Keep it on if you play with survival mode — and probably until level 20 regardless, since that is where Journeyman matters most.',
  },
  {
    title: 'Survival Mode',
    body: 'Included with patches and the Survival Mode Control Panel, but off by default. Turn it on from the vanilla settings page if you want it.',
  },
  {
    title: 'Clean Save Auto-reloader',
    body: 'On by default to protect your save from long-standing Skyrim save/reload bugs. You can turn it off, but it is enabled deliberately.',
  },
  {
    title: 'ENB presets and ReShade',
    body: 'Three ENB presets and Amethyst ReShade can be disabled at any time. Disable ENB Binaries to move to Community Shaders.',
  },
  {
    title: 'Optional nude bodies',
    body: 'Self-explanatory. Both underwear.dll and New Gentleman.dll live inside it, so enabling it also distributes removable underwear to both genders.',
  },
  {
    title: 'Updating the list',
    body: 'Check the changelog and back up saves — some updates need a new game. Keep the same paths, tick overwrite existing modlist. Mods you added get deleted.',
  },
]

export function Dngg() {
  useTitle(pageTitle('Do Not Go Gentle'))
  const [spec, setSpec] = useState<SpecKey>('rec')
  const s = SPECS[spec]

  return (
    <>
      <ModlistHero
        image="assets/logos/DNGG.webp"
        position="center 45%"
        scrimClassName={styles.scrim}
        className={styles.hero}
        eyebrow="Requiem · Bruma · Wyrmstooth · VIGILANT"
        title="Do Not Go Gentle"
        blurb="A Requiem list with Bruma, Wyrmstooth, VIGILANT and plenty more to extend the life of a playthrough. Not built to be painful — Requiem just asks you to plan your actions. A reasonable compromise between difficulty and enjoyment."
        chips={[
          { label: 'Latest Skyrim AE' },
          { label: 'by Abandoned_By_Arkay' },
          { label: '~400 GB total', gold: true },
          { label: 'CC BY-NC-SA 4.0' },
        ]}
      >
        <a href={site.wabbajack} {...ext} className="btn btn--gold btn--glow"><DownloadIcon />Install with Wabbajack</a>
        <a href={GITHUB} {...ext} className="btn btn--ghost">GitHub wiki</a>
        <a href="https://loadorderlibrary.com/lists/do-not-go-gentle" {...ext} className="btn btn--ghost">Full load order</a>
        <Link to={readmePath('dngg')} className="btn btn--gold-outline"><BookIcon />Read Me</Link>
      </ModlistHero>

      <SectionNav items={NAV} />

      <div className="lit">
        <div className="container">
          <section id="overview" className="section--intro">
            <div className="grid grid--2">
              <div className="flow">
                <p className="eyebrow">Overview</p>
                <h2 className="h2 head--loose">Requiem, without the misery</h2>
                <p className="lead">Designed as a Requiem list with Bruma, Wyrmstooth, VIGILANT and lots of other additions to extend the life of your character's playthrough. It is lighter than notable high-end lists like Elysium or Aldrnari.</p>
                <p className="lead">Notable mods: Alternate Start – LAL, Precision, TDM, One Click Power Attack, Pit Fighter, VIGILANT, Bruma, Wyrmstooth, Leaps of Faith, College of Winterhold Quest Expansion, Pilgrim, Honed Metal, More Carriages, Wait Carriage in Towns, and Just Sleep.</p>
                <Callout kind="warning" icon={false} compact label="Requires paid AE">
                  <p>This list requires the AE content upgrade to be purchased and installed. <strong>It will not run without all of the Creation Club content.</strong></p>
                </Callout>
              </div>
              <YouTubeEmbed id="fP1B2WA8GmQ" title="Do Not Go Gentle gameplay" />
            </div>
          </section>

          <section id="specs" className="section">
            <div className="section-head">
              <div>
                <h2 className="h2 head--sub">System requirements</h2>
                <p className="sub">If you have run Serenity, AVO or something similar, you should be fine here.</p>
              </div>
              <SpecToggle options={SPEC_OPTIONS} value={spec} onChange={setSpec} />
            </div>
            <SpecCards
              cards={[
                { label: 'CPU', value: s.cpu },
                { label: 'GPU', value: s.gpu, gold: true },
                { label: 'RAM', value: s.ram },
                { label: 'Storage', value: s.storage },
                { label: 'Pagefile', value: s.pagefile },
              ]}
            />
            <SizeCards
              sizes={[
                { label: 'Space required', value: <>~400 GB<span className={styles.sizeNote}>Check the card in the Wabbajack gallery for a more accurate figure.</span></> },
                { label: 'Shader cache', value: <>10 GB<span className={styles.sizeNote}>Nvidia only — set it in the driver control panel.</span></> },
                { label: "Author's framerate", value: <>100+ at 2K<span className={styles.sizeNote}>Rarely below 55 at 4K, except around Riverwood, Falkreath and Riften.</span></> },
              ]}
            />
          </section>

          <section id="install" className="section">
            <p className="eyebrow">Read me</p>
            <h2 className="h2 head--gap">Installation</h2>
            <ReadMeCard slug="dngg" />
          </section>

          <section id="firstplay" className="section">
            <h2 className="h2 head--tight">Starting out</h2>
            <p className="lead section-lead">Set the MO2 dropdown to <strong>SKSE</strong> and press Run. DNGG uses Alternate Start – Live Another Life, so you begin in an abandoned prison.</p>
            <div className="grid grid--tiles">
              <Tile title="Initialise Requiem first" tone="gold">
                After naming your character, wait about 30 seconds for MCM Recorder to finish. When the message to initialise Requiem appears, <strong>open your inventory and close it before leaving the starting cell.</strong>
              </Tile>
              <Tile title="Spend your three perks">
                Requiem gives you three to start. Take one in light or heavy armour if you plan to wear it — armour without its first perk drains stamina, which can kill you. Weapons get far more effective with the first perk, and spells are nearly impossible without one.
              </Tile>
              <Tile title="Choose your destiny">
                Use the “Choose your Destiny!” scroll in your inventory for a class-specific loadout, and the power in your powers list to pick a birthsign. Both optional.
              </Tile>
              <Tile title="Controls and controllers">
                One Click Power Attack defaults to <strong>M3</strong> (middle mouse) — you need it to power attack. For a controller, enable the 8-Hotkey Controller Map for OCPA in the Optional separator, then set the power attack key to RB in both the OCPA and Dual Wield Parrying MCMs.
              </Tile>
              <Tile title="Game folder">
                Stock Game keeps your Skyrim install clean — everything needed lives in <span className="mono">Game Root</span>. You do not need to copy anything.
              </Tile>
              <Tile title="Adding your own mods">
                Support is limited if you do. Weapons, armour, spells and followers are harder to add than you would think — random gear will probably get you killed. Do not put plugins below the paper maps; keep them above DynDOLOD.esp.
              </Tile>
            </div>
          </section>

          <section id="visuals" className="section">
            <h2 className="h2 head--tight">ENB and Community Shaders</h2>
            <p className="lead section-lead">DNGG ships with Rudy ENB Obsidian active, plus PiCho and Amon included. Switch freely, or drop ENB entirely for frames.</p>
            <div className={styles.visualsGrid}>
              <div>
                <p className="label label--gold">Performance order, worst to best</p>
                <KeyRows rows={ENB_PERFORMANCE} variant="note" />
                <p className={styles.perfAfter}>To use Community Shaders, disable the <strong>ENB Binaries</strong> mod and the active ENB preset. Amethyst ReShade and its KreatE preset are optional on top. Expect some loss in visual fidelity for the frames.</p>
              </div>
              <div>
                <p className="label label--gold">Common ENB tweaks</p>
                <Tile title="Removing the letterbox" small className={styles.tileStack}>
                  Press <span className="mono">Ctrl + Shift</span>, open Shader Parameters → <span className="mono">ENBPOSTPASS.FX</span>, scroll to letterbox and untick it, save configuration, then <span className="mono">Ctrl + Shift</span> back to the game.
                </Tile>
                <Tile title="Buying frames back" small>
                  <p>Keep the colour correction but turn off: DetailedShadows, ComplexParticleLights (disable big range), Reflection, Complex Grass Collision, Complex Grass, and Complex Parallax.</p>
                  <p>Complex Parallax must be disabled out of game in <span className="mono">enbseries.ini</span> inside Game Root, then clear the enbcache there. <span className="mono">Page Down</span> toggles the ENB in game.</p>
                </Tile>
              </div>
            </div>
          </section>

          <section id="optional" className="section">
            <h2 className="h2 head--tight">Optional mods</h2>
            <p className="lead section-lead">Check the optionals tab in MO2 before you launch. Toggle freely — but read up on them first.</p>
            <div className="grid grid--tiles">
              {OPTIONAL.map((o) => <Tile key={o.title} title={o.title}>{o.body}</Tile>)}
            </div>
          </section>

          <section id="faqs" className="section">
            <FaqAccordion eyebrow="FAQs" title="From the author" items={FAQS} />
          </section>

          <DiscordBand
            title="Getting help"
            text="Arkay is primarily on the Requiem Wabbajack server. Please do not DM — asking in public means the answer helps everyone else too."
            primary={{ href: REQUIEM_DISCORD, label: 'Requiem WJ server' }}
            secondary={[
              { href: `${GITHUB}/blob/main/Changelog.md`, label: 'Changelog' },
              { href: 'https://www.patreon.com/Abandoned_by_Arkay', label: 'Patreon' },
            ]}
            credits={<>Credits — <strong>you</strong> for reading this, the Animonculory team, Zelie (Sovn), Noggog for Mutagen, and Halgari and everyone on the Wabbajack team.</>}
          />
        </div>
      </div>
    </>
  )
}
