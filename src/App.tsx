import { Navigate, Route, Routes, useParams } from 'react-router'
import { ScrollManager } from './components/layout/ScrollManager'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { Community } from './pages/Community'
import { GuidePage } from './pages/GuidePage'
import { Guides } from './pages/Guides'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ReadMePage } from './pages/ReadMePage'
import { Csvp } from './pages/modlists/Csvp'
import { Dngg } from './pages/modlists/Dngg'
import { Ghoulified } from './pages/modlists/Ghoulified'
import { LoreOut } from './pages/modlists/LoreOut'
import { LoreRim } from './pages/modlists/LoreRim'
import { Ngvo } from './pages/modlists/Ngvo'

/** The read mes moved to /lists/<slug>/read-me; keep the interim v2 path working. */
function LegacyReadMeRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/lists/${slug}/read-me`} replace />
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modlists/lorerim" element={<LoreRim />} />
        <Route path="/modlists/ngvo" element={<Ngvo />} />
        <Route path="/modlists/ghoulified" element={<Ghoulified />} />
        <Route path="/modlists/loreout" element={<LoreOut />} />
        <Route path="/modlists/csvp" element={<Csvp />} />
        <Route path="/modlists/dngg" element={<Dngg />} />
        <Route path="/lists/:slug/read-me" element={<ReadMePage />} />
        <Route path="/modlists/:slug/readme" element={<LegacyReadMeRedirect />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/community" element={<Community />} />
        <Route path="/guides/:slug" element={<GuidePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SiteFooter />
    </>
  )
}
