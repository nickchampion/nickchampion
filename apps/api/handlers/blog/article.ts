import type { ApiHandler } from '@platform/components.context'
import type { Response } from '@platform/components.api'
import { createStrapiClient } from '@platform/integrations.strapi'
import { serverConfiguration } from '@platform/components.configuration'

export const blogArticle: ApiHandler = async (context): Promise<Response> => {
  const slug = String(context.event.params.slug)?.toLowerCase()

  if (!slug) return context.event.response.notFound()

  const cms = createStrapiClient({
    baseURL: serverConfiguration.strapi.host,
    apiToken: serverConfiguration.strapi.apiKey,
  })

  const article = await cms.getArticleBySlug(slug)

  if (!article) return context.event.response.notFound()

  // Normalise relative media URLs to absolute so the browser can resolve them
  if (article.banner?.url && !article.banner.url.startsWith('http')) {
    const origin = serverConfiguration.strapi.host.replace(/\/api\/?$/, '')

    article.banner.url = `${origin}${article.banner.url}`
  }

  return context.event.response.ok(article)
}
