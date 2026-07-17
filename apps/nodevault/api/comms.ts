import type { ContactRequestSchema, schema } from '@platform/components.contracts'
import type { ApiClient } from './client'
import type { ApiResponse } from './types'

export class CommsApi {
  private client: ApiClient

  constructor(apiClient: ApiClient) {
    this.client = apiClient
  }

  public contact = async (payload: ContactRequestSchema): Promise<ApiResponse<schema.common.models.StandardResponseSchema>> => {
    return this.client.invoke({
      path: '/comms/contact',
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }
}
