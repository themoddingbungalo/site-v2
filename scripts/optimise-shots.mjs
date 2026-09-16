// Turn a folder of raw in-game screenshots into the two WebP sizes the Gallery
// component wants: a full-size image for the lightbox and a -thumb for the grid
// tile. The raw captures are multi-megabyte PNGs and stay out of the repo
// (content/screenshots is gitignored); only the WebP output is committed.
//
//   node scripts/optimise-shots.mjs content/screenshots/NGVO ngvo
//
// writes public/assets/shots/ngvo/<name>.webp and <name>-thumb.webp.
//
// Needs the optional sharp dependency: npm install (it is a devDependency).
import { readdirSync, statSync, mkdirSync } from 'node:fs'
import { basename, extname, join } from 'node:path'

const [srcDir, listSlug] = process.argv.slice(2)
if (!srcDir || !listSlug) {
  console.error('usage: node scripts/optimise-shots.mjs <source-dir> <list-slug>')
  process.exit(1)
}

const { default: sharp } = await import('sharp')

// 2560 is the native width of a 1440p capture and plenty for a full-screen
// lightbox; 1280 covers a grid tile on a 2x display.
const FULL_WIDTH = 2560
const THUMB_WIDTH = 1280

const outDir = join('public/assets/shots', listSlug)
mkdirSync(outDir, { recursive: true })

const kb = (n) => `${Math.round(n / 1024)} KB`
const mb = (n) => `${(n / 1048576).toFixed(2)} MB`

const files = readdirSync(srcDir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort()
if (!files.length) {
  console.error(`No images found in ${srcDir}`)
  process.exit(1)
}

let before = 0
let after = 0

for (const file of files) {
  const name = basename(file, extname(file))
  const input = join(srcDir, file)
  const inSize = statSync(input).size
  before += inSize

  const full = join(outDir, `${name}.webp`)
  await sharp(input).resize({ width: FULL_WIDTH, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(full)

  const thumb = join(outDir, `${name}-thumb.webp`)
  await sharp(input).resize({ width: THUMB_WIDTH, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(thumb)

  const fullSize = statSync(full).size
  const thumbSize = statSync(thumb).size
  after += fullSize + thumbSize
  console.log(`${name.padEnd(22)} ${mb(inSize).padStart(8)}  ->  full ${kb(fullSize).padStart(7)}  thumb ${kb(thumbSize).padStart(6)}`)
}

console.log(`\n${files.length} shots: ${mb(before)} -> ${mb(after)} (${Math.round((1 - after / before) * 100)}% smaller)`)
console.log(`\nAdd them to the page's SHOTS array as assets/shots/${listSlug}/<name>.webp`)
