import { Type, type Static } from '@sinclair/typebox'
import { openapi } from '@nodevault/platform.components.domain'

export const UserSchema = Type.Object({
  id: Type.String(),
  email: Type.String(),
  lastName: Type.String(),
  firstName: Type.String(),
  accountId: Type.String(),
  countryISO: Type.String(),
  phone: openapi.models.PhoneSchema,
  roles: Type.Array(
    Type.Union([
      Type.Literal('guest'),
      Type.Literal('user'),
      Type.Literal('admin'),
    ]),
  ),
})

export type UserSchema = Static<typeof UserSchema>
