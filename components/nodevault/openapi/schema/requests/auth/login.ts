import { Type } from '@sinclair/typebox'
import type { OpenAPIV3 } from 'openapi-types'
import { asSchema } from '../../utils.js'

export const LoginRequestSchema = Type.Object({
  email: Type.String(),
}, { additionalProperties: false })

export const LoginRequest: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject = {
  content: {
    'application/json': {
      schema: asSchema(LoginRequestSchema),
    },
  },
}
