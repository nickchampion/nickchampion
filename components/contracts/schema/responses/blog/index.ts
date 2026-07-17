import { Type, type Static } from '@sinclair/typebox'

export const BlogCategoryEnumSchema = Type.Union([
  Type.Literal('grapheneos'),
  Type.Literal('umbrelos'),
  Type.Literal('opnsense'),
])

export type BlogCategoryEnumSchema = Static<typeof BlogCategoryEnumSchema>

export const BlogArticleSummarySchema = Type.Object({
  documentId: Type.String(),
  title: Type.String(),
  slug: Type.String(),
}, { additionalProperties: false })

export type BlogArticleSummarySchema = Static<typeof BlogArticleSummarySchema>

export const BlogCategorySchema = Type.Object({
  category: BlogCategoryEnumSchema,
  articles: Type.Array(BlogArticleSummarySchema),
}, { additionalProperties: false })

export type BlogCategorySchema = Static<typeof BlogCategorySchema>

export const BlogArticleText = Type.Object({
  type: Type.String(),
  text: Type.String(),
  bold: Type.Optional(Type.Boolean()),
  italic: Type.Optional(Type.Boolean()),
  underline: Type.Optional(Type.Boolean()),
  strikethrough: Type.Optional(Type.Boolean()),
  code: Type.Optional(Type.Boolean()),
}, { additionalProperties: false })

export type BlogArticleText = Static<typeof BlogArticleText>

export const BlogArticleMediaSchema = Type.Object({
  name: Type.String(),
  alternativeText: Type.Union([Type.String(), Type.Null()]),
  hash: Type.String(),
  ext: Type.String(),
  mime: Type.String(),
  width: Type.Number(),
  height: Type.Number(),
  size: Type.Number(),
  url: Type.String(),
}, { additionalProperties: false })

export type BlogArticleMediaSchema = Static<typeof BlogArticleMediaSchema>

// Recursive block node — children can be nested blocks or leaf text nodes.
export const BlogArticleBlockSchema = Type.Recursive(Self => Type.Object({
  type: Type.Union([
    Type.Literal('paragraph'),
    Type.Literal('heading'),
    Type.Literal('list'),
    Type.Literal('list-item'),
    Type.Literal('quote'),
    Type.Literal('code'),
    Type.Literal('image'),
    Type.Literal('link'),
  ]),
  level: Type.Optional(Type.Union([
    Type.Literal(1),
    Type.Literal(2),
    Type.Literal(3),
    Type.Literal(4),
    Type.Literal(5),
    Type.Literal(6),
  ])),
  format: Type.Optional(Type.Union([
    Type.Literal('ordered'),
    Type.Literal('unordered'),
  ])),
  url: Type.Optional(Type.String()),
  alt: Type.Optional(Type.String()),
  language: Type.Optional(Type.String()),
  children: Type.Optional(
    Type.Array(Type.Union([Self, BlogArticleText])),
  ),
}, { additionalProperties: false }), { $id: 'BlogArticleBlock' })

export type BlogArticleBlockSchema = Static<typeof BlogArticleBlockSchema>

export const BlogArticleSchema = Type.Object({
  title: Type.Optional(Type.String()),
  subtitle: Type.Optional(Type.String()),
  author: Type.Optional(Type.String()),
  content: Type.Optional(Type.Array(BlogArticleBlockSchema)),
  banner: Type.Optional(BlogArticleMediaSchema),
  category: Type.Optional(BlogCategoryEnumSchema),
  slug: Type.Optional(Type.String()),
}, { additionalProperties: false })

export type BlogArticleSchema = Static<typeof BlogArticleSchema>
