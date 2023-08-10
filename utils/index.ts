import { every, filter, forEach, map, some } from "p-iteration";

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export const arrayIncludesSome = async (arr: any[], entries: any[]) => {
  return await some(arr, async item => entries.includes(item))
}

export const arrayIsolate = async (arr: any[], entries: any[]) => {
  return await filter(arr, async item => entries.includes(item));
}

export const arrayEntriesAreType = async (arr: any[], type: string) => {
  return await every(arr, async element => typeof element === type);
}

export const objectIsolateWhereKeys = async (obj: object, entries: any[]) => {
  const filteredEntries = await filter(Object.entries(obj), async ([key, value]) => entries.includes(key))
  return Object.fromEntries(filteredEntries)
}

export const mapArgsToPromises = async (args: any[], func: any) => {
  return map(args, async (thisArgs) => {
    if (thisArgs === undefined) return Promise.resolve(undefined)

    thisArgs = Array.isArray(thisArgs) ? thisArgs : [thisArgs]
    return Promise.resolve(func(...thisArgs))
  })
}

export const processSpread = <T>(...args: (T | T[])[]): T[] => {
  return args.length === 1 && Array.isArray(args[0]) ? args[0] as T[] : args as T[];
}

export const createObjectMapByKeyWithMiddleware = async <ArrayOfObjects extends any[]>(
  arrayOfObjects: ArrayOfObjects, keyName: string, middlewareFn?: (item:ArrayElement<ArrayOfObjects>) => Promise<any>
): Promise<any> => {
  const objMap = {}
  await forEach(
    arrayOfObjects, async (item) => (objMap as any)[item[keyName]] = (middlewareFn ? await middlewareFn(item) : item)
  ) 
  return objMap
}

export const getSizeFromString = (input: string): string | undefined => {
  const patternRegex = /.*\[(\d+x\d+)\]/;
  const match = input.match(patternRegex);
  if (match && match.length === 2) return match[1]
}

export const arrayRemoveMutiple = (arr: any[], entries: any[]) => {
  return arr.filter((item) => !entries.includes(item));
}

export const createDateTimeObjectFromBirthdate = (dateObj: { birthMonth: number; birthDay: number; birthYear: number }): Date => {
  const { birthMonth, birthDay, birthYear } = dateObj
  return new Date(birthYear, birthMonth - 1, birthDay)
}

export const isOneOfMany = async (target:unknown, arr: any[]) => {
  try {
    await forEach(arr, async entry => { if (target == entry) throw new Error('Break') })
    return false
  } catch {
    return true
  }
}

export const createSearchParams = async (params: { [key: string]:any }) => {
  const [paramsKeys, paramsValues] = [Object.keys(params), Object.values(params)]
  const formattedParams: { [key: string]:string } = {}

  await forEach(paramsValues, async (param:any, i:number) => {
    if (param == undefined || param == null) return
    if (typeof(param) == "string") return formattedParams[paramsKeys[i]] = param
    if (Array.isArray(param)) return formattedParams[paramsKeys[i]] = param.join(",")
    return formattedParams[paramsKeys[i]] = param.toString()
  })
  
  return new URLSearchParams(formattedParams).toString()
}