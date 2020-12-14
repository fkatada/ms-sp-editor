import { action } from 'typesafe-actions'
import { Constants, IDefinitions } from './types'

export function setCode(code: string) {
  return action(Constants.GC_SET_CODE, {
    code,
  })
}

export function setResult(result: string) {
  return action(Constants.GC_SET_RESULT, {
    result,
  })
}

export function setDefinitions(definitions: IDefinitions[]) {
  return action(Constants.GC_SET_DEFINITIONS, {
    definitions,
  })
}
