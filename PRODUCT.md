# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary visitor is **someone already partway through an install** — a member of the
Bungalo Discord who has picked a list, started it, and hit a question. They arrive at a
specific read me or guide, often with Wabbajack or Mod Organizer open on another screen,
and they need the requirements, the step, or the answer fast. They are not browsing.

Secondary audiences, both real but not the ones the site is tuned for:

- **Newcomers** arriving cold from YouTube, Nexus or Google, deciding whether a list is
  for them and whether they can install it at all.
- **List authors and the Bungalo team**, who publish here by editing markdown on GitHub
  and point people at these pages instead of pinned Discord posts.

## Product Purpose

The Modding Bungalo wiki is the published documentation for the Discord's curated
Wabbajack modlists for Skyrim SE and Fallout 4. It carries each list's read me, the
long-form guides its author writes, the video walkthroughs for the underlying tooling
(Wabbajack, xLODGen/DynDOLOD, xEdit, Creation Kit), and the roster of the people behind
the lists.

Success is all four of these at once:

1. **Fewer repeat questions** — the support channels stop answering the same install
   question because the read me already covers it.
2. **More successful installs** — people pick the list that fits their rig and taste,
   and actually finish rather than bouncing partway.
3. **The canonical reference** — authors publish here rather than in Nexus descriptions
   or pinned posts, and the lists themselves link back to it.
4. **A growing community** — the project reads as serious and alive, and that pulls
   people into the Discord.

## Positioning

A community-run wiki where the modlist authors themselves write the documentation, in
plain markdown they edit directly, for lists this specific community hosts. It is not a
general modding encyclopaedia and not a directory of everyone's lists — the six lists
here are the ones the Bungalo stands behind, each with its author present in the Discord
to answer for it.

The Bungalo is rated R, not XXX. NSFW lists live at the sister server, The Modding
Bordello (`themoddingbordello.com`). That split is explicit and public.

## Operating Context

The site is read alongside an install in progress, not in a quiet reading session:

- Wabbajack, Mod Organizer 2 and the game are usually open on the same machine; the wiki
  often sits on a second monitor or a phone propped beside the PC.
- Read mes are long, procedural and consulted by section — people jump to a heading,
  not read top to bottom. Every `##` heading is an anchor and feeds the on-page nav.
- Installs run hours and hundreds of gigabytes, so a mistake found late is expensive.
  Requirements, disk space and prerequisites carry real weight.
- The path in and out is Discord. People arrive from a link there and return there when
  the page does not answer them.
- Authors edit content through GitHub's web editor with the pencil icon; the site
  redeploys itself in about two minutes.

## Capabilities and Constraints

Confirmed and binding:

- **Content stays author-editable markdown.** Each list owns a folder
  (`content/lists/<list>/readme.md` plus `content/lists/<list>/guides/`), and all of it
  must remain plain markdown a non-technical author can edit on
  GitHub without running anything. No CMS, no authoring build step. `content/README.md`
  is the contract with those authors and changes to rendering must be reflected there.
- **Static hosting only.** It deploys as a static SPA to GitHub Pages. No server, no
  database, no API, no runtime backend. Deep links work via a `404.html` copy of the
  app shell.
- **Free, no accounts, no ads.** No sign-in, no tracking, no monetisation on the site.
  Support links (Ko-fi, Patreon) point at individual people, never at the site.
- **SFW.** Content stays within the Bungalo's rating; NSFW belongs to the Bordello.

Current functional surface: home, six modlist pages, a read me route per list, a guides
hub with five tooling sections and their videos, per-guide pages with a table of
contents, a community roster, and a search overlay indexed over lists, guides and team.
The registries in `src/data/` drive nav, search, home cards and footer from one place.

Terminology used as-is, not explained down: Wabbajack, modlist, read me, Mod Organizer
(MO2), LOD, xEdit, Creation Kit, patch, leveled list, Requiem, EnaiRim.

Undecided / not settled here: the custom domain is not yet attached, so the base path
varies between the project URL and root.

## Brand Commitments

- Name: **The Modding Bungalo**. Discord (`discord.gg/bungalo`) is the community's home
  and the site's primary outbound destination.
- Each modlist owns its own identity — its logo and cover art come from its author and
  are used as given, per list, in `public/assets/logos/`.
- LoreRim keeps its own site at `lorerim.com`; its page here deliberately points there
  rather than duplicating a read me.
- The Bordello relationship is stated plainly on the site and stays that way.

## Evidence on Hand

Real:

- Five written read mes (`content/lists/<list>/readme.md`) and two long-form CSVP
  guides, authored by the list authors.
- Nine video walkthroughs on the guides hub, real YouTube ids in `src/data/guides.ts`.
- In-game screenshots per list under `public/assets/shots/`, plus hero and cover art.
- The team roster in `src/data/team.ts` — names, roles, authored lists and the profile
  links that actually exist.

Must not be fabricated:

- **Team bios and avatars.** Most entries read "Bio coming soon" and have no portrait.
  Future work waits for each person's own copy and picture; it does not write a bio for
  them or source a likeness.
- **The leveled-lists video.** Its id is deliberately empty because the source was taken
  down; the card renders as text until someone supplies a working video.
- Any install figure, benchmark, download count, testimonial or endorsement not already
  in the repository.

Worth knowing: the hero stat counts in `src/pages/Home.tsx` are hand-maintained and not
derived from the registries, so they drift from the published content when lists or
guides are added.

## Product Principles

1. **Answer the person mid-install first.** The visitor usually has a question and a
   stalled download. Findability, accurate requirements and jumpable structure outrank
   everything that flatters the page.
2. **The author's words are the product.** The site renders what list authors write; it
   does not rewrite, summarise or speak over them. Markdown editing on GitHub stays the
   whole job for them.
3. **Be the thing worth linking to.** Anything that would otherwise live in a pinned
   Discord message belongs here, complete enough that the link ends the conversation.
4. **Say what the list actually is.** Each list is different in size, demands and taste;
   honest framing up front saves a 150 GB mistake and is worth more than persuasion.
5. **Nothing the community has to pay for or log into.** Static, free and open, with
   support flowing to the individual people who build the lists.
