import { Fragment, useRef } from 'react'
import { Link } from 'react-router'
import { useTitle } from '../components/layout/ScrollManager'
import { ContributeButton } from '../components/layout/SiteFooter'
import { BordelloPanel } from '../components/ui/BordelloPanel'
import { DiscordBand } from '../components/ui/DiscordBand'
import { DiscordIcon, GitHubIcon, KofiIcon, NexusIcon, PatreonIcon, YouTubeIcon } from '../components/ui/Icons'
import { PageHero } from '../components/ui/PageHero'
import { SectionNav } from '../components/ui/SectionNav'
import { useReveal } from '../components/ui/useReveal'
import { modlistBySlug, modlistPath } from '../data/modlists'
import { asset, ext, pageTitle, site } from '../data/site'
import { initials, team, teamLinkLabels, teamLinkOrder, type TeamLinkKind, type TeamMember } from '../data/team'
import styles from './Community.module.css'

const navItems = [
  { id: 'biggie', label: 'Biggie Boss' },
  { id: 'team', label: 'The team' },
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

/** Handles like Abandoned_By_Arkay carry no natural break point, so the name offers
 *  one after each underscore. Without it the browser splits mid-syllable to make the
 *  handle fit the card — "Abandoned_By_Ark" over "ay". */
function MemberName({ name }: { name: string }) {
  return (
    <>
      {name.split('_').map((part, i) => (
        <Fragment key={i}>{i > 0 && <>_<wbr /></>}{part}</Fragment>
      ))}
    </>
  )
}

/** One roster card. Only the profiles a member actually has get a button. */
function MemberCard({ member }: { member: TeamMember }) {
  const links = teamLinkOrder.filter((k) => member.links[k])

  return (
    <article
      data-reveal
      className={`${styles.member} ${member.accent ? styles.accented : ''}`}
      style={member.accent ? ({ '--accent': member.accent } as React.CSSProperties) : undefined}
    >
      <div className={styles.memberHead}>
        {member.avatar ? (
          <img src={asset(member.avatar)} alt="" className={styles.avatar} loading="lazy" />
        ) : (
          <span className={styles.monogram} aria-hidden="true">{initials(member.name)}</span>
        )}
        <div className={styles.memberIdent}>
          <h3 className={styles.memberName}><MemberName name={member.name} /></h3>
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
              href={member.links[kind]} {...ext}
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
      <PageHero
        image="assets/heroes/whiterun-guards.webp"
        position="center 38%"
        scrimClassName={styles.heroScrim}
        eyebrow="Who we are"
        title="The Community"
        lead="The Bungalo is a Discord server full of modders who give their lists away for free. These are the people behind them, the server they came from, and the neighbours next door."
        stats={[
          { value: team.length + 1, label: 'People listed' },
          { value: 2024, label: 'Running since' },
        ]}
      />

      <SectionNav items={navItems} />

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
              <a href={site.biggie.youtube} {...ext} className={`${styles.brandBtn} ${styles.ytBtn}`}>
                <YouTubeIcon size={17} />YouTube
              </a>
              <a href={site.biggie.kofi} {...ext} className={`${styles.brandBtn} ${styles.kofiBtn}`}>
                <KofiIcon size={17} />Ko-fi
              </a>
              <Link to={modlistPath('lorerim')} className={`${styles.brandBtn} ${styles.biggieOutline}`}>LoreRim</Link>
            </div>
          </div>
        </div>
      </section>

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

      {/* ---- The Modding Bordello ---------------------------------------- */}
      <section id="bordello" className={`container ${styles.bordelloSection}`}>
        <BordelloPanel />
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
            <a href={site.discord} {...ext} className="btn btn--outline btn--xs">
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
