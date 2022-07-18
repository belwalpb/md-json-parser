# md-json-parser

A markdown parsing library build on the top of [unified](https://www.npmjs.com/package/unified).

## Feature Highlights

*   [x] **Markdown to JSON Tree Conversion**
*   [x] **Markdown to HTML Conversion**
*   [x] **Security by default (no `dangerouslySetInnerHTML` or XSS attacks)**   
*   [x] **Fully Extentible (Using Remark and Rehype Plugins)**
*   [x] **Frontmatter Support**
*   [x] **Table of Content (TOC) Support With Options**

## What is Markdown Parser?

The package is a Fully featured, extentible markdown to JSON and HTML Parser, using Syntax Trees. In the input, a markdown string can be given to it with optional plugins and extentions.

## Installation

This package is [ESM Only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c). It can be installed via NPM:
```sh
npm install md-json-parser
```

## Usage
The Package can be imported like:

### Markdown to HTML Parser:
```js
import { parseMarkdownAsHtml } from 'md-json-parser'

let markdown = `---
file: abc.txt
creationDate: 2022-02-12
---
  
# Heading-1
## Heading-2`

const {data, htmlBody} = await parseMarkdownAsHtml(markdown, {});
```

<details>
<summary>Show Output:</summary>

```json
{
    "data": {
        "file": "abc.txt",
        "creationDate": "2022-02-12T00:00:00.000Z"
    },
    "htmlBody": "<h1 id=\"user-content-heading-1\">Heading-1</h1>\n<h2 id=\"user-content-heading-2\">Heading-2</h2>"
}
```

</details>

### Markdown to JSON Parser:
```js
import { parseMarkdownAsJson } from 'md-json-parser'

let markdown = `---
file: abc.txt
creationDate: 2022-02-12
---
  
# Heading-1
## Heading-2`

const {data, htmlBody} = await parseMarkdownAsJson(markdown, {});
```

<details>
<summary>Show Output:</summary>

```json
{
    "data": {
        "file": "abc.txt",
        "creationDate": "2022-02-12T00:00:00.000Z"
    },
    "body": {
        "type": "root",
        "children": [
            {
                "type": "element",
                "tag": "h1",
                "props": {
                    "id": "user-content-heading-1"
                },
                "children": [
                    {
                        "type": "text",
                        "value": "Heading-1"
                    }
                ]
            },
            {
                "type": "text",
                "value": "\n\n"
            },
            {
                "type": "element",
                "tag": "h2",
                "props": {
                    "id": "user-content-heading-2"
                },
                "children": [
                    {
                        "type": "text",
                        "value": "Heading-2"
                    }
                ]
            },
            {
                "type": "element",
                "tag": "h3",
                "props": {
                    "id": "user-content-i-am-heading-3"
                },
                "children": [
                    {
                        "type": "text",
                        "value": "I am heading-3"
                    }
                ]
            }
        ]
    },
    "toc": {
        "searchDepth": 2,
        "depth": 2,
        "links": [
            {
                "id": "user-content-heading-2",
                "depth": 2,
                "text": "Heading-2",
                "children": [
                    {
                        "id": "user-content-i-am-heading-3",
                        "depth": 3,
                        "text": "I am heading-3"
                    }
                ]
            }
        ]
    }
}
```

</details>

### Markdown Options:
```js
{
    mdc : true // True to support Components in Markdown. False to Disable MDC Fature.
    toc : {
        active: true // To Generate TOC or not for the provided markdown.
        depth: 2 // From h2 onwards, max tags which are supported.
        searchDepth: 3 // Max Depth In which It should search for TOC Items in JSON Tree.
    },
    remarkPlugins : [
        // Array of Remark Plugins For Customization. For More Info Refer: https://github.com/remarkjs/remark/blob/main/doc/plugins.md#create-plugins
    ],
    rehypePlugins : [
         // Array of Rehype Plugins For Customization. For More Info Refer: https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#create-plugins
    ]
    
}
```
