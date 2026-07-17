import type { OpenAPIV3 } from 'openapi-types'

export const id: OpenAPIV3.ParameterObject = {
  name: 'id',
  in: 'path',
  required: true,
  description: 'ID',
  schema: {
    type: 'string',
  },
  allowEmptyValue: false,
}

export const slug: OpenAPIV3.ParameterObject = {
  name: 'slug',
  in: 'path',
  required: true,
  description: 'Slug',
  schema: {
    type: 'string',
  },
  allowEmptyValue: false,
}
