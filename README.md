# The Modding Bungalo — site v2

Source for the [Modding Bungalo](https://discord.gg/bungalo) wiki: curated Wabbajack
modlists, install guides and modding documentation for Skyrim and Fallout 4.

It is a React single-page app built with Vite and deployed to GitHub Pages. The modlist
**read mes and guides are plain markdown** in [`content/`](content/) so that list
authors can edit them without touching any code.

## Editing a read me or guide

Read [`content/README.md`](content/README.md). Short version: open the markdown file on
GitHub, press the pencil, commit to `main`. The site redeploys itself in a couple of
minutes. Every read me and guide page has an "Edit this page on GitHub" link at the
bottom.

## Reporting something instead

Not everything needs an edit. "Contribute to the Wiki" — in the header, in the footer and
at the end of every page — opens GitHub's
[issue chooser](https://github.com/themoddingbungalo/site-v2/issues/new/choose), and the
three forms in [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/) cover what people
actually send:

| Form | For |
| :-- | :-- |
| `bug-report.yml` | The site itself is broken — a page, a link, an image, the layout |
| `documentation-change.yml` | A read me or guide is wrong, out of date, or has a typo |
| `documentation-addition.yml` | Someone has written a guide, or wants one that is missing |

The closing band on every page carries the same two buttons — Join the Bungalo, and a
Contribute to the Wiki menu holding the three forms — so the invitation lands where
someone has just finished reading. Blank issues are off, and
`config.yml` points install and crash questions at the Discord before they get filed here. The labels the forms apply (`bug`, `documentation`,
`enhancement`) are GitHub's defaults — a form that names a label the repo does not have
fails on submit, so add the label first if you add one here.

## Running it locally

Requires Node 24 (or any current LTS).

```bash
npm ci            # first time, and after any package.json change
npm run dev       # http://localhost:5173 with hot reload
npm run build     # type-checks, builds into dist/ and writes the SPA 404 fallback
npm run preview   # serve the production build locally
```

## Layout

| Path | What lives there |
| :-- | :-- |
| `content/lists/<list>/` | Markdown edited by modlist authors: `readme.md` plus a `guides/` folder |
| `public/assets/` | Logos, covers, heroes and screenshots |
| `src/data/` | Site links, the modlist, guide and team registries |
| `src/pages/` | One React component per page; `src/pages/modlists/` holds the six modlist pages |
| `src/components/` | Shared header, footer and UI pieces |
| `src/content/` | Requirements and troubleshooting prose the modlist pages share word for word |
| `src/markdown/` | The markdown pipeline (react-markdown plus the kramdown extras) |
| `src/styles/` | Design tokens, global utilities and markdown typography |
| `.github/ISSUE_TEMPLATE/` | The three issue forms behind "Contribute to the Wiki" |
| `.github/workflows/pages.yml` | Build and deploy on every push to `main` |

### Adding a modlist

1. Add the read me at `content/lists/<slug>/readme.md`.
2. Add an entry to `modlists` in `src/data/modlists.ts` (name, game, author, cover,
   logo, read me file). The header menu, home cards, search and footer pick it up.
3. Add a page component at `src/pages/modlists/<Name>.tsx` and a route in `src/App.tsx`.
   Build it from the shared pieces in `src/components/ui/` and `src/content/install.tsx`
   rather than copying another list's page — the sections every list has (hero, spec
   cards, read-me band, troubleshooting tiles, Discord band) are all components already.
   The install section carries no steps of its own: it is a heading and `ReadMeCard`,
   because the author's read me is the one place the steps are maintained.

### Adding someone to the community page

Add an entry to `team` in `src/data/team.ts`: name, role, blurb, the modlists they
author, and only the links they actually have (`youtube`, `nexus`, `patreon`, `kofi`,
`github`). Without an `avatar` the card draws their initials, so a portrait is optional
— drop a square image in `public/assets/team/` when there is one.

### Adding a guide

1. Add the file at `content/lists/<list>/guides/<name>.md`.
2. Add an entry to `guides` in `src/data/guides.ts`. Its `slug` is the URL and its
   `file` is the path under `content/`. It appears in the header menu and renders at
   `/guides/<slug>` with a sidebar table of contents.

## Deployment

Pushing to `main` runs the Pages workflow, which builds with the base path GitHub
reports (`/site-v2/` on the project URL, `/` on a custom domain) and deploys `dist/`.
Deep links work because `dist/404.html` is a copy of the app shell.
