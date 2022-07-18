import { MarkdownOptions, MarkdownToHTMLOptions, Toc } from '../types'
import { getMarkdownToJsonDefaultOptions, getMarkdownToHtmlDefaultOptions } from '../utils'
import defu from 'defu'
import { parseFrontMatter } from 'remark-mdc'
import { generateJsonBody, generateHtmlBody } from './generateMarkdownBody'
import { generateToc } from './toc'

export const parseMarkdownAsJson = async (
  markdown: string,
  userOptions: Partial<MarkdownOptions> = {}
) => {
  const options = defu(userOptions, getMarkdownToJsonDefaultOptions()) as MarkdownOptions

  /**
     * content: string will have the markdown content without frontmatter
     * data: object will have the frontmatter data
     */
  const { content, data } = parseFrontMatter(markdown)

  // Compile markdown from file content to JSON
  const body = generateJsonBody(content, { ...options, data })

  let toc: Toc | undefined
  if (data.toc && data.toc.active !== false) {
    const tocOption = defu(data.toc || {}, options.toc)
    toc = generateToc(body, tocOption)
  }

  return { data, body, toc }
}

export const parseMarkdownAsHtml = async (
  markdown: string,
  userOptions: Partial<MarkdownOptions> = {}
) => {
  const options = defu(userOptions, getMarkdownToHtmlDefaultOptions()) as MarkdownToHTMLOptions

  /**
     * content: string will have the markdown content without frontmatter
     * data: object will have the frontmatter data
     */
  const { content, data } = parseFrontMatter(markdown)

  // Compile markdown from file content to JSON
  const htmlBody = generateHtmlBody(content, { ...options })

  return { data, htmlBody }
}
