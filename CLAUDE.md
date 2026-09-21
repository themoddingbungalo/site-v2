# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The Modding Bungalo wiki, rebuilt as a React SPA (Vite, React 19, TypeScript,
react-router 8) and deployed to GitHub Pages from `.github/workflows/pages.yml`.
Modlist read mes and guides are markdown under `content/`, edited directly on GitHub by
non-technical authors; everything else is code maintained by the site owner.

`README.md` is the contributor-facing overview and `content/README.md` is the contract
with the markdown authors. If you change how content is written, rendered or deployed,
update those too.

## Commands

```bash
npm ci
npm run dev        # Vite dev server on http://localhost:5173
npm run build      # tsc -b && vite build && scripts/postbuild.mjs (copies index.html to 404.html)
npm run typecheck  # tsc -b only
npm run preview    # serve dist/
node scripts/shot.mjs <url> <out.png> --width=400 --full   # headless Chrome screenshot via CDP (dev only)
node scripts/video-shot.mjs <video-id> 3:01 <out.webp> --crop=x,y,w,h   # screenshot from a guide video
npm run shots -- content/screenshots/NGVO ngvo             # optimise in-game screenshots (see below)
npm run video -- <youtube-url> --preset=outline            # read a tutorial video with Gemini (see below)
```

There is no test suite. `npm run build` must pass; the deploy workflow runs it.

## Base path

`vite.config.ts` reads `VITE_BASE_PATH` (default `/`). The workflow sets it from
`actions/configure-pages`, so it is `/site-v2/` on `themoddingbungalo.github.io/site-v2`
and `/` once a custom domain is attached. Never hard-code either. To check a change under
the deploy base, build and preview with `VITE_BASE_PATH=/site-v2/` — from git bash, set
`MSYS_NO_PATHCONV=1` first or the value arrives mangled into a Windows path. Use
`asset('assets/...')` from `src/data/site.ts` for public files and `<Link to>` for
internal navigation; `BrowserRouter` gets its `basename` from `import.meta.env.BASE_URL`.

## Content pipeline

- Read mes are served at `/lists/<list>/read-me`, the URL the old wiki used, so links
  already published elsewhere keep working; the interim v2 path
  `/modlists/<list>/readme` redirects to it. Build the URL with `readmePath()`, never
  by hand. The list pages themselves are still `/modlists/<list>`.
- Each modlist owns a folder: `content/lists/<list>/readme.md` and any number of
  `content/lists/<list>/guides/<name>.md`. Guides about a tool rather than a list live in
  `content/guides/<name>.md` instead — see Registries. `src/markdown/useMarkdownFile.ts`
  bundles both trees with `import.meta.glob([...], { query: '?raw' })`; files load lazily
  per page, keyed by the path under `content/` (`lists/csvp/readme.md`).
- `src/markdown/Markdown.tsx` renders with react-markdown + remark-gfm + rehype-raw +
  rehype-slug. A root-relative link in markdown (`[Grass Cache](/guides/lodgen-grass-cache)`)
  is rendered through react-router's `<Link>` so it picks up the basename; a plain `<a>`
  would lose the deploy base and 404. `remarkKramdown.ts` implements `{: .important|.warning|.note}` callouts
  and `{: .btn}` button links. `resolveAsset.ts` rewrites GitHub/GitLab blob URLs to raw
  URLs, maps old-wiki paths through the asset maps in `src/data/modlists.ts` /
  `src/data/guides.ts`, and drops unmapped local images. Badge-only `<table>`s become
  pill rows; `.youtube-container` is pure CSS.
- `src/markdown/headings.ts` extracts `##`/`###` headings with the same slugs
  rehype-slug produces (github-slugger), feeding `SectionNav`.
- rehype-raw is deliberately unsanitised: authors have write access and the read mes
  rely on raw HTML.
- `src/styles/prose.css` is the typography for rendered markdown.

## Shared pieces

The six modlist pages are assembled, not written. Before adding markup to one, check
whether the thing already exists:

