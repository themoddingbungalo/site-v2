import { useRef } from 'react'
import { Link } from 'react-router'
import { useTitle } from '../components/layout/ScrollManager'
import { ContributeButton } from '../components/layout/SiteFooter'
import { DiscordBand } from '../components/ui/DiscordBand'
import { DiscordIcon, GitHubIcon, KofiIcon, NexusIcon, PatreonIcon, YouTubeIcon } from '../components/ui/Icons'
import { SectionNav } from '../components/ui/SectionNav'
import { useReveal } from '../components/ui/useReveal'
import { modlistBySlug, modlistPath } from '../data/modlists'
import { asset, pageTitle, site } from '../data/site'
import { initials, team, teamLinkLabels, teamLinkOrder, type TeamLinkKind, type TeamMember } from '../data/team'
import styles from './Community.module.css'

const navItems = [
  { id: 'team', label: 'The team' },
  { id: 'biggie', label: 'Biggie Boss' },
  { id: 'bordello', label: 'The Bordello' },
  { id: 'contribute', label: 'Contribute' },
]

const linkIcons: Record<TeamLinkKind, React.ReactNode> = {
  youtube: <YouTubeIcon size={15} />,
  nexus: <NexusIcon size={15} />,
  patreon: <PatreonIcon size={15} />,
  kofi: <KofiIcon size={15} />,
  github: <GitHubIcon size={15} />,
}

/** One roster card. Only the profiles a member actually has get a button. */
function MemberCard({ member }: { member: TeamMember }) {
  const links = teamLinkOrder.filter((k) => member.links[k])

  return (
    <article data-reveal className={styles.member}>
      <div className={styles.memberHead}>
        {member.avatar ? (
          <img src={asset(member.avatar)} alt="" className={styles.avatar} loading="lazy" />
        ) : (
          <span className={styles.monogram} aria-hidden="true">{initials(member.name)}</span>
        )}
        <div className={styles.memberIdent}>
          <h3 className={styles.memberName}>{member.name}</h3>
          <p className={styles.memberRole}>{member.role}</p>
        </div>
      </div>

      <p className={styles.memberBlurb}>{member.blurb}</p>

      {member.lists && (
        <div className={styles.memberLists}>
          {member.lists.map((slug) => (
            <Link key={slug} to={modlistPath(slug)} className={styles.listChip}>{modlistBySlug[slug].name}</Link>
          ))}
        </div>
      )}

      {links.length ? (
        <div className={styles.memberLinks}>
          {links.map((kind) => (
            <a
              key={kind}
              href={member.links[kind]}
              target="_blank"
              rel="noopener"
              className={`${styles.linkBtn} ${styles[kind]}`}
            >
              {linkIcons[kind]}
              {teamLinkLabels[kind]}
            </a>
          ))}
        </div>
      ) : (
        <p className={styles.noLinks}>Links coming soon.</p>
      )}
    </article>
  )
}

