import { useEffect, useRef, useState, type ReactNode } from 'react'
import { contributeUrl, ext, issueUrl, type IssueForm } from '../../data/site'
import { BookIcon, ChevronDownIcon, InfoIcon, PencilIcon } from './Icons'
import styles from './ContributeButton.module.css'

/** The plain link to GitHub's issue chooser, for a row that cannot open a panel. */
export function ContributeButton({ className = '' }: { className?: string }) {
  return (
    <a href={contributeUrl} {...ext} className={`btn btn--gold-tint ${className}`}>
      <PencilIcon size={16} />
      Contribute to the Wiki
    </a>
  )
}

/** The three forms in `.github/ISSUE_TEMPLATE/`. The hints are the whole point: they
 *  are what tells someone that their typo is a thing worth filing. */
const FORMS: { form: IssueForm; label: string; hint: string; icon: ReactNode }[] = [
  {
    form: 'bug-report',
    label: 'Report a bug',
    hint: 'A page, link or image on this site is broken',
    icon: <InfoIcon size={16} stroke="currentColor" />,
  },
  {
    form: 'documentation-change',
    label: 'Wrong info or a typo',
    hint: 'A step, version or name that is no longer right',
    icon: <PencilIcon size={16} />,
  },
  {
    form: 'documentation-addition',
    label: 'Add a guide',
    hint: 'You have written one, or want one that is missing',
    icon: <BookIcon size={16} />,
  },
]

/**
 * "Contribute to the Wiki" as a menu rather than a link: three forms behind one button,
 * so the closing band stays at two buttons and nobody has to guess which kind of issue
 * theirs is. Opens upward — the band is the last thing on the page.
 */
export function ContributeMenu({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      button.current?.focus()
    }
    document.addEventListener('click', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={wrap} className={`${styles.wrap} ${className}`}>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`btn btn--gold-tint btn--flush ${styles.trigger}`}
      >
        <PencilIcon size={16} />
        Contribute to the Wiki
        <ChevronDownIcon size={13} className={`${styles.chevron} ${open ? styles.chevronUp : ''}`} />
      </button>

      {open && (
        <div className={styles.menu}>
          {FORMS.map((f) => (
            <a key={f.form} href={issueUrl(f.form)} {...ext} className={styles.item}>
              <span className={styles.itemIcon}>{f.icon}</span>
              <span className={styles.itemCopy}>
                <span className={styles.itemLabel}>{f.label}</span>
                <span className={styles.itemHint}>{f.hint}</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
