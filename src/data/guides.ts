import type { ModlistSlug } from './modlists'

// Long-form markdown guides written by modlist authors. Adding one: drop the file in
// content/lists/<list>/guides/<name>.md and add a row here.
export interface Guide {
  slug: string
  list: ModlistSlug
  listName: string
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
]

export const guideBySlug = Object.fromEntries(guides.map((g) => [g.slug, g])) as Record<string, Guide>
export const guidePath = (slug: string) => `/guides/${slug}`

// Screenshots referenced from the guides, keyed by the path used in the markdown.
export const guideAssets: Record<string, string> = Object.fromEntries(
  [
    'assets/csvp/disableref.webp',
    'assets/csvp/synordernew.webp',
    'assets/csvp/pgpatchercurrent.webp',
    'assets/csvp/lod4_32.webp',
    'assets/csvp/1perftexgen.webp',
    'assets/csvp/2perfdyndo.webp',
    'assets/csvp/maintexgen.webp',
    'assets/csvp/maindyndo.webp',
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
