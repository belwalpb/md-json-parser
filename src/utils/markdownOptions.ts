import { MarkdownOptions, MarkdownToHTMLOptions } from '../types'
import remarkEmoji from 'remark-emoji'
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSanitize from 'rehype-sanitize'
import rehypeSortAttributeValues from 'rehype-sort-attribute-values'
import rehypeSortAttributes from 'rehype-sort-attributes'
import rehypeRaw from 'rehype-raw'

export const getMarkdownToHtmlDefaultOptions = (): MarkdownToHTMLOptions => ({
  mdc: true,
  remarkPlugins: {
    /**
         * To Enable Emoji's In Markdown
         * Eg. :dog: to 🐶 and :+1:' to 👍
         * Refer: https://www.npmjs.com/package/remark-emoji For More Information
         */
    'remark-emoji': {
      instance: remarkEmoji
    },
    /**
         * To remove empty (or white space only) paragraphs.
         * Refer: https://www.npmjs.com/package/remark-squeeze-paragraphs For More Information
         */
    'remark-squeeze-paragraphs': {
      instance: remarkSqueezeParagraphs
    },
    /**
         * To support GFM (autolink literals, footnotes, strikethrough, tables, tasklists).
         * Refer: https://www.npmjs.com/package/remark-gfm For More Information
         */
    'remark-gfm': {
      instance: remarkGfm
    }
  },
  rehypePlugins: {
    /**
         * To generate ids for headings automatically.
         * Refer: https://www.npmjs.com/package/rehype-slug For More Information
         */
    'rehype-slug': {
      instance: rehypeSlug
    },
    /**
         *  To add rel (and target) to external links.
         * Refer: https://www.npmjs.com/package/rehype-external-links For More Information
         */
    'rehype-external-links': {
      instance: rehypeExternalLinks
    },
    /**
         *  To sanitize HTML For XSS Attacks.
         * Refer: https://github.com/rehypejs/rehype-sanitize For More Information
         */
    'rehype-sanitize': {
      instance: rehypeSanitize
    },
    /**
         *  To sort attribute values like classes etc.
         * Refer: https://www.npmjs.com/package/rehype-sort-attribute-values For More Information
         */
    'rehype-sort-attribute-values': {
      instance: rehypeSortAttributeValues
    },
    /**
         *  To sort attribute values like classes etc.
         * Refer: https://www.npmjs.com/package/rehype-sort-attributes For More Information
         */
    'rehype-sort-attributes': {
      instance: rehypeSortAttributes
    },
    /**
         * To parse the tree (and raw nodes) again.
         * Refer: https://www.npmjs.com/package/rehype-raw For More Information
         */
    'rehype-raw': {
      instance: rehypeRaw,
      passThrough: ['element']
    }
  }
})

export const getMarkdownToJsonDefaultOptions = (): MarkdownOptions => ({
  mdc: true,
  toc: {
    active: false,
    depth: 2,
    searchDepth: 2
  },
  remarkPlugins: {
    /**
         * To Enable Emoji's In Markdown
         * Eg. :dog: to 🐶 and :+1:' to 👍
         * Refer: https://www.npmjs.com/package/remark-emoji For More Information
         */
    'remark-emoji': {
      instance: remarkEmoji
    },
    /**
         * To remove empty (or white space only) paragraphs.
         * Refer: https://www.npmjs.com/package/remark-squeeze-paragraphs For More Information
         */
    'remark-squeeze-paragraphs': {
      instance: remarkSqueezeParagraphs
    },
    /**
         * To support GFM (autolink literals, footnotes, strikethrough, tables, tasklists).
         * Refer: https://www.npmjs.com/package/remark-gfm For More Information
         */
    'remark-gfm': {
      instance: remarkGfm
    }
  },
  rehypePlugins: {
    /**
         * To generate ids for headings automatically.
         * Refer: https://www.npmjs.com/package/rehype-slug For More Information
         */
    'rehype-slug': {
      instance: rehypeSlug
    },
    /**
         *  To add rel (and target) to external links.
         * Refer: https://www.npmjs.com/package/rehype-external-links For More Information
         */
    'rehype-external-links': {
      instance: rehypeExternalLinks
    },
    /**
         *  To sanitize HTML For XSS Attacks.
         * Refer: https://github.com/rehypejs/rehype-sanitize For More Information
         */
    'rehype-sanitize': {
      instance: rehypeSanitize
    },
    /**
         *  To sort attribute values like classes etc.
         * Refer: https://www.npmjs.com/package/rehype-sort-attribute-values For More Information
         */
    'rehype-sort-attribute-values': {
      instance: rehypeSortAttributeValues
    },
    /**
         *  To sort attribute values like classes etc.
         * Refer: https://www.npmjs.com/package/rehype-sort-attributes For More Information
         */
    'rehype-sort-attributes': {
      instance: rehypeSortAttributes
    },
    /**
         * To parse the tree (and raw nodes) again.
         * Refer: https://www.npmjs.com/package/rehype-raw For More Information
         */
    'rehype-raw': {
      instance: rehypeRaw,
      passThrough: ['element']
    }
  }
})
