import { find, forEach } from "p-iteration"
import { InvalidRequestDataError } from "../errors"
import { ApiMethodResponse } from "../apis/apis.types";
import { ResolvedType } from "../utils/utils.types";

type FnResponse = ApiMethodResponse<any, any, "PAGINATED">

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

export const Paginate = <T extends (...args: any) => FnResponse>(
  fn: T, middleware?: (...args: any) => Promise<any> & any
) => {
  return async function*(...fnArgs: Parameters<T>) {
    // Creates an object with arguments as key-value pairs.
    const fnArgNames: string[] = getParams(fn);
    const fnArgValues = Object.values({ ...fnArgs })
    const formattedFnArgs: { [key: string]: any } = {};
    await forEach(fnArgNames, async (item: string, i: number) => formattedFnArgs[item] = fnArgValues[i] )

    while (true) {
      try {
        const response: Awaited<ReturnType<T>> = await (middleware ? middleware(fn) : fn)(...Object.values(formattedFnArgs))
        yield response

        // Gets the cursor
        const cursor = response.cursors.next

        formattedFnArgs.cursor = cursor

      } catch (error:unknown) {
        if (!(error instanceof InvalidRequestDataError)) throw error

        const isInvalidPage = !!(await find((error as InvalidRequestDataError).errors, async e => e.field === "cursor" || e.message.includes("page token")))
        if (isInvalidPage) return true
      }
    }
  }
}
