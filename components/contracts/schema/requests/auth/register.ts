import { Type, type Static } from '@sinclair/typebox'
import type { OpenAPIV3 } from 'openapi-types'
import * as openapi from '../../common/index.js'
import { asSchema } from '../../../utils.js'

export const RegisterRequestSchema = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  email: Type.String(),
  phone: Type.Optional(openapi.models.PhoneSchema),
}, { additionalProperties: false })

export type RegisterRequestSchema = Static<typeof RegisterRequestSchema>

export const RegisterRequest: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject = {
  content: {
    'application/json': {
      schema: asSchema(RegisterRequestSchema),
    },
  },
}
