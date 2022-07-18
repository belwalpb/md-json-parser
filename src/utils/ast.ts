import { MarkdownNode } from '../types'

export function flattenNode (node: MarkdownNode, maxDepth = 2, _depth = 0): Array<MarkdownNode> {
  if (!Array.isArray(node.children) || _depth === maxDepth) {
    return [node]
  }
  return [
    node,
    ...node.children.reduce(
      (acc, child) => acc.concat(flattenNode(child, maxDepth, _depth + 1)),
            [] as Array<MarkdownNode>
    )
  ]
}

export function flattenNodeText (node: MarkdownNode): string {
  if (node.type === 'text') {
    return node.value || ''
  } else {
    return (node.children || []).reduce((text: string, child: MarkdownNode) => {
      return text.concat(flattenNodeText(child))
    }, '')
  }
}
