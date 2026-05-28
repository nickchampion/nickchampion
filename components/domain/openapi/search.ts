import { Type, type Static, type TSchema } from '@sinclair/typebox'

const ActiveFilterTerm = Type.Object({
  name: Type.String({ description: 'Name of the term' }),
  id: Type.String({ description: 'Unique id of the term used to apply the term filter to the query' }),
  hits: Type.String({ description: 'Number of documents that will be returned if you apply this facet term to the query' }),
  clearUrl: Type.String({ description: 'URL used to remove this term from the filter and the query' }),
}, { additionalProperties: false })

export const ActiveFilters = Type.Object({
  name: Type.String({ description: 'Name of the filter' }),
  displayName: Type.String({ description: 'Name of the filter' }),
  clearUrl: Type.String({ description: 'URL used to remove the filter from the query' }),
  terms: Type.Array(ActiveFilterTerm, { description: 'Array of terms that have been applied to this filter' }),
}, { additionalProperties: false })

export type ActiveFilters = Static<typeof ActiveFilters>

const FacetTermAggregations = Type.Record(
  Type.String(),
  Type.Object({
    sum: Type.Optional(Type.Number({ description: 'If the aggregation was "sum" this is the sum of this field across the results' })),
    min: Type.Optional(Type.Number({ description: 'If the aggregation was "min" this is the lowest matching value of this field across the results' })),
    max: Type.Optional(Type.Number({ description: 'If the aggregation was "max" this is the highest matching value of this field across the results' })),
    average: Type.Optional(Type.Number({ description: 'If the aggregation was "average" this is the average of this field across the results' })),
  }),
)

const FacetTerm = Type.Object({
  name: Type.String({ description: 'Name of the term' }),
  url: Type.String({ description: 'URL used to add or remove this term from the facet' }),
  hits: Type.Number({ description: 'Number of documents that will be returned if you apply this facet term to the query' }),
  selected: Type.Boolean({ description: 'True if this facet term has been applied to the query' }),
  id: Type.String({ description: 'Unique id of the term used to apply the term filter to the query' }),
  state: Type.Union([
    Type.Literal('checked disabled'),
    Type.Literal('checked'),
    Type.Literal('disabled'),
    Type.Literal(''),
  ], { description: 'String representation of the current state of the term' }),
  aggregations: Type.Optional(FacetTermAggregations),
}, { additionalProperties: false })

export const Facets = Type.Object({
  displayName: Type.String({ description: 'User friendly name of the facet field' }),
  clearUrl: Type.String({ description: 'URL used to remove this term from the facet and the query' }),
  disabled: Type.Boolean({ description: 'If true this facet has been applied to the query and cannot be edited' }),
  name: Type.String({ description: 'Name of the facet, must match the facet name in the URL' }),
  selected: Type.Boolean({ description: 'If true indicates this facet has been applied to the query' }),
  active: Type.Boolean({ description: 'If true this is the active facet' }),
  terms: Type.Array(FacetTerm, { description: 'Array of terms that are available to apply to the query for the given facet' }),
}, { additionalProperties: false })

export type Facets = Static<typeof Facets>

export const Aggregations = Type.Object({
  name: Type.Optional(Type.String({ description: 'Name of the field we have aggregated on' })),
  sum: Type.Optional(Type.Number({ description: 'If the aggregation was "sum" this is the sum of this field across the results' })),
  min: Type.Optional(Type.Number({ description: 'If the aggregation was "min" this is the lowest matching value' })),
  max: Type.Optional(Type.Number({ description: 'If the aggregation was "max" this is the highest matching value' })),
  average: Type.Optional(Type.Number({ description: 'If the aggregation was "average" this is the average' })),
  count: Type.Optional(Type.Number({ description: 'The number of documents used to calculate the aggregation' })),
  range: Type.Optional(Type.String({ description: "Used when we have a set of ranges we've aggregated on" })),
  hits: Type.Optional(Type.Number({ description: 'The number of documents used to calculate the aggregation' })),
  unit: Type.Optional(Type.String({ description: 'The measurement unit or currency of the aggregated value' })),
})

export type Aggregations = Static<typeof Aggregations>

export const SearchResults = (docs?: TSchema, custom?: TSchema) => Type.Object({
  docs: Type.Array(docs ?? Type.Unknown()),
  custom: Type.Optional(custom ?? Type.Unknown()),
  totalDocs: Type.Number({ description: 'Total number of documents matching your query' }),
  limit: Type.Number({ description: 'Number of results to show per page' }),
  offset: Type.Number({ description: 'Number of records to skip before get a page of records' }),
  clearUrl: Type.String({ description: 'URL to remove all filters from the search' }),
  activeFilters: Type.Array(ActiveFilters, { description: 'Array of filters that have been applied to the query' }),
  facets: Type.Array(Facets, { description: 'Array of facet results that have been applied to the query' }),
  aggregations: Type.Optional(Type.Array(Aggregations, { description: 'Array of aggregations applied to the query' })),
})