export function Community() {
  useTitle(pageTitle('Community'))
  const rootRef = useRef<HTMLDivElement>(null)
  useReveal(rootRef)

  return (
    <div ref={rootRef}>
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <img src={asset('assets/heroes/whiterun-guards.webp')} alt="" />
        </div>
        <div className={styles.heroScrim} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={`eyebrow ${styles.heroEyebrow}`}>Who we are</p>
            <h1 className={`h1 ${styles.heroTitle}`}>The Community</h1>
            <p className={styles.heroLead}>
              The Bungalo is a Discord server full of modders who give their lists away for free. These are the people
              behind them, the server they came from, and the neighbours next door.
            </p>
            <div className={styles.stats}>
              <div><div className={styles.statValue}>{team.length + 1}</div><div className={styles.statLabel}>People listed</div></div>
              <div><div className={styles.statValue}>2024</div><div className={styles.statLabel}>Running since</div></div>
            </div>
          </div>
        </div>
      </section>

      <SectionNav items={navItems} />

      {/* ---- the team ---------------------------------------------------- */}
      <section id="team" className={`container ${styles.teamSection}`}>
        <div data-reveal className={styles.sectionHead}>
          <p className="eyebrow">The roster</p>
          <h2 className="h2 h2--lg">The Bungalo team</h2>
          <p className={styles.headText}>
            List authors, patchers and the people keeping the wiki upright. Bios and links are filling in as everyone
            sends theirs over &mdash; poke us in Discord if yours is missing or wrong.
          </p>
        </div>
        <div className={styles.teamGrid}>
          {team.map((m) => <MemberCard key={m.name} member={m} />)}
        </div>
      </section>

      {/* ---- Biggie Boss ------------------------------------------------- */}
      <section id="biggie" className={`container ${styles.biggieSection}`}>
        <div data-reveal className={`${styles.split} ${styles.biggie}`}>
          <div className={styles.media}>
            <img src={asset('assets/biggie-boss.png')} alt="Biggie Boss" className={styles.mediaImg} />
            <div className={`${styles.mediaScrim} ${styles.biggieScrim}`} />
          </div>
          <div className={styles.panelBody}>
            <p className={`${styles.panelEyebrow} ${styles.biggieEyebrow}`}>Founder</p>
            <h2 className={styles.panelTitle}>Biggie Boss</h2>
            <p className={`${styles.panelText} ${styles.biggieText}`}>
              Modder, YouTuber and streamer. &ldquo;The #1 Modlist Enthusiast. I hate vanilla.&rdquo; Released LoreRim in early 2024 after building it live on stream.
            </p>
            <div className={styles.panelActions}>
              <a href={site.biggie.youtube} target="_blank" rel="noopener" className={`${styles.brandBtn} ${styles.ytBtn}`}>
                <YouTubeIcon size={17} />YouTube
              </a>
              <a href={site.biggie.kofi} target="_blank" rel="noopener" className={`${styles.brandBtn} ${styles.kofiBtn}`}>
                <KofiIcon size={17} />Ko-fi
              </a>
              <Link to={modlistPath('lorerim')} className={`${styles.brandBtn} ${styles.biggieOutline}`}>LoreRim</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---- The Modding Bordello ---------------------------------------- */}
      <section id="bordello" className={`container ${styles.bordelloSection}`}>
        <div data-reveal className={`${styles.split} ${styles.bordello}`}>
          <div className={`${styles.panelBody} ${styles.bordelloBody}`}>
            <p className={`${styles.panelEyebrow} ${styles.bordelloEyebrow}`}>Sister server</p>
            <h2 className={styles.panelTitle}>The Modding Bordello</h2>
            <p className={`${styles.panelText} ${styles.bordelloText}`}>
              The Bungalo is rated R, not XXX. Schtevie&rsquo;s server hosts the NSFW modlists so this one stays safe for work &mdash; head there for adult content and support.
            </p>
            <div className={styles.panelActions}>
              <a href={site.bordello.discord} target="_blank" rel="noopener" className={`${styles.brandBtn} ${styles.bordelloBtn}`}>Join the Bordello</a>
              <a href={site.bordello.site} target="_blank" rel="noopener" className={`${styles.brandBtn} ${styles.bordelloOutline}`}>Visit their site</a>
            </div>
          </div>
          <div className={`${styles.media} ${styles.bordelloMedia}`}>
            <img src={asset('assets/themoddingbordello.webp')} alt="The Modding Bordello" className={styles.mediaImg} />
            <div className={`${styles.mediaScrim} ${styles.bordelloScrim}`} />
          </div>
        </div>
      </section>

      {/* ---- contribute -------------------------------------------------- */}
      <section id="contribute" className={`container ${styles.contributeSection}`}>
        <div data-reveal className={styles.contribute}>
          <div>
            <p className="eyebrow">Pitch in</p>
            <h2 className={`h2 ${styles.contributeTitle}`}>Anyone can edit the wiki</h2>
            <p className={styles.contributeText}>
              The read mes and guides on this site are markdown files on GitHub. Spot a wrong version number or a step
              that no longer works? Press the pencil, fix it, commit &mdash; the site redeploys itself.
            </p>
          </div>
          <div className={styles.contributeActions}>
            <ContributeButton />
            <a href={site.discord} target="_blank" rel="noopener" className="btn btn--outline btn--xs">
              <DiscordIcon size={16} />Ask first in Discord
            </a>
          </div>
        </div>
      </section>

      <div className="container">
        <DiscordBand
          title="Everything happens in the Discord"
          text="Support channels for every list, modding help from the people who built them, and a community that keeps modding free."
        />
      </div>
    </div>
  )
}
