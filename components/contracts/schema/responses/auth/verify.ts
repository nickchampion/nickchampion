import { Type, type Static } from '@sinclair/typebox'
import type { OpenAPIV3 } from 'openapi-types'
import { AccountSchema, UserSchema } from '../account/index.js'
import { asSchema } from '../../../utils.js'

export const VerifyLoginSchema = Type.Object({
  tokens: Type.Object({
    access: Type.String(),
    expiresAtUTC: Type.Optional(Type.String()),
  }, { additionalProperties: false }),
  user: UserSchema,
  account: AccountSchema,
}, { additionalProperties: false })

export type VerifyLoginSchema = Static<typeof VerifyLoginSchema>

export const VerifyLoginResponse: OpenAPIV3.ResponseObject = {
  description: 'Ok',
  content: {
    'application/json': {
      schema: asSchema(VerifyLoginSchema),
    },
  },
}
