import type { ReactNode } from 'react'
import { Callout } from '../components/ui/Callout'
import { TroubleTile, type Step } from '../components/ui/Steps'
import { ext, site } from '../data/site'

/**
 * Prose every Skyrim list on the site repeats word for word: the pre-installation
 * steps, the "before you start" notice, and the Wabbajack failures people open a
 * ticket about. Written once here so a correction lands on every list at the same
 * time, rather than on whichever page someone happened to be editing.
 *
 * Anything genuinely specific to one list — Ghoulified's Rare Curios dance, CSVP's
 * install-from-disk flow — stays on that list's page. Only what is shared lives here.
 */

const VC_REDIST = 'https://aka.ms/vs/17/release/vc_redist.x64.exe'
const VC_REDIST_16 = 'https://aka.ms/vs/16/release/vc_redist.x64.exe'
const DOTNET_8 = 'https://dotnet.microsoft.com/en-us/download/dotnet/8.0'
const DOTNET_5 = 'https://dotnet.microsoft.com/download/dotnet/5.0/runtime'
const STEAM_NO_UPDATE = 'https://help.steampowered.com/en/faqs/view/71AB-698D-57EB-178C#disable'
const CREATION_KIT = 'https://store.steampowered.com/app/1946180/Skyrim_Special_Edition_Creation_Kit/'
const DEFENDER_EXCLUSION = 'https://www.thewindowsclub.com/exclude-a-folder-from-windows-security-scan'

/** The individual pre-installation steps, so a list can reorder or drop any of them. */
export const step = {
  /** `legacy` picks the older runtimes the Requiem-era lists still pin. */
  runtimes: (legacy = false): Step =>
    legacy ? (
      <>Install <a href={VC_REDIST_16} {...ext}>Visual C++ x64</a> and the <a href={DOTNET_5} {...ext}>.NET desktop runtime</a>.</>
    ) : (
      <>Install <a href={VC_REDIST} {...ext}>Visual C++ x64</a> and the <a href={DOTNET_8} {...ext}>.NET desktop runtime x64</a>.</>
    ),
  stopAutoUpdates: <>Stop Skyrim from <a href={STEAM_NO_UPDATE} {...ext}>auto-updating</a>.</>,
  uninstallSkyrim: <>Fully uninstall Skyrim — the game folder <em>and</em> the Skyrim Special Edition folder in <span className="mono">\Documents\My Games\</span>.</>,
  disableOneDrive: <>Disable OneDrive and anything else that hooks into user file areas.</>,
  reinstallSkyrim: <>Reinstall Skyrim outside Program Files — somewhere like <span className="mono">C:\Games</span>.</>,
  graphicsCheck: <>Start the game once and let it run the graphics check.</>,
  creationClub: <>Launch to the main menu and let the Creation Club files download. <strong>Do not verify your game files.</strong></>,
  antivirus: <>Remove or disable third-party antivirus such as MalwareBytes or Webroot.</>,
  creationKit: <><strong>Install the Skyrim SE Creation Kit on Steam and run it at least once.</strong></>,
  creationKitLinked: <>Download the <a href={CREATION_KIT} {...ext}>Skyrim SE Creation Kit</a> on Steam and run it once.</>,
  wabbajackFolder: <>Put <a href={site.wabbajack} {...ext}>Wabbajack</a> in a folder like <span className="mono">C:\Games\Wabbajack</span> — not Program Files, desktop or Downloads.</>,
  pressPlay: <>Press play and go pet your nearest fluffy animal while Wabbajack works.</>,
} as const

/** The eight steps every Skyrim list here opens with, in the order they are done. */
export const skyrimPreInstall: Step[] = [
  step.runtimes(),
  step.stopAutoUpdates,
  step.uninstallSkyrim,
  step.disableOneDrive,
  step.reinstallSkyrim,
  step.graphicsCheck,
  step.creationClub,
  step.antivirus,
]

/** The plain "browse the gallery and press play" install, for lists shipped through it. */
export const wabbajackInstall = ({ name, folder }: { name: string; folder: string }): Step[] => [
  step.wabbajackFolder,
  <>Open Wabbajack, click <strong>Browse Modlists</strong>, press download on {name}.</>,
  <>Set the install folder to something like <span className="mono">{folder}</span>.</>,
  <>Downloads do not need to be on an SSD, but it is faster if they are.</>,
  step.pressPlay,
]

interface RequirementsProps {
  /** List name, used in the opening sentence. */
  name: string
  /** Total disk space, mentioned when the list quotes one here rather than in a card. */
  space?: string
  /** The RX 580 line — off for lists that do not draw that floor. */
  amd?: boolean
  /** Appended to the storage sentence, before the full stop. */
  storageNote?: ReactNode
}

/** "Read this before you start": the game, OS and drive requirements shared by the lists. */
export function SkyrimRequirements({ name, space, amd = true, storageNote }: RequirementsProps) {
  return (
    <Callout title="Read this before you start">
      <p>
        {name} requires Skyrim updated to the <strong>latest version</strong> and the full $20 Anniversary Edition
        upgrade. Only <strong>English Steam</strong> versions are supported — GOG and other languages are not.
        {space ? <> Around <strong>{space}</strong> total space.</> : null}
      </p>
      <p>
        Windows 10 or 11, version 21H2 or newer. LTSC and modified variants will not work.
        {amd ? ' AMD RX 580 and older cards are not supported.' : ''} Running from an HDD or external drive is
        strongly advised against{storageNote}.
      </p>
    </Callout>
  )
}

/** Wabbajack gave up on a file. `children` adds whatever else that list needs owning. */
export function DownloadFailedTile({ children }: { children?: ReactNode }) {
  return (
    <TroubleTile title="Could not download x">
      Large files fail on flaky connections. Rerun Wabbajack, or download manually into the same downloads folder.
      {children ? <> {children}</> : null}
    </TroubleTile>
  )
}

/** The error everyone hits during the hour a list is being republished. */
export function NotWhitelistedTile() {
  return (
    <TroubleTile title="x is not a whitelisted download">
      This happens while the list is being updated. Check for a new version or wait for the release ping in Discord.
    </TroubleTile>
  )
}

/** Mod Organizer tripping a scanner — almost always a skipped pre-installation step. */
export function AntivirusTile() {
  return (
    <TroubleTile title="Antivirus reports a virus">
      A pre-installation step was skipped. If you did follow them,{' '}
      <a href={DEFENDER_EXCLUSION} {...ext}>add a Defender exclusion</a> for Mod Organizer.
    </TroubleTile>
  )
}

/** The DynDOLOD DLL NG crash, and the papyrus fallback that trades frames for stability. */
export function DynDolodCrashTile() {
  return (
    <TroubleTile title="Crash after dying and reloading" tone="gold">
      A DynDOLOD DLL NG issue. Disable the DLL and rerun DynDOLOD to fall back to papyrus scripts — heavier on FPS
      and worse LODs, but stable.
    </TroubleTile>
  )
}

/** What updating an installed list costs you, wherever a list chooses to say it. */
export function UpdatingTile() {
  return (
    <TroubleTile title="Updating the list" tone="gold">
      Check the changelog and back up saves first — some updates need a new game. Keep the same paths and tick{' '}
      <strong>overwrite existing modlist</strong>. Mods you added yourself get deleted.
    </TroubleTile>
  )
}
