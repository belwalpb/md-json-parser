import { MarkdownOptions, Toc } from '../types';
import { getMarkdownToJsonDefaultOptions } from '../utils';
import defu from 'defu';
import { parseFrontMatter } from 'remark-mdc';
import { generateJsonBody } from './generateMarkdownBody';
import { generateToc } from './toc';

export const parseMarkdownAsJson = async (
    markdown: string,
    userOptions: Partial<MarkdownOptions> = {},
) => {
    const options = defu(userOptions, getMarkdownToJsonDefaultOptions()) as MarkdownOptions;

    /**
     * content: string will have the markdown content without frontmatter
     * data: object will have the frontmatter data
     */
    const { content, data } = parseFrontMatter(markdown);

    // Compile markdown from file content to JSON
    const body = generateJsonBody(content, { ...options, data });

    let toc: Toc | undefined;
    if (data.toc && data.toc.active !== false) {
        const tocOption = defu(data.toc || {}, options.toc);
        toc = generateToc(body, tocOption);
    }

    return { data, body, toc };
};
