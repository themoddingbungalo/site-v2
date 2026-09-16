import type { Root, RootContent, Paragraph, Parent, Text, PhrasingContent } from 'mdast'
import { visit } from 'unist-util-visit'

// Support for the kramdown attribute syntax the modlist authors already use:
//
//   {: .important}          block callout applied to the following block
//   NGVO requires ...       (works with or without a blank line in between,
//                            and above a blockquote or list)
//
//   [Download](url){: .btn} link rendered as a gold button
//
// Callouts become <div class="callout callout--<kind>"><div class="callout-body">
// <p class="callout-label">Kind</p> ...block... </div></div>.

const CALLOUT_KINDS: Record<string, string> = {
  important: 'Important',
  warning: 'Warning',
  note: 'Note',
  new: 'New',
}

const BLOCK_ATTR = /^\{:\s*\.([a-z][\w-]*)\s*\}\s*$/i
const LEADING_ATTR = /^\{:\s*\.([a-z][\w-]*)\s*\}[ \t]*\n/i
const BTN_ATTR = /^\{:\s*\.btn\s*\}/i

type MdNode = RootContent

function firstText(p: Paragraph): Text | null {
  const c = p.children[0]
  return c && c.type === 'text' ? c : null
}

function calloutNode(kind: string, body: MdNode[]): MdNode {
  const label: Paragraph = {
    type: 'paragraph',
    data: { hProperties: { className: ['callout-label'] } },
    children: [{ type: 'text', value: CALLOUT_KINDS[kind] ?? kind }],
  }
  // Custom node types render as <div> with the given hName/hProperties.
  const bodyNode = {
    type: 'calloutBody',
    data: { hName: 'div', hProperties: { className: ['callout-body'] } },
    children: [label, ...body],
  } as unknown as MdNode
  return {
    type: 'callout',
    data: { hName: 'div', hProperties: { className: ['callout', `callout--${kind}`] } },
    children: [bodyNode],
  } as unknown as MdNode
}

function unwrap(node: MdNode): MdNode[] {
  return node.type === 'blockquote' ? (node.children as MdNode[]) : [node]
}

export default function remarkKramdown() {
  return (tree: Root) => {
    // 1. Block attributes -> callouts
    visit(tree, (node) => {
      if (!('children' in node)) return
      const parent = node as Parent
      const out: MdNode[] = []
      const kids = parent.children as MdNode[]
      for (let i = 0; i < kids.length; i++) {
        const cur = kids[i]
        if (cur.type !== 'paragraph') { out.push(cur); continue }
        const t = firstText(cur)
        if (!t) { out.push(cur); continue }

        // "{: .kind}" alone in a paragraph: applies to the next sibling block.
        const alone = t.value.match(BLOCK_ATTR)
        if (alone && cur.children.length === 1) {
          const kind = alone[1].toLowerCase()
          const next = kids[i + 1]
          if (next && kind in CALLOUT_KINDS) {
            out.push(calloutNode(kind, unwrap(next)))
            i++
          } else if (next && 'data' in next === false) {
            // Unknown class: attach as a class name and move on.
            ;(next as MdNode & { data?: Record<string, unknown> }).data = { hProperties: { className: [kind] } }
          }
          continue
        }

        // "{: .kind}\ntext..." at the top of a paragraph: applies to that paragraph.
        const leading = t.value.match(LEADING_ATTR)
        if (leading) {
          const kind = leading[1].toLowerCase()
          t.value = t.value.slice(leading[0].length)
          if (kind in CALLOUT_KINDS) {
            out.push(calloutNode(kind, [cur]))
          } else {
            cur.data = { ...(cur.data ?? {}), hProperties: { className: [kind] } }
            out.push(cur)
          }
          continue
        }
        out.push(cur)
      }
      parent.children = out as Parent['children']
    })

    // 2. [text](url){: .btn} -> button link
    visit(tree, 'link', (link, index, parent) => {
      if (!parent || index === undefined) return
      const next = (parent.children as PhrasingContent[])[index + 1]
      if (!next || next.type !== 'text') return
      const m = next.value.match(BTN_ATTR)
      if (!m) return
      next.value = next.value.slice(m[0].length)
      link.data = { ...(link.data ?? {}), hProperties: { className: ['btn', 'btn--gold'] } }
    })
  }
}
