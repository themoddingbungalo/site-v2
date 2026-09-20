import type { ModlistSlug } from './modlists'

// Long-form markdown guides. Two kinds, and the difference is who owns them:
//   - a list guide belongs to one modlist, is written by that list's author, and lives
//     in content/lists/<list>/guides/<name>.md. It carries `list`.
//   - a tool guide is about a tool every list uses (Wabbajack, xEdit, DynDOLOD…), so it
//     belongs to no list. It lives in content/guides/<name>.md and carries `section`,
//     which puts it with the matching walkthrough on the Guides hub.
// Exactly one of `list` / `section` is set. Adding one is a row here plus the markdown.
export interface Guide {
  slug: string
  /** Set on a list guide. Absent on a tool guide. */
  list?: ModlistSlug
  /** Set with `list`, for the labels. */
  listName?: string
  /** Set on a tool guide: which hub section it belongs under. */
  section?: GuideSectionId
  title: string
  blurb: string
  /** Markdown file under content/. */
  file: string
  /** Menu sub-label. */
  menuLabel: string
}

export const guides: Guide[] = [
  {
    slug: 'csvp-colloquy-guide',
    list: 'csvp',
    listName: 'CSVP',
    title: "Colloquy's Guide",
    blurb: 'How CSVP actually plays — what changed, what it asks of you, and how to make the most of a Skyrim that no longer revolves around you.',
    file: 'lists/csvp/guides/colloquy-guide.md',
    menuLabel: 'CSVP · How the list plays',
  },
  {
    slug: 'csvp-modification-manual',
    list: 'csvp',
    listName: 'CSVP',
    title: 'Modification Manual',
    blurb: 'Your pocket guide to personalising CSVP: what to rerun after adding mods, in what order, and how to rebuild every Output without breaking the list.',
    file: 'lists/csvp/guides/modification-manual.md',
    menuLabel: 'CSVP · Rerunning your Outputs',
  },
  {
    slug: 'xedit-patching',
    section: 'xedit',
    title: 'Patches and Masters',
    blurb: 'Two mods editing the same weapon, and only one of them wins. How to keep the model from one and the stats from the other — then how to cut a dependency back out of the patch you made.',
    file: 'guides/xedit-patching.md',
    menuLabel: 'xEdit · Make a patch, drop a master',
  },
  {
    slug: 'creation-kit-seams',
    section: 'creation-kit',
    title: 'Fixing a Seam',
    blurb: 'A hard line where two ground textures meet, or a hole you can see the sky through. Find the cell, find the mod that did it, and close it in a patch of your own.',
    file: 'guides/creation-kit-seams.md',
    menuLabel: 'Creation Kit · Close a gap, blend a seam',
  },
  {
    slug: 'wabbajack-setup',
    section: 'wabbajack',
    title: 'Setting Up Wabbajack',
    blurb: 'Thousands of mods, one button. Where to put Wabbajack, what to set up in Windows before you press play, and what to do on the days a download fails.',
    file: 'guides/wabbajack-setup.md',
    menuLabel: 'Wabbajack · From download to first list',
  },
]

export const guideBySlug = Object.fromEntries(guides.map((g) => [g.slug, g])) as Record<string, Guide>
export const guidePath = (slug: string) => `/guides/${slug}`
/** The written guides filed under a hub section — none, for most sections, so far. */
export const guidesForSection = (id: GuideSectionId) => guides.filter((g) => g.section === id)
/** What to show beside a guide's title: its list, or the tool it is about. */
export const guideContext = (g: Guide) =>
  g.listName ?? guideSections.find((s) => s.id === g.section)?.label ?? 'Guide'

