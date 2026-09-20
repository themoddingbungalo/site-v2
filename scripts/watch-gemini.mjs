// Dev-only: hand a YouTube video to Gemini and get notes back. Gemini reads the video
// itself — picture and audio — so this is the cheap first pass over a two-hour modding
// stream that /watch (frames + captions, locally) would choke on.
//   node scripts/watch-gemini.mjs <url|video-id> [extra prompt...] [flags]
//     --preset=outline|transcript|guide|steps|ask   what to ask for (default: outline)
//     --model=gemini-3.5-flash                     override the model
//     --start=MM:SS --end=MM:SS                    only look at that stretch
//     --fps=0.5                                    frames sampled per second (lower = cheaper)
//     --out=path.md                                where to write (default .tmp/video-notes/)
//     --quiet                                      print only the output path
//     --raw=path.json                              also dump the API response, for debugging
//     --legacy                                     use the older :generateContent endpoint
//     --list-models                                check the key and list what it can call
// There is no frame-resolution dial: this API revision has no media_resolution, and the
// legacy endpoint accepts one but ignores it. Default detail already reads a title bar
// ("SSEEdit 4.0.4"); when it cannot read the screen, that is /watch's job, not this one.
// The key comes from GEMINI_API_KEY, then ~/.config/watch/.env, then .env.local here.
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const API = 'https://generativelanguage.googleapis.com/v1beta'
const API_REVISION = '2026-05-20'
const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash'

const argv = process.argv.slice(2)
const flags = {}
const words = []
for (const a of argv) {
  const m = a.match(/^--([^=]+)(?:=(.*))?$/)
  if (m) flags[m[1]] = m[2] ?? true
  else words.push(a)
}

if (!words.length && !flags['list-models']) {
  console.error('usage: watch-gemini.mjs <youtube-url|video-id> [prompt...] [--preset=outline|transcript|guide|steps|ask] [--start=] [--end=] [--fps=] [--model=] [--out=] [--quiet] [--legacy] [--list-models]')
  process.exit(2)
}

// ── key ───────────────────────────────────────────────────────────────────────
const envFile = (path) => {
  const out = {}
  if (!existsSync(path)) return out
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const raw = line.trim()
    if (!raw || raw.startsWith('#') || !raw.includes('=')) continue
    const [k, ...rest] = raw.split('=')
    let v = rest.join('=').trim()
    if (v.length > 1 && (v[0] === '"' || v[0] === "'") && v.at(-1) === v[0]) v = v.slice(1, -1)
    out[k.trim()] = v
  }
  return out
}
const stored = { ...envFile(join(ROOT, '.env.local')), ...envFile(join(homedir(), '.config', 'watch', '.env')) }
const KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || stored.GEMINI_API_KEY || stored.GOOGLE_API_KEY
if (!KEY) {
  console.error('No Gemini key. Put GEMINI_API_KEY=... in ' + join(homedir(), '.config', 'watch', '.env') + ' (or export it).')
  process.exit(2)
}
const headers = { 'content-type': 'application/json', 'x-goog-api-key': KEY }

// ── prompts ───────────────────────────────────────────────────────────────────
// Written for Skyrim/Fallout modding walkthroughs: the thing we need out of these
// videos is every value the presenter types and every box they tick, with the
// timestamp to check it against, not a prose summary of the vibe.
const HOUSE_STYLE = `You are taking notes on a video for The Modding Bungalo wiki, which documents Wabbajack modlists and Bethesda modding tools (MO2, xEdit, xLODGen, TexGen, DynDOLOD, Creation Kit).

Rules:
- Every step, setting, path, checkbox, dropdown value and file name the presenter shows on screen matters. Name them exactly as they appear, including capitalisation. Never write "configure the settings" when you can write which settings.
- Tag anything you report with the timestamp it happens at, as [MM:SS] (or [H:MM:SS] past an hour).
- Distinguish what is said from what is shown. If the presenter says one thing and the screen shows another, say so.
- Call out anything version-specific, anything they warn about, and any step people are told they must not skip.
- If something is unreadable or you are unsure, write "unclear" rather than guessing. Do not invent a value.`

