import { Type } from '@sinclair/typebox'
import type { OpenAPIV3 } from 'openapi-types'
import { asSchema } from '../../utils.js'

export const VerifyLoginRequestSchema = Type.Object({
  code: Type.String(),
}, { additionalProperties: false })

export const VerifyLoginRequest: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject = {
  content: {
    'application/json': {
      schema: asSchema(VerifyLoginRequestSchema),
    },
  },
}
