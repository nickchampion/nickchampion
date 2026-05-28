import type { TSchema } from '@sinclair/typebox'
import type { OpenAPIV3 } from 'openapi-types'

/**
 * Cast a TypeBox schema to the OpenAPIV3.SchemaObject shape expected by openapi-types.
 * TypeBox schemas are plain JSON Schema objects at runtime — the cast is always safe.
 */
export const asSchema = (schema: TSchema): OpenAPIV3.SchemaObject => schema as unknown as OpenAPIV3.SchemaObject