// Screenshots referenced from the guides, keyed by the path used in the markdown.
// An unmapped local path is dropped rather than rendered broken, so adding a shot is
// two steps: the file under public/assets/, and its path here.
export const guideAssets: Record<string, string> = Object.fromEntries(
  [
    // CSVP's modification manual, carried over from the old wiki.
    'assets/csvp/disableref.webp',
    'assets/csvp/synordernew.webp',
    'assets/csvp/pgpatchercurrent.webp',
    'assets/csvp/lod4_32.webp',
    'assets/csvp/1perftexgen.webp',
    'assets/csvp/2perfdyndo.webp',
    'assets/csvp/maintexgen.webp',
    'assets/csvp/maindyndo.webp',
    // Tool guides — frames from the walkthrough videos, via scripts/video-shot.mjs.
    'assets/guides/creation-kit-seams/cell-view.webp',
    'assets/guides/creation-kit-seams/data-dialog.webp',
    'assets/guides/creation-kit-seams/landscape-edit-settings.webp',
    'assets/guides/wabbajack-setup/browse-modlists.webp',
    'assets/guides/wabbajack-setup/install-screen.webp',
    'assets/guides/wabbajack-setup/shader-cache.webp',
    'assets/guides/wabbajack-setup/virtual-memory.webp',
    'assets/guides/xedit-patching/conflict-view.webp',
    'assets/guides/xedit-patching/drag-to-patch.webp',
    'assets/guides/xedit-patching/new-file-esl.webp',
  ].map((p) => [p, p]),
)

// The video walkthroughs on the Guides hub. `id` is the YouTube video id; leave it
// empty when the source video is no longer available and the card renders as text.
export interface GuideVideo {
  id: string
  title: string
  blurb: string
  /** Small badge on the thumbnail, e.g. "STEP 1". */
  step?: string
}

export type GuideSectionId = 'wabbajack' | 'create-modlist' | 'lodgen' | 'xedit' | 'creation-kit'

export interface GuideSectionMeta {
  id: GuideSectionId
  /** Label in the header menu, sticky nav and footer. */
  label: string
  /** Menu sub-label. */
  menuLabel: string
}

export const guideSections: GuideSectionMeta[] = [
  { id: 'wabbajack', label: 'Wabbajack Setup', menuLabel: 'Install the tool, then any list' },
  { id: 'create-modlist', label: 'Create a Modlist', menuLabel: 'Build one from an empty MO2 profile' },
  { id: 'lodgen', label: 'LOD Generation', menuLabel: 'xLODGen · Grass Cache · DynDOLOD' },
  { id: 'xedit', label: 'xEdit', menuLabel: 'Patches · Leveled lists · Masters' },
  { id: 'creation-kit', label: 'Creation Kit', menuLabel: 'Fix any landscape seam' },
]

export const guideVideos: Record<GuideSectionId, GuideVideo[]> = {
  wabbajack: [
    { id: 'nApuOZWp12c', title: 'Setting up Wabbajack', blurb: 'The full setup walkthrough, start to finish.' },
  ],
  'create-modlist': [
    { id: 'MuowXX8s2Jo', title: 'Building a list from scratch', blurb: 'A full live stream, start to finish, with Biggie Boss.' },
  ],
  lodgen: [
    { id: 'Xjzef1TT4Gk', title: 'xLODGen', blurb: 'Terrain LOD generation and the settings that matter.', step: 'STEP 1' },
    { id: 'jH7co25_JIo', title: 'Grass Cache', blurb: 'Pre-caching grass so it shows in the distance without killing your framerate.', step: 'STEP 2' },
    { id: 'nLVNXkxhJxI', title: 'TexGen & DynDOLOD', blurb: 'Object and tree LOD — always the last thing you run.', step: 'STEP 3' },
  ],
  xedit: [
    { id: 'eO9B8xMWRP0', title: 'How to make a patch', blurb: 'Forwarding the right records when two mods touch the same thing.' },
    // The wiki's leveled-lists video (mr6ynP3bx_s) is no longer on YouTube. Put a
    // working id here to restore the player.
    { id: '', title: 'Leveled lists', blurb: 'How they work, and why gear from two mods often fails to show up.' },
    { id: '5cHJ0i7hE2U', title: 'Remove masters', blurb: 'Cleanly cutting a dependency out of a plugin without breaking it.' },
  ],
  'creation-kit': [
    { id: 'bLibtlmBgRw', title: 'How to fix ANY seam', blurb: 'One method that covers every landscape seam you will hit.' },
  ],
}
