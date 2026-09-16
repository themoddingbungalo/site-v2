// GitHub Pages serves 404.html for unknown paths. Copying the SPA shell there
// lets deep links like /modlists/csvp/readme load the app, which then routes.
import { copyFileSync } from 'node:fs'
copyFileSync('dist/index.html', 'dist/404.html')
console.log('postbuild: wrote dist/404.html')
