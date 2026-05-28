import type { API } from '@strapi/client'
import type { createStrapiClient } from './strapi'

/**
 * Inline text node within a block (Strapi v5 Blocks content format).
 */
export type BlockTextNode = {
  type: 'text'
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

/**
 * A single block node in Strapi's rich-text Blocks content format.
 * Blocks are a Prosemirror-compatible JSON structure.
 */
export type BlockNode = {
  type: 'paragraph' | 'heading' | 'list' | 'list-item' | 'quote' | 'code' | 'image' | 'link' | string
  level?: 1 | 2 | 3 | 4 | 5 | 6 // heading level
  format?: 'ordered' | 'unordered' // list format
  url?: string // link / image
  alt?: string // image alt text
  language?: string // code block language
  children?: (BlockNode | BlockTextNode)[]
}

export type BlocksContent = BlockNode[]

export type StrapiMediaFormat = {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  url: string
}

export type StrapiMedia = {
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: Record<string, StrapiMediaFormat> | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
}

export type ArticleCategory = 'grapheneos' | 'umbrelos' | 'opnsense'

export type Article = API.Document & {
  title: string
  subtitle: string
  author: string
  content: BlocksContent
  banner: StrapiMedia | null
  category: ArticleCategory
  slug: string
}

export type MenuArticle = {
  documentId: string
  title: string
  slug: string
}

export type MenuCategory = {
  category: ArticleCategory
  articles: MenuArticle[]
}

export type ArticleMenu = MenuCategory[]

export type StrapiConfig = {
  baseURL: string
  apiToken: string
}

export type StrapiCmsClient = ReturnType<typeof createStrapiClient>
