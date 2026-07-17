import type { OpenAPIV3 } from 'openapi-types'
import * as openapi from '../schema/common/index.js'

export const system: OpenAPIV3.PathsObject = {
  '/system/ping': {
    get: {
      operationId: 'systemPing',
      summary: 'Health check',
      description: 'Returns ok — used by monitoring and uptime checks',
      tags: ['System'],
      security: [],
      responses: openapi.responses.all(),
    },
  },
}
