import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useTitle } from '../components/layout/ScrollManager'
import { DiscordIcon, PlayIcon } from '../components/ui/Icons'
import { PageHero } from '../components/ui/PageHero'
import { SectionNav } from '../components/ui/SectionNav'
import { useScrollLock } from '../components/ui/useScrollLock'
import { guideSections, guideVideos, type GuideSectionId, type GuideVideo } from '../data/guides'
import { modlistPath, readmePath } from '../data/modlists'
import { ext, pageTitle, site } from '../data/site'
import styles from './Guides.module.css'

/** Which video is open in the modal player, or null when closed. */
type Playing = { id: string; title: string } | null

const navItems = guideSections.map((s) => ({ id: s.id, label: s.label }))

/** Card for one walkthrough. `size` picks the 58px (feature) or 50px (grid) play button. */
function VideoCard({ video, size, onPlay, className }: { video: GuideVideo; size: 'lg' | 'sm'; onPlay: (v: GuideVideo) => void; className?: string }) {
  if (!video.id) {
    return (
      <div className={`${styles.unavailable} ${className ?? ''}`}>
        <span className={styles.unavailableTag}>Video unavailable</span>
        <h3 className={`h3 ${styles.unavailableTitle}`}>{video.title}</h3>
        <p className={styles.videoBlurb}>{video.blurb}</p>
        <p className={styles.unavailableNote}>The original recording is no longer on YouTube. Send us a replacement link and it goes straight back up.</p>
        <a href={site.discord} {...ext} className={styles.askLink}>
          <DiscordIcon size={15} /> Ask in Discord
        </a>
      </div>
    )
  }
  const small = size === 'sm'
  return (
    <button type="button" className={`${styles.video} ${className ?? ''}`} onClick={() => onPlay(video)} aria-label={`Play: ${video.title}`}>
      <div className={styles.thumb}>
        <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" />
        <div className={styles.playWrap}>
          <span className={`${styles.play} ${small ? styles.playSm : ''}`}>
            <PlayIcon size={small ? 19 : 22} />
          </span>
        </div>
        {video.step && <span className={styles.step}>{video.step}</span>}
      </div>
      <div className={styles.videoBody}>
        <h3 className={`h3 ${styles.videoTitle}`}>{video.title}</h3>
        <p className={styles.videoBlurb}>{video.blurb}</p>
      </div>
    </button>
  )
}

/** Full-screen YouTube player. Escape, the × button and the backdrop all close it. */
function Player({ playing, onClose }: { playing: NonNullable<Playing>; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  useScrollLock(true)

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={playing.title}>
      <div className={styles.player} onClick={(e) => e.stopPropagation()}>
        <div className={styles.playerHead}>
          <p className={styles.playerTitle}>{playing.title}</p>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className={`video-frame ${styles.playerFrame}`}>
          <iframe
            src={`https://www.youtube.com/embed/${playing.id}?autoplay=1&rel=0`}
            title="Guide video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export function Guides() {
  useTitle(pageTitle('Modding Guides'))
  const [playing, setPlaying] = useState<Playing>(null)
  const play = (v: GuideVideo) => setPlaying({ id: v.id, title: v.title })
  const close = () => setPlaying(null)
  const videos = (id: GuideSectionId) => guideVideos[id]
  const totalVideos = Object.values(guideVideos).flat().filter((v) => v.id).length

  return (
    <>
      <PageHero
        image="assets/heroes/partysnax.webp"
        position="center 55%"
        eyebrow="Documentation"
        title="Modding Guides"
        lead="Everything you need to install a list, or build one of your own. Walkthroughs recorded by the Bungalo — pick a tool and follow along."
        stats={[
          { value: totalVideos, label: 'Video walkthroughs' },
          { value: guideSections.length, label: 'Tools covered' },
        ]}
      />

      <SectionNav items={navItems} />

      <div className="container">
        <section id="wabbajack" className={styles.sectionFirst}>
          <div className={styles.split}>
            <div>
              <p className="eyebrow">Start here</p>
              <h2 className={`h2 ${styles.title}`}>Wabbajack</h2>
              <p className={`lead ${styles.intro}`}>Wabbajack automates the installation of large modlists. Set it up correctly once and every list on this site installs in a few clicks.</p>
              <p className={styles.note}>Install it to a root-level folder like <span className="mono">C:\Games\Wabbajack</span> — never Program Files, your desktop or Downloads.</p>
            </div>
            {videos('wabbajack').map((v) => <VideoCard key={v.title} video={v} size="lg" onPlay={play} />)}
          </div>
        </section>

        <section id="create-modlist" className={styles.section}>
          <div className={styles.split}>
            {videos('create-modlist').map((v) => <VideoCard key={v.title} video={v} size="lg" onPlay={play} className={styles.orderSecond} />)}
            <div className={styles.orderFirst}>
              <p className="eyebrow">Go your own way</p>
              <h2 className={`h2 ${styles.title}`}>Create a Modlist</h2>
              <p className={`lead ${styles.intro}`}>The perfect list that has exactly what you want is the one you build yourself. Watch a list get made from an empty Mod Organizer profile.</p>
              <Link to={modlistPath('ngvo')} className="btn btn--gold-line">Or start from NGVO →</Link>
            </div>
          </div>
        </section>

        <section id="lodgen" className={styles.section}>
          <p className="eyebrow">Three tools, one order</p>
          <h2 className={`h2 ${styles.title}`}>LOD Generation</h2>
          <p className="lead section-lead">Distant terrain, trees and objects. Run them in this order — xLODGen, then grass cache, then TexGen and DynDOLOD last. Getting the order wrong is the most common cause of broken LODs.</p>
          <div className={styles.cardGrid}>
            {videos('lodgen').map((v) => <VideoCard key={v.title} video={v} size="sm" onPlay={play} />)}
          </div>
        </section>

        <section id="xedit" className={styles.section}>
          <p className="eyebrow">Plugins and patching</p>
          <h2 className={`h2 ${styles.title}`}>xEdit</h2>
          <p className="lead section-lead">The tool you will spend the most time in once you start changing a list. Resolve conflicts, write your own patches, and clean up after removed mods.</p>
          <div className={styles.cardGrid}>
            {videos('xedit').map((v) => <VideoCard key={v.title} video={v} size="sm" onPlay={play} />)}
          </div>
        </section>

        <section id="creation-kit" className={styles.sectionLast}>
          <div className={styles.split}>
            <div>
              <p className="eyebrow">Landscape work</p>
              <h2 className={`h2 ${styles.title}`}>Creation Kit</h2>
              <p className={`lead ${styles.intro}`}>Seams are the visible tear where two mods edit the same landscape. This is the fix that works on any of them — including the Northern Roads seams NGVO users run into.</p>
              <Link to={readmePath('ngvo')} className="btn btn--gold-line">NGVO Read Me →</Link>
            </div>
            {videos('creation-kit').map((v) => <VideoCard key={v.title} video={v} size="lg" onPlay={play} />)}
          </div>
        </section>
      </div>

      {playing && <Player playing={playing} onClose={close} />}
    </>
  )
}
