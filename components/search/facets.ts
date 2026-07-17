import type { KeyValuePair } from '@platform/components.context'
import { toObject as toObject } from '@platform/components.utils'
import type { FacetMap } from './entities.js'

export const getFacetMap = (
  name: string,
  displayName: string,
  values: KeyValuePair[],
  map?: (t: string) => string,
  filter?: (t: string, id: string) => boolean,
): FacetMap => {
  return {
    name,
    displayName,
    map,
    terms: toObject(
      values,
      n => String(n.id),
      false,
      n => n.value,
    ),
    filter,
  }
}

export const getFacetMapKvp = (
  name: string,
  displayName: string,
  values?: KeyValuePair[],
  map?: (t: string) => string,
  termMap?: (t: string) => string,
  filter?: (t: string, id: string) => boolean,
): FacetMap => {
  return {
    name,
    displayName,
    map,
    termMap,
    terms: values
      ? toObject(
        values,
        n => String(n.id),
        false,
        n => n.value,
      )
      : null,
    filter,
  }
}

export const getFacetMapBoolYesNo = (name: string, displayName: string) => getFacetMapKvp(name, displayName, [
  {
    id: 'true',
    value: 'Yes',
  },
  {
    id: 'false',
    value: 'No',
  },
])
