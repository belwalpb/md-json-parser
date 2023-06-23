import { MarkdownOptions, MarkdownPlugin, MarkdownRoot } from '../types';
import remarkMDC from 'remark-mdc';
import handlers from './handler';
import { unified } from 'unified';
import type { Processor } from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import { compiler } from './compiler';

const usePlugins = (plugins: Record<string, false | MarkdownPlugin>, stream: Processor) => {
    for (const plugin of Object.values(plugins)) {
        if (plugin) {
            const { instance, ...options } = plugin;
            stream.use(instance, options);
        }
    }
};

const generateJsonBody = (markdown: string, options: MarkdownOptions & { data: any }) => {
    const rehypeOptions: any = {
        handlers,
        allowDangerousHtml: false,
    };

    const stream = unified().use(remarkParse);

    if (options.mdc) {
        stream.use(remarkMDC as any);
    }

    usePlugins(options.remarkPlugins, stream);
    stream.use(remark2rehype, rehypeOptions);
    usePlugins(options.rehypePlugins, stream);
    stream.use(compiler, options as any);

    return stream.processSync(markdown)?.result as MarkdownRoot;
};

export { generateJsonBody };