- `src/components/ui/` — `ModlistHero`, `PageHero`, `SectionNav`, `SpecCards`/`SizeCards`/
  `SpecToggle`, `StepList` (a step can be `{ body, hot }` to highlight a row people
  skip), `TroubleTile` (red/gold/green), `StuckTile`, `FeatureCard`, `Tile`, `KeyRows`,
  `Callout` (`label` for an uppercase micro-label, `compact` for a tighter box),
  `ReadMeCard`, `Gallery` (`shotsFor(slug)` builds the `Shot`s, `galleryExtra` classes
  span an extra tile) and `DiscordBand` (`primary` overrides the default Discord button,
  `secondary` takes any number of outlined ones).
- `src/content/install.tsx` — the prose every Skyrim list repeats: `SkyrimRequirements`
  and the Wabbajack failure tiles (`DownloadFailedTile`, `NotWhitelistedTile`,
  `AntivirusTile`, `DynDolodCrashTile`, `UpdatingTile`). Fix a sentence here and it
  lands on every list at once. Only genuinely list-specific copy belongs in a page.
  `skyrimPreInstall`, the `step.*` fragments and `wabbajackInstall()` are still exported
  but nothing renders them: a list page's install section is now a heading and a
  `ReadMeCard`, and the steps live only in the author's read me. Do not reintroduce
  them into a page — a step written here would sit alongside the read me and drift
  out of date the moment the author edits theirs.
- `src/markdown/MarkdownArticle.tsx` — `useMarkdownPage()` plus the article body,
  loading/error states and the "edit on GitHub" footer, shared by the read me and
  guide pages.

A page's own CSS module should hold only what is unique to that list. If you find
yourself writing a rule that already exists in another module, it belongs in
`global.css` or in the component instead.

## Registries

`src/data/modlists.ts` and `src/data/guides.ts` drive the header menus, search index,
home cards, footer, read me routes and guide routes. Adding a list or guide is a data
entry plus (for lists) a page component and a route in `src/App.tsx`.

A `Guide` is one of two kinds and carries exactly one of the two fields that say which:
`list` for a guide a modlist author owns (markdown under `content/lists/<list>/guides/`),
or `section` for a tool guide that belongs to no list (markdown under `content/guides/`,
surfaced next to the matching walkthrough on the Guides hub by `guidesForSection`). Use
`guideContext(guide)` wherever a guide needs a label beside its title — it resolves to the
list name or the tool, so neither kind renders `undefined`.

`src/data/team.ts` drives the roster on `/community` and the team entries in the search
index. Each member carries only the links they have — the card renders those and falls
back to an initials monogram when there is no `avatar`. Most bios and links are still
placeholders waiting on the people themselves.

## Screenshots

Raw captures go in `content/screenshots/<LIST>/` (gitignored — they are 3-9 MB PNGs and
must never be committed). `npm run shots -- content/screenshots/<LIST> <slug>` writes two
WebP sizes per shot into `public/assets/shots/<slug>/`: `<name>.webp` at 2560px for the
lightbox and `<name>-thumb.webp` at 1280px for the grid tile. Reference both in the
page's `SHOTS` array (`src` and `thumb` on each `Shot`). Expect roughly a 90% saving.

The script also slugifies output names (`the rift.png` becomes `the-rift.webp`) and crops
black letterbox bars off captures taken on an ultrawide display. The bar detection only
fires on an obvious symmetric pair, so genuinely dark screenshots are left alone; it
reports every crop it makes, so check that output when adding a list.

Page and modlist hero art is the same bargain without a script: the raw capture goes in
`content/screenshots/heroes/` (gitignored with the rest) and the committed file is a
1920x1080 WebP in `public/assets/heroes/`, which is what every hero there already is.
A one-off `sharp(src).resize({ width: 1920 }).webp({ quality: 86, effort: 6 })` does it —
a 5.5 MB PNG lands around 180 KB. Never point a hero at a PNG in `public/`: it ships at
full size to everyone who opens the page.

The grid is four columns at desktop. A `Shot` marked `feature` (and the `extra` video
tile, via a page-level class) spans two columns and two rows, which keeps the 16/9
shape without making its row taller. NGVO uses that for the video plus one shot, so
the two of them fill the top two rows and the remaining eight shots fill two more:
aim for a count that packs, and remember `extraFirst` puts the video before the shots.
Below four columns the 2x2 spans are disabled, since they cannot pack without holes.

## Watching the tutorial videos

