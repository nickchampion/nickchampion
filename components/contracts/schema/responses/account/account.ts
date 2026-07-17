import { Type, type Static } from '@sinclair/typebox'

export const AccountSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
})

export type AccountSchema = Static<typeof AccountSchema>
