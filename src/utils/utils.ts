import { cloneDeep } from "lodash"

type IfVoidThenConvertTo<Target, ConvertTo> = Target extends void ? ConvertTo : Target

export const cloneAndMutateObject = (<
  Input extends Record<any, any> = Record<any, any>,
  Output extends Object | void = void
>(
  obj: Input = {} as Input, mutateFn: (obj: IfVoidThenConvertTo<Output, Input>) => void
): IfVoidThenConvertTo<Output, Input> => {
  const clone = cloneDeep(obj)
  mutateFn(clone as IfVoidThenConvertTo<Output, Input>); return clone as IfVoidThenConvertTo<Output, Input>
})

export const dataIsSuccess = (data: any) => {
  if (
    typeof data === 'object' &&
    !Array.isArray(data) &&
    data !== null
  ) {
    return !Object.keys(data).length
  }
  return false
}


export const createObjectMapByKeyWithMiddleware = <ArrayOfObjects extends any[]>(
  arrayOfObjects: ArrayOfObjects, keyName: string, middlewareFn?: (item: ArrayOfObjects[number]) => any
): any => {
  const objMap = {}
  arrayOfObjects.forEach(item => (objMap as any)[item[keyName]] = (middlewareFn ? middlewareFn(item) : item)) 
  return objMap
}

export const removeNullUndefined = (obj: Record<any, any>) => Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : ((a as any)[k] = v, a)), {});

/**
 * Simple object check.
 * @param item
 */
export function isObject(item: any) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target: Record<any, any>, ...sources: Record<any, any>[]) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}