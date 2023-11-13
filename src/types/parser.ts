import { Root } from 'mdast';

export interface MarkdownPlugin {
  instance?: any;
  options?: Record<string, any>;
}

export interface MarkdownParsingOptions {
  remarkPlugins: Record<string, false | MarkdownPlugin>;
}

export interface IMarkdownParsingOutput {
  body: Root;
  data: Record<string, string>;
}
