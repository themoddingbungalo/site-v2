// The people behind the Bungalo, driving the team grid on /community.
//
// Everything below the name is a placeholder until each member sends their own copy.
// To fill one in: rewrite `blurb`, drop a square image in `public/assets/community/`
// and point `avatar` at it, and add only the `links` that person actually has — the
// card renders the ones present and nothing else.
import type { ModlistSlug } from './modlists'

/** The profiles a member can be linked to. Nobody is expected to have all five. */
export type TeamLinkKind = 'youtube' | 'nexus' | 'patreon' | 'kofi' | 'github'

/** Button order and labels on a member card. */
export const teamLinkOrder: TeamLinkKind[] = ['youtube', 'nexus', 'patreon', 'kofi', 'github']
export const teamLinkLabels: Record<TeamLinkKind, string> = {
  youtube: 'YouTube',
  nexus: 'Nexus',
  patreon: 'Patreon',
  kofi: 'Ko-fi',
  github: 'GitHub',
}

/** Card colours, keyed by what the person does, so the roster reads as groups rather
 *  than as eight unrelated cards. `author` is the blue Arkay picked; `lorerim` is the
 *  silver off the LoreRim wordmark, which ties its co-developers to the list itself
 *  rather than to the site's own gold; `site` is sampled from WhisperDealer's portrait. */
export const accents = {
  author: '#A9C9FF',
  lorerim: '#C4CACC',
  site: '#8EC0AA',
} as const

export interface TeamMember {
  name: string
  /** Line under the name — what they do here. */
  role: string
  /** One or two sentences. */
  blurb: string
  /** Lists they author, rendered as chips linking to the list page. */
  lists?: ModlistSlug[]
  /** Square portrait under `public/assets/community/`. Without one the card draws
   *  initials instead. */
  avatar?: string
  /** Which colour the roster card wears — see `accents`. The background, the portrait
   *  ring and the role line all read from it. Optional: without one the card falls
   *  back to the site gold. */
  accent?: string
  /** Only the profiles that exist. An empty object shows the "links coming soon" note. */
  links: Partial<Record<TeamLinkKind, string>>
}

/* Alphabetical, case-insensitive. The entries below are kept in that order so the file
   reads the way the grid renders, and the sort underneath is the safety net for an
   entry pasted into the wrong place. */
const roster: TeamMember[] = [
  {
    name: 'Abandoned_By_Arkay',
    role: 'Modlist author',
    avatar: 'assets/community/arkay.webp',
    accent: accents.author,
    blurb: 'Author of Do Not Go Gentle — Requiem with Bruma, Wyrmstooth and VIGILANT, tuned to be demanding rather than punishing.',
    lists: ['dngg'],
    links: {
      nexus: 'https://www.nexusmods.com/profile/AbandonedByArkay/mods?gameId=1704',
      github: 'https://github.com/Arkay-1248',
    },
  },
  {
    name: 'Camora0',
    role: 'Modlist author',
    avatar: 'assets/community/camora.webp',
    accent: accents.author,
    blurb: 'Author of LoreOut, the 800-mod rebuild of the Commonwealth over on Fallout 4.',
    lists: ['loreout'],
    links: {
      youtube: 'https://www.youtube.com/channel/UCObLMGjcje-VaMC1xzd4FMg',
      nexus: 'https://www.nexusmods.com/profile/Camora1',
      patreon: 'https://www.patreon.com/wastelandreborn',
      kofi: 'https://ko-fi.com/imcamora',
    },
  },
  {
    name: 'Colloquy',
    role: 'Modlist author',
    avatar: 'assets/community/colloquy.webp',
    accent: accents.author,
    blurb: "Author of CSVP — Colloquy's Skyrim Vanilla Plus, vanilla Skyrim with a fresh coat of paint and no MCM fiddling.",
    lists: ['csvp'],
    links: {
      youtube: 'https://www.youtube.com/channel/UCLUFzI4w26Yl5LHtd5b7ecA',
      nexus: 'https://www.nexusmods.com/profile/Colloquy',
    },
  },
  {
    name: 'Ghoulified',
    role: 'Modlist author',
    avatar: 'assets/community/ghoulified.webp',
    accent: accents.author,
    blurb: 'Author of Ghoulified Reality and co-author of NGVO, the visual baseline most of the other lists build on.',
    lists: ['ghoulified', 'ngvo'],
    links: {
      nexus: 'https://www.nexusmods.com/profile/Ghoulified/mods',
    },
  },
  {
    name: 'not_docs',
    role: 'Modlist author',
    avatar: 'assets/community/not_docs.webp',
    accent: accents.author,
    blurb: 'Co-author of NGVO, keeping it under 300 plugins so there is room left for your own build.',
    lists: ['ngvo'],
    links: {},
  },
  {
    name: 'Patman',
    role: 'LoreRim Co-Developer',
    avatar: 'assets/community/patman.webp',
    accent: accents.lorerim,
    blurb: "Builds the official and unofficial patches that let LoreRim run alongside other mods — from DB's Bestiary to Chanterelle.",
    lists: ['lorerim'],
    links: {
      nexus: 'https://www.nexusmods.com/profile/patman023',
    },
  },
  {
    name: 'Shazdeh',
    role: 'LoreRim Co-Developer',
    avatar: 'assets/community/shazdeh.webp',
    accent: accents.lorerim,
    blurb: 'A well-known mod author outside the Bungalo as well as in it. Made Biggie Traits, and a good deal of the custom work that went into LoreRim.',
    lists: ['lorerim'],
    links: {
      nexus: 'https://www.nexusmods.com/profile/shazdeh2/mods',
      github: 'https://github.com/shazdeh',
    },
  },
  {
    name: 'WhisperDealer',
    role: 'Site and wiki',
    avatar: 'assets/community/whisperdealer.webp',
    accent: accents.site,
    blurb: 'Builds and maintains this site, and keeps the read mes and guides in one piece.',
    links: {
      nexus: 'https://www.nexusmods.com/profile/whisperdealer',
      kofi: 'https://ko-fi.com/whisperdealer',
      github: 'https://github.com/WhisperDealer',
    },
  },
]

export const team: TeamMember[] = [...roster].sort((a, b) =>
  a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
)

/** Up to two letters for the fallback monogram on a member without an avatar. */
export function initials(name: string): string {
  const parts = name.split(/[\s_.-]+/).filter(Boolean)
  const letters = parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2)
  return letters.toUpperCase()
}
