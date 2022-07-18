export interface MarkdownPlugin extends Record<string, any> {}

export interface MarkdownToHTMLOptions {
    /**
     * Enable/Disable MDC components.
     */
    mdc: boolean;
    remarkPlugins: Record<string, false | (MarkdownPlugin & { instance: any })>;
    rehypePlugins: Record<string, false | (MarkdownPlugin & { instance: any })>;
}

export interface MarkdownOptions extends MarkdownToHTMLOptions {
    toc: {
        /**
         * Maximum heading depth to include in the table of contents.
         */
        active: boolean;
        depth: number;
        searchDepth: number;
    };
}

export interface MarkdownNode {
    type: string;
    tag?: string;
    value?: string;
    props?: Record<string, any>;
    content?: any;
    children?: MarkdownNode[];

    attributes?: Record<string, any>;
    fmAttributes?: Record<string, any>;
}

export interface MarkdownRoot {
    type: 'root';
    children: MarkdownNode[];
    props?: Record<string, any>;
}

export interface Data {
    [key: string]: unknown;
}

/**
 * One place in a source file.
 */
export interface Point {
    /**
     * Line in a source file (1-indexed integer).
     */
    line: number;

    /**
     * Column in a source file (1-indexed integer).
     */
    column: number;
    /**
     * Character in a source file (0-indexed integer).
     */
    offset?: number | undefined;
}

/**
 * Location of a node in a source file.
 */
export interface Position {
    /**
     * Place of the first character of the parsed source region.
     */
    start: Point;

    /**
     * Place of the first character after the parsed source region.
     */
    end: Point;

    /**
     * Start column at each index (plus start line) in the source region,
     * for elements that span multiple lines.
     */
    indent?: number[] | undefined;
}

export interface Node<TData extends object = Data> {
    /**
     * The variant of a node.
     */
    type: string;

    /**
     * Information from the ecosystem.
     */
    data?: TData | undefined;

    /**
     * Location of a node in a source document.
     * Must not be present if a node is generated.
     */
    position?: Position | undefined;
}

export interface TocLink {
    id: string;
    text: string;
    depth: number;
    children?: TocLink[];
}

export interface Toc {
    depth: number;
    searchDepth: number;
    links: TocLink[];
}
