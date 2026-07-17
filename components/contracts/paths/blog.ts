import type { OpenAPIV3 } from 'openapi-types'
import * as openapi from '../schema/common/index.js'
import * as schema from '../schema/index.js'

export const blog: OpenAPIV3.PathsObject = {
  '/blog/menu': {
    get: {
      operationId: 'blogMenu',
      summary: 'Blog menu',
      description: 'Blog menu',
      tags: ['Blog'],
      security: [],
      responses: openapi.responses.all(),
    },
  },
  '/blog/{slug}': {
    get: {
      operationId: 'blogArticle',
      summary: 'Blog article',
      description: 'Blog article',
      tags: ['Blog'],
      security: [],
      parameters: [schema.parameters.path.slug],
      responses: openapi.responses.all(),
    },
  },
}
