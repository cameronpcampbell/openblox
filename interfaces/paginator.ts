import { find, forEach } from "p-iteration"
import { InvalidRequestDataError } from "../errors"

type FnResponse = {
  cursors: {
    next: string,
    previous: string
  },
  [key: string|number]: unknown
}

function getParams(func:(...args: any[]) => any) {
 
  // String representation of the function code
  let str = func.toString();

  // Remove comments of the form /* ... */
  // Removing comments of the form //
  // Remove body of the function { ... }
  // removing '=>' if func is arrow function
  str = str.replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/(.)*/g, '')
      .replace(/{[\s\S]*}/, '')
      .replace(/=>/g, '')
      .trim();

  // Start parameter names after first '('
  let start = str.indexOf("(") + 1;

  // End parameter names is just before last ')'
  let end = str.length - 1;

  let result = str.substring(start, end).split(", ");

  let params: string[] = [];

  result.forEach(element => {

      // Removing any default value
      element = element.replace(/=[\s\S]*/g, '').trim();

      if (element.length > 0)
          params.push(element);
  });

  return params;
}

export const Paginate = <T extends (...args: any) => Promise<FnResponse>>(
  fnProps: T | [fn: T, middleware?: (...args: any) => Promise<any> & any]
) => {
  return async function*(...fnArgs: Parameters<T>) {
    // Gets the function and the middleware.
    const fnPropsIsArray =  Array.isArray(fnProps)
    const fn = fnPropsIsArray ? fnProps[0] : fnProps
    const middleware = fnPropsIsArray ? fnProps[1] : undefined

    // Creates an object with arguments as key-value pairs.
    const fnArgNames: string[] = getParams(fn);
    const fnArgValues = Object.values({ ...fnArgs })
    const formattedFnArgs: { [key: string]: any } = {};
    await forEach(fnArgNames, async (item: string, i: number) => formattedFnArgs[item] = fnArgValues[i] )

    while (true) {
      try {
        const response = await (middleware ? middleware(fn) : fn)(...Object.values(formattedFnArgs)) as FnResponse
        yield response as ReturnType<T>

        const cursor = response?.cursors?.next
        formattedFnArgs.cursor = cursor
        if (cursor == null) break

      } catch (error:unknown) {
        if (!(error instanceof InvalidRequestDataError)) throw error
        const isInvalidCursorError = !!(await find((error as InvalidRequestDataError).errors, async e => e.field === "cursor"))
        if (isInvalidCursorError) return true
      }
    }
  }
}
