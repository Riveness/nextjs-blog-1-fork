import path from 'node:path'

import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype'
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import { transformerTwoslash } from '@shikijs/twoslash'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { rehypeDefaultCodeLang } from 'rehype-default-code-lang'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { MDX, type MDXProps } from 'rsc-mdx'

import { findCodeText, rehypeGithubAlert } from './plugins'
import { rendererMdx } from './twoslash/renderMdx'

interface MarkdownProps {
  source: string
  useMDXComponents?: MDXProps['useMDXComponents']
}

export async function Markdown(props: MarkdownProps) {
  const { source, useMDXComponents } = props
  return (
    <MDX
      source={source}
      useMDXComponents={useMDXComponents}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeGithubAlert,
        rehypeSlug,
        rehypeAutolinkHeadings,
        [
          rehypeDefaultCodeLang,
          {
            defaultLang: 'text',
          },
        ],
        [
          rehypeShiki,
          {
            parseMetaString(meta, node) {
              const metaData = meta.split(' ')
              const fileName = metaData.find(item => path.extname(item) !== '')
              const codeText = findCodeText(node)

              return {
                content: codeText?.value,
                'data-file': fileName,
              }
            },
            themes: {
              dark: 'dracula-soft',
              light: 'github-light',
            },
            transformers: [
              transformerNotationDiff(),
              transformerNotationHighlight(),
              transformerNotationWordHighlight(),
              transformerNotationFocus(),
              transformerNotationErrorLevel(),
              transformerMetaHighlight(),
              transformerMetaWordHighlight(),
              transformerTwoslash({
                explicitTrigger: true,
                renderer: rendererMdx(),
              }),
            ],
          } as RehypeShikiOptions,
        ],
      ]}
    />
  )
}