const PRESETS = {
  outline: `${HOUSE_STYLE}

Produce a structured outline of the whole video:
1. A two-sentence statement of what the video covers and who it is for.
2. Chapters, in order: timestamp range, heading, and under each a tight bullet list of what is done or configured.
3. "Exact values" — a table of every setting, path or number shown, with its timestamp.
4. "Warnings and gotchas" — each with its timestamp.
5. "Not covered" — anything the video assumes you already did.`,

  steps: `${HOUSE_STYLE}

Produce the procedure the video teaches, as a numbered list a reader can follow without watching it. One action per step, in the order performed, each ending with its timestamp in brackets. Where a step has a value to enter or a box to tick, put the exact value in backticks. After the list, add "If it goes wrong" — the failure modes the presenter mentions and what they do about them.`,

  transcript: `Transcribe this video in full. Use [MM:SS] timestamps at the start of every speaker turn or every few sentences, whichever is more frequent. Transcribe speech verbatim. Where the screen shows something the words depend on — a menu, a path, a setting, an error message — insert it in square brackets like [on screen: Settings > Downloads > "Keep archives"]. Do not summarise.`,

  guide: `${HOUSE_STYLE}

Write the video up as a markdown guide page for the wiki. Conventions of this repo, follow them exactly:
- No H1: the page renders its own title from the registry. Open with a one-paragraph standfirst saying what the reader will have done by the end.
- \`##\` headings for each phase of the job (these become the page's "on this page" nav, so name them for what the reader is doing, e.g. "Generating terrain LOD"). \`###\` for sub-steps.
- Numbered lists for anything sequential, with exact values in backticks.
- Callouts use a kramdown attribute line on its own line *above* the paragraph: \`{: .important}\` for something they must get right, \`{: .warning}\` for something that breaks the install, \`{: .note}\` for an aside. Do not overuse them — at most one per section.
- Buttons: \`[Label](url){: .btn}\`. Tables with alignment rows are fine.
- Plain British English, second person, no filler, no "in this guide we will". Do not mention the video, the presenter or yourself.
- Where the video shows a step you cannot describe in words alone, leave \`<!-- screenshot: what it should show, [MM:SS] -->\` on its own line so a screenshot can be dropped in later.
- End with nothing — no sign-off, no "happy modding".
Output the markdown only, no code fence around the whole thing.`,

  ask: HOUSE_STYLE,
}

if (flags['list-models']) {
  const r = await fetch(`${API}/models`, { headers })
  const j = await r.json()
  if (!r.ok) { console.error(JSON.stringify(j, null, 2)); process.exit(1) }
  for (const m of j.models ?? []) console.log(m.name?.replace(/^models\//, ''), '—', m.displayName ?? '')
  process.exit(0)
}

const source = words.shift()
if (!source) {
  console.error('usage: watch-gemini.mjs <youtube-url|video-id> [prompt...] [--preset=outline|transcript|guide|steps|ask] [--start=] [--end=] [--fps=] [--model=] [--out=] [--quiet] [--legacy]')
  process.exit(2)
}
const url = /^https?:\/\//.test(source) ? source : `https://www.youtube.com/watch?v=${source}`
const videoId = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{6,})/)?.[1] ?? 'video'

const preset = String(flags.preset ?? (words.length ? 'ask' : 'outline'))
if (!PRESETS[preset]) { console.error(`unknown --preset=${preset}; pick one of ${Object.keys(PRESETS).join(', ')}`); process.exit(2) }
const model = String(flags.model ?? DEFAULT_MODEL)
const question = words.join(' ').trim()
const range = flags.start || flags.end ? `\n\nOnly cover ${flags.start ?? 'the start'} to ${flags.end ?? 'the end'} of the video. Ignore the rest.` : ''
const prompt = [PRESETS[preset], question && `The specific thing being asked: ${question}`, range].filter(Boolean).join('\n\n')

