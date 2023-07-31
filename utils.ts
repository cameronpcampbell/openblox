import { every, filter, forEach, map, some } from "p-iteration";

export const ArrayIncludesSome = async (arr: any[], entries: any[]) => {
  return await some(arr, async item => entries.includes(item))
}

export const ArrayIsolate = async (arr: any[], entries: any[]) => {
  return await filter(arr, async item => entries.includes(item));
}

export const ArrayEntriesAreType = async (arr: any[], type: string) => {
  return await every(arr, async element => typeof element === type);
}

export const ObjectIsolateWhereKeys = async (obj: object, entries: any[]) => {
  const filteredEntries = await filter(Object.entries(obj), async ([key, value]) => entries.includes(key))
  return Object.fromEntries(filteredEntries)
}

export const MapArgsToPromises = async (args: any[], func: any) => {
  return map(args, async (thisArgs) => {
    if (thisArgs === undefined) return Promise.resolve(undefined)

    thisArgs = Array.isArray(thisArgs) ? thisArgs : [thisArgs]
    return Promise.resolve(func(...thisArgs))
  })
}

export const ProcessSpread = <T>(...args: (T | T[])[]): T[] => {
  return args.length === 1 && Array.isArray(args[0]) ? args[0] as T[] : args as T[];
}

export const CreateObjectMapByKeyWithMiddleware = async (arrayOfObjects: any[], keyName: string, middlewareFn?: (item:any) => Promise<any>) => {
  const obj: any = {}
  await forEach(arrayOfObjects, async item => obj[item[keyName]] = middlewareFn ? await middlewareFn(item) : item) 
  return obj
}

export const GetSizeFromString = (input: string): string | undefined => {
  const patternRegex = /.*\[(\d+x\d+)\]/;
  const match = input.match(patternRegex);
  if (match && match.length === 2) return match[1]
}

export const ArrayRemoveMutiple = (arr: any[], entries: any[]) => {
  return arr.filter((item) => !entries.includes(item));
}

export const CreateDateTimeObjectFromBirthdate = (dateObj: { birthMonth: number; birthDay: number; birthYear: number }): Date => {
  const { birthMonth, birthDay, birthYear } = dateObj
  return new Date(birthYear, birthMonth - 1, birthDay)
}

export const IsOneOfMany = async (target:unknown, arr: any[]) => {
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