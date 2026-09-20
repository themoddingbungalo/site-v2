import type { Element, ElementContent, Root as HastRoot } from 'hast'
import { useMemo } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import { Link } from 'react-router'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { preprocess } from './preprocess'
import remarkKramdown from './remarkKramdown'
import { isExternalHref, resolveAsset } from './resolveAsset'
import '../styles/prose.css'

export interface MarkdownProps {
  /** Raw markdown text. */
  source: string
  /** Old-wiki image path -> shipped asset path. */
  assets?: Record<string, string>
  /** Frame images and open them full size in a new tab on click (guide screenshots). */
  enlargeImages?: boolean
}

// ---- hast helpers -----------------------------------------------------------

function elements(node: Element | HastRoot, tag: string, out: Element[] = []): Element[] {
  for (const child of node.children as ElementContent[]) {
    if (child.type === 'element') {
      if (child.tagName === tag) out.push(child)
      elements(child, tag, out)
    }
  }
  return out
}

function text(node: ElementContent | Element): string {
  if (node.type === 'text') return node.value
  if (node.type === 'element') return node.children.map(text).join('')
  return ''
}

function meaningful(children: ElementContent[]): ElementContent[] {
  return children.filter((c) => !(c.type === 'text' && c.value.trim() === ''))
}

/** Hand-written <table> whose every cell is just a link: render as a pill row. */
function badgeLinks(table: Element): { href: string; label: string }[] | null {
  if (elements(table, 'thead').length) return null
  const cells = [...elements(table, 'td'), ...elements(table, 'th')]
  if (!cells.length) return null
  const links: { href: string; label: string }[] = []
  for (const cell of cells) {
    const kids = meaningful(cell.children)
    if (kids.length === 0) continue
    if (kids.length !== 1 || kids[0].type !== 'element' || kids[0].tagName !== 'a') return null
    const a = kids[0]
    const href = String(a.properties?.href ?? '')
    let label = text(a).replace(/\s+/g, ' ').trim()
    if (!label) {
      const img = elements(a, 'img')[0]
      label = img ? String(img.properties?.alt ?? '') : ''
    }
    links.push({ href, label: label || 'Link' })
  }
  return links.length ? links : null
}

// ---- component ----------------------------------------------------------------

export function Markdown({ source, assets = {}, enlargeImages = false }: MarkdownProps) {
  const md = useMemo(() => preprocess(source), [source])

  const components = useMemo<Components>(() => ({
    img({ node: _node, src, alt, ...rest }) {
      const url = resolveAsset(typeof src === 'string' ? src : undefined, assets)
      if (!url) return null
      if (enlargeImages) {
        return (
          <img
            {...rest}
            src={url}
            alt={alt ?? ''}
            loading="lazy"
            className="shot"
            title="Open full size"
            onClick={() => window.open(url, '_blank', 'noopener')}
          />
        )
      }
      return <img {...rest} src={url} alt={alt ?? ''} loading="lazy" />
    },
    a({ node: _node, href, children, ...rest }) {
      // A root-relative href is a link to another page on this site. It has to go
      // through <Link>, which applies the router basename — a bare <a href="/guides/x">
      // loses the deploy base and 404s on themoddingbungalo.github.io/site-v2.
      if (href?.startsWith('/')) {
        return <Link {...rest} to={href}>{children}</Link>
      }
      const external = isExternalHref(href)
      return (
        <a {...rest} href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
          {children}
        </a>
      )
    },
    table({ node, children, ...rest }) {
      if (node) {
        const links = badgeLinks(node)
        if (links) {
          return (
            <div className="link-row">
              {links.map((l, i) => (
                <a key={i} href={l.href} target="_blank" rel="noopener">{l.label}</a>
              ))}
            </div>
          )
        }
        if (!elements(node, 'thead').length) {
          return <table {...rest} className="raw">{children}</table>
        }
      }
      return (
        <div className="table-wrap">
          <table {...rest}>{children}</table>
        </div>
      )
    },
  }), [assets, enlargeImages])

  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkKramdown]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={components}
      >
        {md}
      </ReactMarkdown>
    </div>
  )
}
