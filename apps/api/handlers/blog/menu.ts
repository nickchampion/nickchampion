import type { ApiHandler } from '@nodevault/platform.components.context'
import type { Response } from '@nodevault/platform.components.api'
import { createStrapiClient } from '@nodevault/platform.integrations.strapi'
import { serverConfiguration } from '@nodevault/platform.components.nodevault.server'

export const blogMenu: ApiHandler = async (context): Promise<Response> => {
  const cms = createStrapiClient({
    baseURL: serverConfiguration.strapi.host,
    apiToken: serverConfiguration.strapi.apiKey,
  })

  const menu = await cms.getArticleMenu()

  return context.event.response.ok(menu)
}
