import { every, filter, forEach, map, some } from "p-iteration";
import cloneDeep from "lodash.clonedeep"
import { MD5 } from 'crypto-js';
import base64 from "crypto-js/enc-base64"

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

export const processSpread = <T = any>(...args: (T | T[])[]): T[] => {
  return args.length === 1 && Array.isArray(args[0]) ? args[0] as T[] : args as T[];
}

export const createObjectMapByKeyWithMiddleware = <ArrayOfObjects extends any[]>(
  arrayOfObjects: ArrayOfObjects, keyName: string, middlewareFn?: (item:ArrayElement<ArrayOfObjects>) => any
): any => {
  const objMap = {}
  arrayOfObjects.forEach(item => (objMap as any)[item[keyName]] = (middlewareFn ? middlewareFn(item) : item)) 
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

type AnyObject = { [key: string|number|symbol]: any }
type IfVoidThenConvertTo<Target, ConvertTo> = Target extends void ? ConvertTo : Target;

export const mutateObject = <Input extends Object = AnyObject, Output extends Object | void = void>(
  obj: Input = {} as Input, mutateFn: (obj: IfVoidThenConvertTo<Output, Input>) => void
): IfVoidThenConvertTo<Output, Input> => {
  mutateFn(obj as IfVoidThenConvertTo<Output, Input>); return obj as IfVoidThenConvertTo<Output, Input>
}

export const cloneAndMutateObject = <Input extends Object = AnyObject, Output extends Object | void = void>(
  obj: Input = {} as Input, mutateFn: (obj: IfVoidThenConvertTo<Output, Input>) => void
): IfVoidThenConvertTo<Output, Input> => {
  const clone = cloneDeep(obj)
  mutateFn(clone as IfVoidThenConvertTo<Output, Input>); return clone as IfVoidThenConvertTo<Output, Input>
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

export const toCamel = <Input extends AnyObject, Output extends AnyObject>(o: Input): Output => {
  var newO: AnyObject, origKey, newKey, value
  if (o instanceof Array) {
    return o.map(function(value) {
        if (typeof value === "object") {
          value = toCamel(value)
        }
        return value
    }) as any as Output
  } else {
    newO = {}
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
        value = o[origKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamel(value)
        }
        newO[newKey] = value
      }
    }
  }
  return newO as any as Output
}

export const removeEntriesWhereUndefinedValues = (inputObject: { [key: string]: any }) => {
  // Create a new object to store the filtered key-value pairs.
  const filteredObject: { [key: string]: any } = {};

  // Iterate over the key-value pairs using .forEach
  Object.entries(inputObject).forEach(([key, value]) => {
    if (value !== undefined) {
      filteredObject[key] = value;
    }
  });

  return filteredObject;
}

export const calculateContentMD5 = (content: string): string => {
  // Calculate MD5 hash
  const md5Hash = MD5(content);

  // Convert the MD5 hash to a Base64-encoded string
  const md5Base64 = base64.stringify(md5Hash);

  return md5Base64;
}

export const isObjectOrArray = (arg: any) => {
  if (arg !== undefined && arg !== null && (Array.isArray(arg) || typeof arg === "object")) return true
  return false
}