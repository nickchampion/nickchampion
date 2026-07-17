import { Type, type Static } from '@sinclair/typebox'
import type { OpenAPIV3 } from 'openapi-types'
import * as openapi from '../../common/index.js'
import { asSchema } from '../../../utils.js'

export const ContactRequestSchema = Type.Object({
  name: Type.String(),
  email: Type.String({ format: 'email' }),
  interests: Type.Array(
    Type.Union([
      Type.Literal('grapheneos'),
      Type.Literal('umbrelos'),
      Type.Literal('business'),
      Type.Literal('other'),
    ]),
    { minItems: 1 },
  ),
  message: Type.String(),
  phone: Type.Optional(openapi.models.PhoneSchema),
}, { additionalProperties: false })

export type ContactRequestSchema = Static<typeof ContactRequestSchema>

export const ContactRequest: OpenAPIV3.RequestBodyObject = {
  required: true,
  content: {
    'application/json': {
      schema: asSchema(ContactRequestSchema),
    },
  },
}
