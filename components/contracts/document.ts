import type { OpenAPIV3 } from 'openapi-types'
import * as paths from './paths/index.js'
import * as schema from './schema/index.js'
import * as common from './schema/common/index.js'
import { asSchema } from './utils.js'

export const composeOpenApiDocument = (): OpenAPIV3.Document => {
  const document: OpenAPIV3.Document = {
    openapi: '3.0.1',
    info: {
      title: 'Node Vault API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://api.nodevault.cloud',
        description: 'production',
      },
    ],
    security: [],
    tags: [
      { name: 'Account', description: 'Account and user management' },
      { name: 'Auth', description: 'Authorisation & Registration' },
      { name: 'Comms', description: 'Contact and communication' },
      { name: 'System', description: 'Health checks and monitoring' },
    ],
    components: {
      responses: common.responses.apiResponses,
      securitySchemes: {
        jwt: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // account
        UserSchema: asSchema(schema.responses.account.UserSchema),
        AccountSchema: asSchema(schema.responses.account.AccountSchema),
        UserSearchResultsSchema: asSchema(common.search.SearchResults(schema.responses.account.UserSchema)),
        // auth
        VerifyLoginSchema: asSchema(schema.responses.auth.VerifyLoginSchema),
        RegisterRequestSchema: asSchema(schema.requests.auth.RegisterRequestSchema),
        // comms
        ContactRequestSchema: asSchema(schema.requests.comms.ContactRequestSchema),
        // blog
        BlogCategorySchema: asSchema(schema.responses.blog.BlogCategorySchema),
        BlogArticleSchema: asSchema(schema.responses.blog.BlogArticleSchema),
      },
    },
    paths: {
      ...paths.auth,
      ...paths.comms,
      ...paths.system,
      ...paths.blog,
    },
  }

  return document
}