The guide hub is mostly embedded YouTube. Turning those videos into written pages uses
two engines, and the choice between them matters:

- `scripts/watch-gemini.mjs` hands the YouTube URL straight to Gemini, which reads the
  picture and the audio itself. No download, no frames in the context window, and length
  is not a problem — this is the first pass over any video.
  `npm run video -- <url> --preset=outline|steps|transcript|guide|ask`, with
  `--start`/`--end`/`--fps` to scope a stretch (a 25-second window at 1 fps costs ~2.5k
  tokens; the whole 6-minute video ~36k). There is no resolution dial — reading small
  dialog text is what `/watch` is for. Notes land in `.tmp/video-notes/` (gitignored).
  The key is `GEMINI_API_KEY` in `~/.config/watch/.env`; `--list-models` checks it.
- **Cross-check any exact string before it goes in a page.** Gemini is reliable on what
  is done and in what order, and unreliable on small proportional text in a dialog — a
  filename read four times over one video came back three different ways. Stronger still:
  grep the transcript for a value before quoting it. The xLODGen write-up came back with a
  settings table whose terms appear nowhere in what the presenter says. Values that matter
  get a scoped second pass, a 4K frame, or they do not get asserted.
- **Budget by length: ~5.7k input tokens per minute of video.** A 3-hour stream is over a
  million and will not fit in one pass — take the transcript first, then outline in
  chunks with `--start`/`--end`, or sweep the whole thing at `--fps=0.2`.
- `/watch` (the `watch@claude-video` plugin, installed at user scope) downloads the video
  with yt-dlp and cuts frames with ffmpeg so Claude can actually look at them. Use it on
  a 30-second stretch when the exact state of a menu or checkbox decides the wording,
  never on a whole two-hour stream. On Windows the interpreter is `python`, not `python3`.

Screenshots for these guides come out of the videos themselves, with
`scripts/video-shot.mjs`: the walkthroughs are uploaded in 4K, so a cropped dialog is
sharper than anything a 720p frame grab gives you. `--crop` takes fractions of the frame
(`0.4,0.05,0.6,0.31`), output is WebP at 1600px, and the source video is cached in
`.tmp/video-shots/` — delete that folder when done, it holds hundreds of megabytes.
`--clip` fetches only a few seconds around the timestamp instead of the whole file, which
is the only workable option on a long video. Each
new image also needs its path adding to `guideAssets` in `src/data/guides.ts`, or
`resolveAsset` drops it rather than rendering it broken.

The local skill `.claude/skills/video-guide/SKILL.md` has the full workflow, including
what it takes to give a tool guide (Wabbajack, xLODGen, DynDOLOD, xEdit, Creation Kit) a
home: those belong to no modlist, so `guides.ts` needs `list` optional and the markdown
glob in `useMarkdownFile.ts` needs widening past `content/lists/`. `.claude` is gitignored,
so that file is machine-local — this section is the part that travels.

Never let a value into a guide that the video did not clearly show. A wrong path in a LOD
guide breaks someone's install; `<!-- TODO: confirm — [MM:SS] -->` does not.

## Styling

Design tokens in `src/styles/tokens.css` — colours, the recurring surface gradients
(`--grad-gold-band`, `--grad-gold-card`, `--grad-panel`) and the layout constants.
Global utility classes in `src/styles/global.css`: `.container`, `.section` plus
`.section--intro`/`--tight`, `.eyebrow`, `.h1/.h2`, `.head--sub/--tight/--loose/--gap`
for heading-to-content gaps, `.lead` with `.section-lead` for a standfirst, `.flow` for
a run of stacked body copy, `.label` with `--gold`/`--red`, `.sub`, `.btn` variants,
`.card`, `.chip` and `.grid--*` (including `--install` and `--stack`). Everything else
is CSS Modules next to the component. Hover states always live in CSS, never inline.
Fonts are self-hosted via `@fontsource`.

Reach for a token or a utility before writing a literal. `rgba(217, 160, 60, .32)` has
a name; so does a 26px heading gap.

## Design source

The site was built from a Claude Design export (`TheModdingBungaloV2Design`, a sibling
folder outside this repo). The artboards are the visual reference; the pages under
`src/pages` are 1:1 translations with the shared header, footer and UI pieces factored
out.
