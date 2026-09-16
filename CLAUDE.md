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

- `src/markdown/useMarkdownFile.ts` bundles `content/{readmes,guides}/*.md` with
  `import.meta.glob(..., { query: '?raw' })`; files load lazily per page.
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

## Screenshots

Raw captures go in `content/screenshots/<LIST>/` (gitignored — they are 3-8 MB PNGs and
must never be committed). `npm run shots -- content/screenshots/<LIST> <slug>` writes two
WebP sizes per shot into `public/assets/shots/<slug>/`: `<name>.webp` at 2560px for the
lightbox and `<name>-thumb.webp` at 1280px for the grid tile. Reference both in the
page's `SHOTS` array (`src` and `thumb` on each `Shot`). Expect roughly a 90% saving.

Aim for a shot count that fills the grid: it is four columns at desktop, and modlist
pages pass a YouTube tile as `extra`, so 7 shots plus the video make two full rows.

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
