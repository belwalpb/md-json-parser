# md-json-parser

A markdown parsing library build on the top of [unified](https://www.npmjs.com/package/unified).

## Feature Highlights

*   [x] **Markdown to JSON Tree Conversion**
*   [x] **Fully Extentible (Using Remark Plugins)**
*   [x] **Frontmatter Support**
*   [x] **TODO: Table of Content (TOC) Support With Options**

## What is Markdown Parser?

The package is a Fully featured, extentible markdown to JSON Parser, using Syntax Trees. In the input, a markdown string can be given to it with optional plugins and extentions.

## Installation

This package is [ESM Only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c). It can be installed via NPM:
```sh
npm install md-json-parser
```

## Usage
The Package can be imported like:

### Markdown to JSON Parser:
```js
import { MdJsonParserService } from 'md-json-parser'

let markdown = `---
file: abc.txt
creationDate: 2022-02-12
---
  
# Heading-1
## Heading-2`

// Optionally you can pass the changed configuration via the constructor parameters.
const mdJsonParserService= new MdJsonParserService()

const {data, body} = mdJsonParserService.parseMarkdown(markdown)
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
                "type": "heading",
                "depth": 1,
                "children": [
                    {
                        "type": "text",
                        "value": "Heading-1",
                        "position": {
                            "start": {
                                "line": 3,
                                "column": 3,
                                "offset": 8
                            },
                            "end": {
                                "line": 3,
                                "column": 12,
                                "offset": 17
                            }
                        }
                    }
                ],
                "position": {
                    "start": {
                        "line": 3,
                        "column": 1,
                        "offset": 6
                    },
                    "end": {
                        "line": 3,
                        "column": 12,
                        "offset": 17
                    }
                }
            },
            {
                "type": "heading",
                "depth": 2,
                "children": [
                    {
                        "type": "text",
                        "value": "Heading-2",
                        "position": {
                            "start": {
                                "line": 4,
                                "column": 4,
                                "offset": 22
                            },
                            "end": {
                                "line": 4,
                                "column": 13,
                                "offset": 31
                            }
                        }
                    }
                ],
                "position": {
                    "start": {
                        "line": 4,
                        "column": 1,
                        "offset": 19
                    },
                    "end": {
                        "line": 4,
                        "column": 13,
                        "offset": 31
                    }
                }
            }
        ],
        "position": {
            "start": {
                "line": 1,
                "column": 1,
                "offset": 0
            },
            "end": {
                "line": 4,
                "column": 13,
                "offset": 31
            }
        }
    }
}
```

</details>

### Markdown Options:
```js
{
    toc : {
        active: true // To Generate TOC or not for the provided markdown.
        depth: 2 // From h2 onwards, max tags which are supported.
        searchDepth: 3 // Max Depth In which It should search for TOC Items in JSON Tree.
    },
    remarkPlugins : [
        // Array of Remark Plugins For Customization. For More Info Refer: https://github.com/remarkjs/remark/blob/main/doc/plugins.md#create-plugins
    ]
}
```