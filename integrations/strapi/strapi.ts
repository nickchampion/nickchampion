import { strapi } from '@strapi/client'
import type { StrapiConfig, ArticleMenu, MenuArticle, ArticleCategory, Article } from './types'

/**
 * Creates a lightweight, read-only Strapi CMS client.
 */
export const createStrapiClient = ({ baseURL, apiToken }: StrapiConfig) => {
  const client = strapi({ baseURL, auth: apiToken })
  const articles = client.collection('articles')

  return {
    getArticleMenu: async (): Promise<ArticleMenu> => {
      const result = await articles.find({
        fields: ['title', 'category', 'slug'],
        status: 'published',
        sort: ['category:asc'],
        pagination: { pageSize: 200 },
      })

      const flat = result.data as unknown as Array<MenuArticle & { category: ArticleCategory, slug: string }>

      const categoryMap = new Map<ArticleCategory, MenuArticle[]>()

      for (const item of flat) {
        if (!categoryMap.has(item.category)) {
          categoryMap.set(item.category, [])
        }

        categoryMap.get(item.category)!.push({ documentId: item.documentId, title: item.title, slug: item.slug })
      }

      return Array.from(categoryMap.entries()).map(([category, articles]) => ({ category, articles }))
    },

    getArticle: async (documentId: string): Promise<Article | null> => {
      try {
        const result = await articles.findOne(documentId, {
          populate: { banner: true },
          status: 'published',
        })

        return result.data as unknown as Article
      } catch {
        return null
      }
    },

    getArticleBySlug: async (slug: string): Promise<Article | null> => {
      try {
        const result = await articles.find({
          filters: { slug: { $eq: slug } },
          populate: { banner: true },
          status: 'published',
          pagination: { pageSize: 1 },
        })

        return (result.data[0] as unknown as Article) ?? null
      } catch {
        return null
      }
    },
  }
}
