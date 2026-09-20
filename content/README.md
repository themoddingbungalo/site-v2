# Editing the read mes and guides

Everything in this folder is plain markdown, and editing it is the whole job. You do
not need to run anything or understand the rest of the site.

Every modlist owns one folder. Its read me lives at the top of it, and its guides live
in a `guides/` folder underneath:

```
content/
  lists/
    csvp/
      readme.md            -> /lists/csvp/read-me/
      guides/
        colloquy-guide.md      -> /guides/csvp-colloquy-guide
        modification-manual.md -> /guides/csvp-modification-manual
    ngvo/
      readme.md            -> /lists/ngvo/read-me/
    ...
```

| File | Page |
| :-- | :-- |
| `lists/ngvo/readme.md` | NGVO — Read Me |
| `lists/csvp/readme.md` | CSVP — Read Me |
| `lists/ghoulified/readme.md` | Ghoulified Reality — Read Me |
| `lists/loreout/readme.md` | LoreOut — Read Me |
| `lists/dngg/readme.md` | Do Not Go Gentle — Read Me |
| `lists/csvp/guides/colloquy-guide.md` | Colloquy's Guide (CSVP) |
| `lists/csvp/guides/modification-manual.md` | Modification Manual (CSVP) |

CSVP is the only list with guides so far; the other lists get a `guides/` folder when
someone writes one for them.

## How to make a change

1. Open the file on GitHub and press the pencil icon ("Edit this file"). Every read me
   and guide page on the site also has an **Edit this page on GitHub** link at the
   bottom that takes you straight there.
2. Make your edit in the editor. The **Preview** tab shows roughly how it will look.
3. Press **Commit changes**, keep "Commit directly to the main branch" selected, and
   commit.

The site rebuilds itself and your change is live in about two minutes. If it does not
show up, do a hard refresh (Ctrl+F5).

To add a guide to a list, put the `.md` file in that list's `guides/` folder (create
the folder if it is the first one) and ask the site maintainer to wire it up — it is
one entry in `src/data/guides.ts`, which sets the title, the blurb and the page
address. A brand new list works the same way: a new `lists/<name>/readme.md` plus one
entry in `src/data/modlists.ts`.

## What you can write

Standard markdown all works: `#` through `######` headings, **bold**, *italic*,
`inline code`, fenced code blocks, links, images, blockquotes, horizontal rules,
bullet and numbered lists (including nested), and tables with alignment rows.

Every `##` heading becomes an entry in the "on this page" navigation and gets an
anchor you can link to. `## Pre-Installation` is reachable as `#pre-installation`.

### Callouts

Put a kramdown attribute line *above* a paragraph or blockquote:

```
{: .important}
NGVO requires the latest version of Skyrim and the full AE upgrade.

{: .warning}
An SSD is absolutely required.

{: .note}
Screenshots save to Overwrite\Stock Game.
```

That renders a coloured callout box: gold for `.important`, red for `.warning`,
green for `.note`. This is the same syntax the old Jekyll wiki used, so existing
read mes can be pasted in unchanged.

### Buttons

Add `{: .btn}` after a link to render it as a gold button:

```
[Download on Wabbajack](https://github.com/wabbajack-tools/wabbajack/releases){: .btn}
```

### Videos

Paste a YouTube embed the same way the old wiki did and it becomes a responsive
16:9 player:

```
<div class="youtube-container">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
</div>
```

### Images

External image URLs work as-is. GitHub `blob` links are rewritten to the raw file
automatically, so you can paste an image URL straight out of your repo's file view.
(GitLab `-/blob/` links get the same treatment.)

For images hosted on this site, the paths from the old wiki (for example
`assets/csvp/logo.png`) are mapped onto the files under `public/assets/`. A local
path that is not mapped is skipped rather than shown as a broken image. To add a new
image, put it under `public/assets/` and ask the maintainer to add the mapping.

### Link badges

A hand-written HTML `<table>` whose cells are only links (the "Nexus Page · Wabbajack
· Load Order Library" row at the top of most read mes) is rendered as a row of gold
pill links.

## What gets ignored

YAML front matter (`--- title: ... ---`) and Jekyll Liquid tags such as
`{{ site.baseurl }}` are stripped, so you can paste straight from the old wiki.

## A note on raw HTML

Raw HTML in these files is rendered as-is (that is how the video embeds and badge
tables work). Only people with write access to this repository can change these
files, so keep it to the patterns above.
