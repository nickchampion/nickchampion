import type { BlogCategorySchema, BlogArticleSchema } from '@nodevault/platform.components.nodevault.openapi'
import type { ApiClient } from './client'
import type { ApiResponse } from './types'

export class BlogApi {
  private client: ApiClient

  constructor(apiClient: ApiClient) {
    this.client = apiClient
  }

  public menu = async (): Promise<ApiResponse<BlogCategorySchema[]>> => {
    return this.client.invoke({
      path: '/blog/menu',
      method: 'GET',
    })
  }

  public article = async (slug: string): Promise<ApiResponse<BlogArticleSchema>> => {
    return this.client.invoke({
      path: `/blog/${slug}`,
      method: 'GET',
    })
  }
}
