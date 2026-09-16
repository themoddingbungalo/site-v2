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

// Captures from an ultrawide setup often arrive letterboxed into a 16/9 frame. Find
// those bars so they can be cropped off, but only trust an obvious, symmetric pair:
// a genuinely dark screenshot must never be mistaken for one and cropped into.
const BLACK = 12
const MIN_BAR = 8
async function letterbox(input) {
  const img = sharp(input)
  const { width, height } = await img.metadata()
  const { data, info } = await img.removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const rowIsBlack = (y) => {
    for (let x = 0; x < width; x += 7) {
      const i = (y * width + x) * info.channels
      if (data[i] > BLACK || data[i + 1] > BLACK || data[i + 2] > BLACK) return false
    }
    return true
  }
  let top = 0
  while (top < height && rowIsBlack(top)) top++
  let bottom = 0
  while (bottom < height - top && rowIsBlack(height - 1 - bottom)) bottom++

  const sane = Math.abs(top - bottom) <= 2 && top >= MIN_BAR && bottom >= MIN_BAR && top + bottom < height * 0.4
  if (!sane) return null
  return { left: 0, top, width, height: height - top - bottom }
}

const kb = (n) => `${Math.round(n / 1024)} KB`
const mb = (n) => `${(n / 1048576).toFixed(2)} MB`

// Captures come named however the author saved them ("the rift.png", "Molag_bal.png").
// Spaces and capitals make for awkward URLs, so the published name is slugified.
const slug = (s) =>
  s.toLowerCase().trim().replace(/[_\s]+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')

const files = readdirSync(srcDir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort()
if (!files.length) {
  console.error(`No images found in ${srcDir}`)
  process.exit(1)
}

let before = 0
let after = 0

for (const file of files) {
  const name = slug(basename(file, extname(file)))
  const input = join(srcDir, file)
  const inSize = statSync(input).size
  before += inSize

  const crop = await letterbox(input)
  const source = () => (crop ? sharp(input).extract(crop) : sharp(input))

  const full = join(outDir, `${name}.webp`)
  await source().resize({ width: FULL_WIDTH, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(full)

  const thumb = join(outDir, `${name}-thumb.webp`)
  await source().resize({ width: THUMB_WIDTH, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(thumb)

  const fullSize = statSync(full).size
  const thumbSize = statSync(thumb).size
  after += fullSize + thumbSize
  const note = crop ? `  (trimmed ${crop.top}px letterbox bars)` : ''
  console.log(`${name.padEnd(22)} ${mb(inSize).padStart(8)}  ->  full ${kb(fullSize).padStart(7)}  thumb ${kb(thumbSize).padStart(6)}${note}`)
}

console.log(`\n${files.length} shots: ${mb(before)} -> ${mb(after)} (${Math.round((1 - after / before) * 100)}% smaller)`)
console.log(`\nAdd them to the page's SHOTS array as assets/shots/${listSlug}/<name>.webp`)
