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
npm run shots -- content/screenshots/NGVO ngvo             # optimise in-game screenshots (see below)
```

There is no test suite. `npm run build` must pass; the deploy workflow runs it.

## Base path

`vite.config.ts` reads `VITE_BASE_PATH` (default `/`). The workflow sets it from
`actions/configure-pages`, so it is `/site-v2/` on `themoddingbungalo.github.io/site-v2`
and `/` once a custom domain is attached. Never hard-code either. Use
`asset('assets/...')` from `src/data/site.ts` for public files and `<Link to>` for
internal navigation; `BrowserRouter` gets its `basename` from `import.meta.env.BASE_URL`.

## Content pipeline

- Read mes are served at `/lists/<list>/read-me`, the URL the old wiki used, so links
  already published elsewhere keep working; the interim v2 path
  `/modlists/<list>/readme` redirects to it. Build the URL with `readmePath()`, never
  by hand. The list pages themselves are still `/modlists/<list>`.
- Each modlist owns a folder: `content/lists/<list>/readme.md` and any number of
  `content/lists/<list>/guides/<name>.md`. `src/markdown/useMarkdownFile.ts` bundles
  `content/lists/**/*.md` with `import.meta.glob(..., { query: '?raw' })`; files load
  lazily per page, keyed by the path under `content/` (`lists/csvp/readme.md`).
- `src/markdown/Markdown.tsx` renders with react-markdown + remark-gfm + rehype-raw +
  rehype-slug. `remarkKramdown.ts` implements `{: .important|.warning|.note}` callouts
  and `{: .btn}` button links. `resolveAsset.ts` rewrites GitHub/GitLab blob URLs to raw
  URLs, maps old-wiki paths through the asset maps in `src/data/modlists.ts` /
  `src/data/guides.ts`, and drops unmapped local images. Badge-only `<table>`s become
  pill rows; `.youtube-container` is pure CSS.
- `src/markdown/headings.ts` extracts `##`/`###` headings with the same slugs
  rehype-slug produces (github-slugger), feeding `SectionNav`.
- rehype-raw is deliberately unsanitised: authors have write access and the read mes
  rely on raw HTML.
- `src/styles/prose.css` is the typography for rendered markdown.

## Registries

`src/data/modlists.ts` and `src/data/guides.ts` drive the header menus, search index,
home cards, footer, read me routes and guide routes. Adding a list or guide is a data
entry plus (for lists) a page component and a route in `src/App.tsx`.

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

The grid is four columns at desktop. A `Shot` marked `feature` (and the `extra` video
tile, via a page-level class) spans two columns and two rows, which keeps the 16/9
shape without making its row taller. NGVO uses that for the video plus one shot, so
the two of them fill the top two rows and the remaining eight shots fill two more:
aim for a count that packs, and remember `extraFirst` puts the video before the shots.
Below four columns the 2x2 spans are disabled, since they cannot pack without holes.

## Styling

Design tokens in `src/styles/tokens.css`; global utility classes (`.container`,
`.section`, `.eyebrow`, `.h1/.h2`, `.btn` variants, `.card`, `.chip`, `.grid--*`) in
`src/styles/global.css`; everything else is CSS Modules next to the component. Hover
states always live in CSS, never inline. Fonts are self-hosted via `@fontsource`.

## Design source

The site was built from a Claude Design export (`TheModdingBungaloV2Design`, a sibling
folder outside this repo). The artboards are the visual reference; the pages under
`src/pages` are 1:1 translations with the shared header, footer and UI pieces factored
out.
