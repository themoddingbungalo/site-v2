import GithubSlugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import remarkKramdown from './remarkKramdown'

export interface Heading {
  level: number
  text: string
  id: string
}

const parser = unified().use(remarkParse).use(remarkGfm).use(remarkKramdown)

/**
 * Extract ## and ### headings (with the same ids rehype-slug will generate) from
 * preprocessed markdown, for building an "on this page" nav.
 */
export function extractHeadings(markdown: string): Heading[] {
  const tree = parser.parse(markdown)
  parser.runSync(tree)
  const slugger = new GithubSlugger()
  const out: Heading[] = []
  visit(tree, 'heading', (node) => {
    const text = toString(node).trim()
    // rehype-slug slugs every heading, so consume ids for all levels to stay in sync.
    const id = slugger.slug(text)
    if (node.depth === 2 || node.depth === 3) out.push({ level: node.depth, text, id })
  })
  return out
}
