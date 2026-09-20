// One entry per hosted modlist. Adding a list: add a row here, drop its read me in
// content/readmes/<slug>.md, and add a page component under src/pages/modlists.
export type ModlistSlug = 'lorerim' | 'ngvo' | 'ghoulified' | 'loreout' | 'csvp' | 'dngg'

export interface Modlist {
  slug: ModlistSlug
  /** Short name used in nav and cards. */
  name: string
  /** Long name, e.g. hero heading on the read me page. */
  fullName: string
  game: 'Skyrim SE' | 'Fallout 4'
  /** Short tag shown next to the name in menus. */
  gameShort: string
  author: string
  /** Approximate install size shown on the home cards. */
  size: string
  /** One-line description on the home cards. */
  blurb: string
  /** Tagline in the search overlay. */
  tagline: string
  /** Cover art for the home card. These are the lists' own lockups, in whatever shape
   *  their authors made them, so the card mounts them whole rather than cropping. */
  cover: string
  logo: string
  /** Markdown file under content/, or null when the list is documented elsewhere. */
  readme: string | null
  /** Highlight badge on the home card. */
  badge?: string
}

export const modlists: Modlist[] = [
  {
    slug: 'lorerim',
    name: 'LoreRim',
    fullName: 'LoreRim',
    game: 'Skyrim SE',
    gameShort: 'Skyrim',
    author: 'biggie_boss',
    size: '~180 GB',
    blurb: 'Modern action combat plus deep roleplaying via EnaiRim and Requiem, with hundreds of custom patches.',
    tagline: 'Roleplaying',
    cover: 'assets/logos/LoreRim-cover.webp',
    logo: 'assets/logos/LoreRim.webp',
    readme: null,
    badge: 'Most popular',
  },
  {
    slug: 'ngvo',
    name: 'NGVO',
    fullName: 'NGVO',
    game: 'Skyrim SE',
    gameShort: 'Skyrim',
    author: 'ghoulified & not_docs',
    size: '~150 GB',
    blurb: 'Next Gen Visual Overhaul — a visuals-and-bugfix baseline under 300 plugins, leaving 210+ slots for your own build.',
    tagline: 'Visual baseline',
    cover: 'assets/logos/NGVO-cover.webp',
    logo: 'assets/logos/NGVO.webp',
    readme: 'readmes/ngvo.md',
    badge: 'Best base',
  },
  {
    slug: 'ghoulified',
    name: 'Ghoulified',
    fullName: 'Ghoulified Reality',
    game: 'Skyrim SE',
    gameShort: 'Skyrim',
    author: 'Ghoulified',
    size: '~165 GB',
    blurb: 'Hardcore perma-death Skyrim with 3BFTweaks gameplay and a full visual overhaul. Punishing and gorgeous.',
    tagline: 'Hardcore',
    cover: 'assets/logos/Ghoulified-cover.webp',
    logo: 'assets/logos/Ghoulified.webp',
    readme: 'readmes/ghoulified.md',
  },
  {
    slug: 'loreout',
    name: 'LoreOut',
    fullName: 'LoreOut',
    game: 'Fallout 4',
    gameShort: 'Fallout 4',
    author: 'Camora0',
    size: '~140 GB',
    blurb: '800+ mods rebuilding the Commonwealth — modern gunplay, skills and perks restored, lore-friendly gear everywhere.',
    tagline: 'Fallout 4',
    cover: 'assets/logos/LoreOut.webp',
    logo: 'assets/logos/LoreOut.webp',
    readme: 'readmes/loreout.md',
  },
  {
    slug: 'csvp',
    name: 'CSVP',
    fullName: 'CSVP',
    game: 'Skyrim SE',
    gameShort: 'Skyrim',
    author: 'TheConversation',
    size: '~120 GB',
    blurb: "Colloquy's Skyrim Vanilla Plus. A fresh coat of paint on NGVO visuals — no new lands, no followers, zero MCM fiddling.",
    tagline: 'Vanilla plus',
    cover: 'assets/logos/CSVP-cover.webp',
    logo: 'assets/logos/CSVP.webp',
    readme: 'readmes/csvp.md',
  },
  {
    slug: 'dngg',
    name: 'Do Not Go Gentle',
    fullName: 'Do Not Go Gentle',
    game: 'Skyrim SE',
    gameShort: 'Skyrim',
    author: 'Abandoned_By_Arkay',
    size: '~155 GB',
    blurb: 'Requiem with Bruma, Wyrmstooth and VIGILANT. Demands you plan your fights, without being painful for its own sake.',
    tagline: 'Requiem',
    cover: 'assets/logos/DNGG.webp',
    logo: 'assets/logos/DNGG.webp',
    readme: 'readmes/dngg.md',
  },
]

export const modlistBySlug = Object.fromEntries(modlists.map((m) => [m.slug, m])) as Record<ModlistSlug, Modlist>

export function isModlistSlug(s: string | undefined): s is ModlistSlug {
  return !!s && s in modlistBySlug
}

export const modlistPath = (slug: ModlistSlug) => `/modlists/${slug}`
export const readmePath = (slug: ModlistSlug) => `/modlists/${slug}/readme`

// Old-wiki image paths that appear inside the read-mes, mapped onto the assets we
// ship. Anything local that is not listed here is dropped instead of rendered broken.
export const readmeAssets: Record<string, string> = {
  'assets/ngvo/logo.png': 'assets/logos/NGVO-cover.webp',
  'assets/csvp/logo.png': 'assets/logos/CSVP.webp',
  'assets/ghoulified/cover.webp': 'assets/logos/Ghoulified-cover.webp',
  'assets/loreout/logo.png': 'assets/logos/LoreOut.webp',
  'assets/dngg/cover.png': 'assets/logos/DNGG.webp',
  'assets/lorerim/cover.png': 'assets/logos/LoreRim-cover.webp',
  'assets/wabbajack.png': 'assets/wabbajack.png',
}
