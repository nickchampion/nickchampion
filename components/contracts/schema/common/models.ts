import { Type, type Static } from '@sinclair/typebox'

export const ValidationErrorSchema = Type.Object({
  path: Type.Optional(Type.String()),
  message: Type.Optional(Type.String()),
  code: Type.Optional(Type.String()),
  data: Type.Optional(Type.Unknown()),
}, { additionalProperties: false })

export type ValidationErrorSchema = Static<typeof ValidationErrorSchema>

export const StandardResponseSchema = Type.Object({
  status: Type.String(),
  message: Type.String(),
  stack: Type.Optional(Type.String()),
  code: Type.Optional(Type.String()),
  body: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  validation: Type.Optional(Type.Array(ValidationErrorSchema)),
}, { additionalProperties: false })

export type StandardResponseSchema = Static<typeof StandardResponseSchema>

export const PageSchema = Type.Object({
  totalDocs: Type.Number(),
  limit: Type.Number(),
  offset: Type.Number(),
  docs: Type.Array(Type.Unknown()),
}, { additionalProperties: false })

export type PageSchema = Static<typeof PageSchema>

export const CountrySchema = Type.Object({
  name: Type.Optional(Type.String()),
  iso: Type.Optional(Type.String()),
  currency: Type.Optional(Type.String()),
  callingCode: Type.Optional(Type.String()),
  locale: Type.Optional(Type.String()),
  continent: Type.Optional(Type.String()),
}, { additionalProperties: false })

export type CountrySchema = Static<typeof CountrySchema>

const CoordinatesObject = Type.Object({
  lat: Type.Number({ format: 'coordinates' }),
  lon: Type.Number({ format: 'coordinates' }),
}, { additionalProperties: false })

export const CoordinatesSchema = Type.Union([CoordinatesObject, Type.Null()])

export type CoordinatesSchema = Static<typeof CoordinatesSchema>

const PhoneObject = Type.Object({
  countryCode: Type.String(),
  number: Type.String(),
}, { additionalProperties: false })

export const PhoneSchema = Type.Union([PhoneObject, Type.Null()])

export type PhoneSchema = Static<typeof PhoneSchema>

export const AddressSchema = Type.Object({
  name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  line1: Type.String(),
  line2: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  line3: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  city: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  region: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  regionISO: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  postcode: Type.String(),
  countryName: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  countryISO: Type.String(),
  coordinates: Type.Optional(CoordinatesSchema),
}, { additionalProperties: false })

export type AddressSchema = Static<typeof AddressSchema>

export const PhoneNumberSchema = Type.Union([
  Type.String({ description: 'Phone number', format: 'phone-number' }),
  Type.Null(),
])

export type PhoneNumberSchema = Static<typeof PhoneNumberSchema>

export const AlphaNumericSchema = Type.String({
  description: 'Alpha Numeric with Spaces',
  format: 'alpha-numeric',
})

export type AlphaNumericSchema = Static<typeof AlphaNumericSchema>

export const AlphaNumeric30Schema = Type.String({
  description: 'Up to 30 alpha numeric characters with spaces',
  format: 'alpha-numeric-30',
})

export type AlphaNumeric30Schema = Static<typeof AlphaNumeric30Schema>

export const AlphaNumeric50Schema = Type.String({
  description: 'Up to 50 alpha numeric characters with spaces',
  format: 'alpha-numeric-50',
})

export type AlphaNumeric50Schema = Static<typeof AlphaNumeric50Schema>

export const DateSchema = (desc?: string) => Type.String({ format: 'date-time', description: desc ?? 'Date' })
