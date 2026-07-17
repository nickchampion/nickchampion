import type { OpenAPIV3 } from 'openapi-types'
import * as openapi from '../../common/index.js'
import { asSchema } from '../../../utils.js'

export const LoginResponse: OpenAPIV3.ResponseObject = {
  description: 'Ok',
  content: {
    'application/json': {
      schema: asSchema(openapi.models.StandardResponseSchema),
    },
  },
}
