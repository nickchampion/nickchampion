import type { ApiHandler } from '@platform/components.context'
import type { Response } from '@platform/components.api'
import { createStrapiClient } from '@platform/integrations.strapi'
import { serverConfiguration } from '@platform/components.configuration'

export const blogMenu: ApiHandler = async (context): Promise<Response> => {
  const cms = createStrapiClient({
    baseURL: serverConfiguration.strapi.host,
    apiToken: serverConfiguration.strapi.apiKey,
  })

  const menu = await cms.getArticleMenu()

  return context.event.response.ok(menu)
}
