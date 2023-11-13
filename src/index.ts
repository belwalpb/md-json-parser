import { prepareMarkdownOptions } from './parser/options.js';
import { IMarkdownParsingOutput, MarkdownParsingOptions, MarkdownPlugin } from './types/parser.js';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import type { Processor } from 'unified';
import { compileHast } from './parser/compiler.js';
import { parseFrontMatter } from 'remark-mdc';
import { Root } from 'mdast';

/**
 * Markdown to JSON parsing utility class.
 */
export class MdJsonParserService {
  private stream: Processor;

  constructor(options: Partial<MarkdownParsingOptions> = {}) {
    this.stream = this.getParserInstance(options);
  }

  /**
   * Create a parser instance with default options and returns the same.
   * @returns Parser instance with default options.
   */
  private getParserInstance(options: Partial<MarkdownParsingOptions>): Processor {
    const markdownOptions = prepareMarkdownOptions(options);
    // Create unified pipeline and use `remark-parse` plugin to parse markdown input
    const stream = unified().use(remarkParse as any);
    // Apply custom plugins to extend remark capabilities
    this.usePlugins(stream as any, markdownOptions.remarkPlugins);
    // Apply compiler
    stream.use(compileHast);

    return stream;
  }

  private usePlugins(stream: Processor, plugins: Record<string, false | MarkdownPlugin>): void {
    for (const plugin of Object.values(plugins)) {
      if (plugin) {
        const { instance, options } = plugin;
        stream.use(instance, options);
      }
    }
  }

  /**
   * Parses markdown to AST tree
   * @param markdown Input markdown string, which needs to be parsed.
   * @returns Parsed markdown AST tree along with frontmatter
   */
  public parseMarkdown(markdown: string): IMarkdownParsingOutput {
    // Parse markdown frontmatter.
    const { content: markdownWithoutFrontmatter, data: frontmatter } = parseFrontMatter(markdown);

    const body = this.stream.processSync(markdownWithoutFrontmatter)?.result as Root;

    return { data: frontmatter, body };
  }
}
