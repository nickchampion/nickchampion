import type { IDocumentQuery } from 'ravendb'
import type { BaseModel } from '@platform/components.context'

export interface ISearchFilter {
  negate: boolean | undefined
  name: string
  terms: string[]
  operator: 'AND' | 'OR'
  matches: (term: string) => boolean
  apply: (query: IDocumentQuery<BaseModel>) => IDocumentQuery<BaseModel>
}
