import type { ApiHandler } from '@platform/components.context'
import type { Response } from '@platform/components.api'

export const systemPing: ApiHandler = async (context): Promise<Response> => {
  return context.event.response.ok({ status: 'ok' })
}
