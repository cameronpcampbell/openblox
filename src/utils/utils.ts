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
/*export function isObject(item: any) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}*/

export const isObject = (maybeObject: any) => maybeObject?.constructor === Object

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

export const objectToFieldMask = (o: Record<any, any>) => {
  if (!o || typeof o !== 'object') return [];

  const paths = [];
  const stack = [{ obj: o, path: [] as string[] }];

  while (stack.length > 0) {
    const { obj, path } = stack.pop() as { obj: any, path: string[] };

    if (typeof obj === 'object' && obj !== null) {
      let isEmpty = true;
      for (const key in obj) {
        isEmpty = false;
        stack.push({ obj: obj[key], path: [...path, key] });
      }
      if (isEmpty) {
        // Add the path for empty objects or arrays
        paths.push(path);
      }
    } else {
      paths.push(path);
    }
  }

  return paths.map(path => path.join(".")).join(",");
}


export const toCamel = <Input extends Record<any, any>, Output extends Record<any, any>>(o: Input): Output => {
  var newO: Record<any, any>, origKey, newKey, value
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

export const toPascal = (obj: Record<any, any>) => {
  return Object.keys(obj).reduce(
    (result, key) => ({
      ...result,
      [key.charAt(0).toUpperCase() + key.slice(1)]: obj[key],
    }),
    {},
  );
};

export const isArrayOrObj = (x: any) => isObject(x) || Array.isArray(x)



type FormDataBuilder = Omit<FormData, "append"> & { append: (name: string, value: string | Blob | undefined) => FormDataBuilder }

export const formDataBuilder = () => {
  const formData = new FormData() as FormDataBuilder
  const oldAppend = formData.append.bind(formData)
  
  const append = (name: string, value: string | Blob | undefined) => {
    if (!value) return formData
    oldAppend(name, value as string | Blob)

    return formData
  }

  formData.append = append

  return formData
}