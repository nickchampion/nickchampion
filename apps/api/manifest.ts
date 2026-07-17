import type { IApiManifest } from '@platform/components.context'
import * as models from './models/models.js'
import * as indexes from './indexes/index.js'
import { composeOpenApiDocument } from './openapi/document.js'
import { apiHandlers } from './handlers/index.js'

/**
 * A modules manifest defines the API routes, event handlers, models and indexes exported by this module
 * A manifest is used to configure a service, a service can be composed of one or more manifests
 * giving flexibility over the granularity of each service
 *
 * We use OpenAPIBackend to handle routing, validtion and documentation, this allows us to define the
 * module specification in one place, a yml file.
 */

export const manifest: IApiManifest = {
  name: 'nodevault',
  api: apiHandlers,
  models,
  indexes,
  document: composeOpenApiDocument,
}
