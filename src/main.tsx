import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
// Global styles first so page-level CSS modules win on equal specificity.
import './styles/global.css'
import App from './App'

// BASE_URL is "/site-v2/" on the GitHub Pages project URL and "/" on a custom domain.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
