import { Route, Routes } from 'react-router'
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

/** Pages that bring their own footer render without the standard one. */
function WithFooter({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modlists/lorerim" element={<WithFooter><LoreRim /></WithFooter>} />
        <Route path="/modlists/ngvo" element={<WithFooter><Ngvo /></WithFooter>} />
        <Route path="/modlists/ghoulified" element={<WithFooter><Ghoulified /></WithFooter>} />
        <Route path="/modlists/loreout" element={<WithFooter><LoreOut /></WithFooter>} />
        <Route path="/modlists/csvp" element={<WithFooter><Csvp /></WithFooter>} />
        <Route path="/modlists/dngg" element={<WithFooter><Dngg /></WithFooter>} />
        <Route path="/modlists/:slug/readme" element={<WithFooter><ReadMePage /></WithFooter>} />
        <Route path="/guides" element={<WithFooter><Guides /></WithFooter>} />
        <Route path="/community" element={<WithFooter><Community /></WithFooter>} />
        <Route path="/guides/:slug" element={<WithFooter><GuidePage /></WithFooter>} />
        <Route path="*" element={<WithFooter><NotFound /></WithFooter>} />
      </Routes>
    </>
  )
}
