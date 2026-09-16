// Dev-only check: render every markdown file through the real pipeline with
// react-dom/server and print the HTML, so the renderer can be inspected without a browser.
//   npx esbuild scripts/render-md.tsx --bundle --platform=node --format=esm \
//     --loader:.css=empty --define:import.meta.env.BASE_URL='"/"' --outfile=.tmp/render-md.mjs && node .tmp/render-md.mjs <file>
import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { extractHeadings } from '../src/markdown/headings'
import { Markdown } from '../src/markdown/Markdown'
import { preprocess } from '../src/markdown/preprocess'
import { readmeAssets } from '../src/data/modlists'
import { guideAssets } from '../src/data/guides'

const file = process.argv[2]
const src = readFileSync(file, 'utf8')
const assets = file.includes('guides') ? guideAssets : readmeAssets
const html = renderToStaticMarkup(<Markdown source={src} assets={assets} enlargeImages={file.includes('guides')} />)
console.log('HEADINGS:', JSON.stringify(extractHeadings(preprocess(src)).filter((h) => h.level === 2).map((h) => h.id)))
console.log(html)