// ── request ───────────────────────────────────────────────────────────────────
const secs = (t) => {
  if (t == null || t === true) return undefined
  const p = String(t).split(':').map(Number)
  if (p.some(Number.isNaN)) { console.error(`bad timestamp: ${t}`); process.exit(2) }
  return p.reduce((a, n) => a * 60 + n, 0)
}
const start = secs(flags.start)
const end = secs(flags.end)
const fps = flags.fps ? Number(flags.fps) : undefined
if (flags.res) { console.error('--res is gone: this API revision has no resolution dial. Use --fps for more frames, or /watch --resolution 1024 to read small on-screen text.'); process.exit(2) }

const call = async () => {
  if (flags.legacy) {
    const video = { file_data: { file_uri: url } }
    if (start != null || end != null || fps != null) {
      video.video_metadata = {
        ...(start != null && { start_offset: { seconds: start } }),
        ...(end != null && { end_offset: { seconds: end } }),
        ...(fps != null && { fps }),
      }
    }
    const body = { contents: [{ parts: [video, { text: prompt }] }] }
    const r = await fetch(`${API}/models/${model}:generateContent`, { method: 'POST', headers, body: JSON.stringify(body) })
    return [r, await r.json()]
  }
  const video = { type: 'video', uri: url }
  // `processing` takes exactly type/start_offset/end_offset/fps, and the offsets are
  // duration strings ("90s"), not milliseconds — anything else is a 400.
  if (start != null || end != null || fps != null) {
    video.processing = {
      type: 'static',
      ...(start != null && { start_offset: `${start}s` }),
      ...(end != null && { end_offset: `${end}s` }),
      ...(fps != null && { fps }),
    }
  }
  const body = { model, input: [video, { type: 'text', text: prompt }] }
  const r = await fetch(`${API}/interactions`, { method: 'POST', headers: { ...headers, 'Api-Revision': API_REVISION }, body: JSON.stringify(body) })
  return [r, await r.json()]
}

// Pull the text out without betting on one response shape: the Interactions API puts it
// in steps[].content[].text, :generateContent in candidates[].content.parts[].text.
const textOf = (j) => {
  const out = []
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk)
    if (!node || typeof node !== 'object') return
    if (typeof node.text === 'string' && node.thought !== true) out.push(node.text)
    for (const [k, v] of Object.entries(node)) if (k !== 'text' && typeof v === 'object') walk(v)
  }
  walk(j.steps ?? j.candidates ?? j.output ?? j)
  return out.join('').trim()
}

const [res_, json] = await call()
if (!res_.ok) {
  console.error(`Gemini returned ${res_.status}:`)
  console.error(JSON.stringify(json, null, 2))
  if (!flags.legacy) console.error('\nIf the endpoint or a field was rejected, retry with --legacy.')
  process.exit(1)
}
const text = textOf(json)
if (!text) {
  console.error('Gemini returned no text. Raw response:')
  console.error(JSON.stringify(json, null, 2).slice(0, 4000))
  process.exit(1)
}

if (flags.raw) writeFileSync(resolve(String(flags.raw)), JSON.stringify(json, null, 2), 'utf8')

const u = json.usage ?? json.usageMetadata ?? {}
const tokens = [
  `in ${u.total_input_tokens ?? u.promptTokenCount ?? '?'}`,
  `out ${u.total_output_tokens ?? u.candidatesTokenCount ?? '?'}`,
  u.total_thought_tokens ? `thinking ${u.total_thought_tokens}` : null,
  u.total_cached_tokens ? `cached ${u.total_cached_tokens}` : null,
].filter(Boolean).join(', ')
const outPath = resolve(String(flags.out ?? join(ROOT, '.tmp', 'video-notes', `${videoId}-${preset}.md`)))
mkdirSync(dirname(outPath), { recursive: true })
const header = preset === 'guide' ? '' : `<!-- ${url} · ${model} · ${preset}${flags.start || flags.end ? ` · ${flags.start ?? '0:00'}-${flags.end ?? 'end'}` : ''} · ${new Date().toISOString().slice(0, 10)} -->\n\n`
writeFileSync(outPath, header + text + '\n', 'utf8')

if (flags.quiet) console.log(outPath)
else console.log(text)
console.error(`\n[watch-gemini] ${outPath} · ${model} · tokens: ${tokens}`)
