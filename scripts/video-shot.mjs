// Dev-only: pull a publishable screenshot out of a YouTube video. The guide videos are
// uploaded in 4K, so a cropped dialog comes out sharp — /watch only ever fetches 720p
// for frame extraction, which is fine for reading a menu and not fine for printing it.
//   node scripts/video-shot.mjs <video-id|url> <timestamp> <out.webp> [flags]
//     --crop=x,y,w,h    region as fractions of the frame (0-1), e.g. 0.4,0.02,0.6,0.35
//     --width=1600      output width in px (default 1600)
//     --quality=82      webp quality (default 82)
//     --keep            leave the full uncropped frame next to the output, as .full.png
// The source video is cached in .tmp/video-shots/<id>.mp4 (gitignored), so repeated
// grabs from one video download it once. ffmpeg/yt-dlp come from PATH; override with
// FFMPEG / YT_DLP if a session's PATH predates the install.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CACHE = resolve(ROOT, '.tmp', 'video-shots')
const FFMPEG = process.env.FFMPEG || 'ffmpeg'
const YT_DLP = process.env.YT_DLP || 'yt-dlp'

const argv = process.argv.slice(2)
const flags = {}
const words = []
for (const a of argv) {
  const m = a.match(/^--([^=]+)(?:=(.*))?$/)
  if (m) flags[m[1]] = m[2] ?? true
  else words.push(a)
}
const [source, stamp, out] = words
if (!source || !stamp || !out) {
  console.error('usage: video-shot.mjs <video-id|url> <MM:SS> <out.webp> [--crop=x,y,w,h] [--width=] [--quality=] [--keep]')
  process.exit(2)
}

const url = /^https?:\/\//.test(source) ? source : `https://www.youtube.com/watch?v=${source}`
const id = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{6,})/)?.[1] ?? 'video'
const outPath = resolve(ROOT, out)
mkdirSync(CACHE, { recursive: true })
mkdirSync(dirname(outPath), { recursive: true })

// ── source, downloaded once per video ─────────────────────────────────────────
const video = resolve(CACHE, `${id}.mp4`)
if (!existsSync(video)) {
  console.error(`[video-shot] fetching ${id} at up to 2160p…`)
  try {
    // Prefer av01: same 2160p at a fraction of the bytes (48 MB vs 604 MB on a
    // 12-minute video), and we only ever decode single frames out of it.
    execFileSync(YT_DLP, ['-f', 'bv*[height<=2160][vcodec^=av01]/bv*[height<=2160]/b', '-o', video, url], { stdio: ['ignore', 'ignore', 'inherit'] })
  } catch {
    console.error(`[video-shot] yt-dlp failed. Is it on PATH? Set YT_DLP=... to point at it.`)
    process.exit(1)
  }
}

// ── frame ─────────────────────────────────────────────────────────────────────
// -ss before -i seeks by keyframe, which is fast and lands within a frame or two of
// the timestamp. That is close enough for a UI screenshot and much faster than a
// decode from zero on a 4K file.
const framePng = resolve(CACHE, `${id}-${String(stamp).replace(/[^\w]/g, '')}.png`)
try {
  execFileSync(FFMPEG, ['-ss', String(stamp), '-i', video, '-frames:v', '1', '-y', framePng], { stdio: ['ignore', 'ignore', 'pipe'] })
} catch (err) {
  console.error(`[video-shot] ffmpeg failed: ${err.stderr?.toString().split('\n').slice(-3).join('\n') ?? err.message}`)
  process.exit(1)
}

const meta = await sharp(framePng).metadata()
const width = Number(flags.width ?? 1600)
const quality = Number(flags.quality ?? 82)

let pipeline = sharp(framePng)
if (flags.crop) {
  const parts = String(flags.crop).split(',').map(Number)
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 1)) {
    console.error('--crop takes four fractions of the frame between 0 and 1: x,y,w,h')
    process.exit(2)
  }
  const [fx, fy, fw, fh] = parts
  const box = {
    left: Math.round(fx * meta.width),
    top: Math.round(fy * meta.height),
    width: Math.min(Math.round(fw * meta.width), meta.width - Math.round(fx * meta.width)),
    height: Math.min(Math.round(fh * meta.height), meta.height - Math.round(fy * meta.height)),
  }
  pipeline = pipeline.extract(box)
}

const info = await pipeline.resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(outPath)
console.log(`${out} — ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB (source frame ${meta.width}x${meta.height})`)

if (flags.keep) {
  await sharp(framePng).resize({ width: 1200 }).png().toFile(outPath.replace(/\.webp$/, '.full.png'))
  console.log(`  full frame kept at ${out.replace(/\.webp$/, '.full.png')}`)
} else {
  rmSync(framePng, { force: true })
}
console.error(`[video-shot] source cached at .tmp/video-shots/${id}.mp4 (${Math.round(statSync(video).size / 1048576)} MB) — delete .tmp/video-shots when done`)
