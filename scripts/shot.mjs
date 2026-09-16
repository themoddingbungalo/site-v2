// Dev-only screenshot helper driving headless Chrome over the DevTools protocol.
//   node scripts/shot.mjs <url> <out.png> [--width=1400] [--height=900] [--full] [--wait=1500] [--eval="js"]
// Unlike chrome --screenshot, this sets a real viewport (so 400px-wide checks work),
// waits for lazily loaded content, can capture the full page height, and can print
// the result of a JS expression (e.g. document.documentElement.scrollWidth).
import { spawn } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const [url, out, ...rest] = process.argv.slice(2)
if (!url || !out) { console.error('usage: shot.mjs <url> <out.png> [--width=] [--height=] [--full] [--wait=] [--eval=]'); process.exit(2) }
const opt = Object.fromEntries(rest.map((a) => { const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] ?? true] : [a, true] }))
const width = Number(opt.width ?? 1400)
const height = Number(opt.height ?? 900)
const waitMs = Number(opt.wait ?? 1500)

const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=0', `--window-size=${Math.max(width, 500)},${height}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] })
const port = await new Promise((resolve, reject) => {
  let buf = ''
  chrome.stderr.on('data', (d) => { buf += d; const m = buf.match(/DevTools listening on ws:\/\/127\.0\.0\.1:(\d+)/); if (m) resolve(m[1]) })
  chrome.on('exit', () => reject(new Error('chrome exited\n' + buf)))
  setTimeout(() => reject(new Error('timeout waiting for chrome\n' + buf)), 15000)
})

const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json()
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
let id = 0
const pending = new Map()
const events = []
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data)
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id) } else if (msg.method) events.push(msg)
})
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const n = ++id
  pending.set(n, (m) => (m.error ? reject(new Error(m.error.message)) : resolve(m.result)))
  ws.send(JSON.stringify({ id: n, method, params }))
})
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

try {
  await send('Page.enable')
  await send('Runtime.enable')
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 700 })
  await send('Page.navigate', { url })
  const start = Date.now()
  while (!events.some((e) => e.method === 'Page.loadEventFired') && Date.now() - start < 15000) await sleep(50)
  await sleep(waitMs)
  if (opt.eval) {
    const r = await send('Runtime.evaluate', { expression: String(opt.eval), returnByValue: true })
    console.log('EVAL:', JSON.stringify(r.result.value))
  }
  const errors = events.filter((e) => e.method === 'Runtime.exceptionThrown').map((e) => e.params.exceptionDetails.exception?.description ?? e.params.exceptionDetails.text)
  if (errors.length) console.log('PAGE ERRORS:', errors.join('\n'))
  let shotH = height
  if (opt.full) {
    const r = await send('Runtime.evaluate', { expression: 'document.documentElement.scrollHeight', returnByValue: true })
    shotH = Math.min(r.result.value, 16000)
    await send('Emulation.setDeviceMetricsOverride', { width, height: shotH, deviceScaleFactor: 1, mobile: width < 700 })
    await sleep(300)
  }
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: shotH, scale: 1 } })
  writeFileSync(out, Buffer.from(shot.data, 'base64'))
  console.log(`wrote ${out} (${width}x${shotH})`)
} finally {
  ws.close()
  chrome.kill()
}
