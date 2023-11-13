import { MarkdownParsingOptions, MarkdownPlugin } from '../types/index.js';
import remarkEmoji from 'remark-emoji';
import remarkGFM from 'remark-gfm';
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs';
import remarkMDC from 'remark-mdc';

/**
 * Prepares the complete options for Markdown to AST Parsing.
 * @param additionalOptions Additional Markdown options, which user wants to provide or remove
 * @returns A final set of markdown parsing options, which will be used to initialize the markdown parser instance
 */
export function prepareMarkdownOptions(additionalOptions: Partial<MarkdownParsingOptions>): MarkdownParsingOptions {
  // If no additional properties are provided, then return the default one
  if (additionalOptions === null || additionalOptions === undefined || Object.keys(additionalOptions).length === 0) {
    return defaultMarkdownOptions;
  }

  // merge the default configuration with the provided one
  const remarkPlugins = mergeOptions(
    defaultMarkdownOptions.remarkPlugins as Record<string, MarkdownPlugin>,
    additionalOptions.remarkPlugins || {},
  );

  return { remarkPlugins };
}

/**
 * Merges the default markdown parsing plugins configuration with the user provided one
 * @param defaultOptions Default markdown plugins configuration
 * @param userProvidedOptions User provided markdown plugins configuration
 * @returns merged markdown parsing plugins configuration
 */
function mergeOptions(
  defaultOptions: Record<string, MarkdownPlugin>,
  userProvidedOptions: Record<string, false | MarkdownPlugin>,
): Record<string, false | MarkdownPlugin> {
  if (userProvidedOptions) {
    const mergedPlugins = { ...defaultOptions, ...userProvidedOptions };
    return mergedPlugins;
  }
  return defaultOptions;
}

/**
 * Default markdown parsing options
 */
const defaultMarkdownOptions: MarkdownParsingOptions = {
  remarkPlugins: {
    'remark-mdc': {
      instance: remarkMDC,
    },
    'remark-emoji': {
      instance: remarkEmoji,
    },
    'remark-squeeze-paragraphs': {
      instance: remarkSqueezeParagraphs,
    },
    'remark-gfm': {
      instance: remarkGFM,
    },
  },
};
