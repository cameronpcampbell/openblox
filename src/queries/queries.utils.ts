import { CallApiMethod } from "../apis/apiGroup/apiGroup.types"
import { OpenbloxConfig } from "../config"
import { pollMethod, PollConfig } from "../helpers"

export const addObjectToFunction = <
  Fn extends (...args: any) => any, Obj extends Record<any, any>,
  _FnAndObj extends Fn & Obj
>(fn: Fn, obj: Obj): _FnAndObj => {
   for (const [ key, value ] of Object.entries(obj)) (fn as any)[key] = value
   return fn as any as _FnAndObj
}

export const resultsAfterDate = <Result extends Record<any, any>>(
  results: Result[], key: string, time: number
): Result[] | void => {
  const latestResult = results[0]
  if (!latestResult) return
  if (new Date(latestResult[key]).getTime() < time) return

  const newResults = [ latestResult ]
  for (let idx = 1; idx < results.length; idx++) {
    const log = results[idx] as typeof results[0]
    if (new Date(log[key]).getTime() < time) break
    newResults.push(log)
  }

  return newResults
}

export const resultsAfterDateWithMiddleware = <Result extends Record<any, any>>(
  results: Result[], getKey: (data: Result) => any, time: number
): Result[] | void => {
  const latestResult = results[0]
  if (!latestResult) return
  if (new Date(getKey(latestResult)).getTime() < time) return

  const newResults = [ latestResult ]
  for (let idx = 1; idx < results.length; idx++) {
    const log = results[idx] as typeof results[0]
    if (new Date(getKey(log)).getTime() < time) break
    newResults.push(log)
  }

  return newResults
}


export const pollForLatest = <
  CallMethod extends CallApiMethod<any, any, true>
>(
  method: CallMethod, args: Parameters<CallMethod>[0],
  dateKey: string | ((result: Awaited<ReturnType<CallMethod>>["data"][number]) => any),
  config: OpenbloxConfig | undefined,
  middlewareFn: (data: Awaited<ReturnType<CallMethod>>["data"]) => Promise<any>,
) => {
  let lastPolledTime = new Date().getTime()

  const _resultsAfterDate = typeof dateKey === "string" ? resultsAfterDate : resultsAfterDateWithMiddleware

  return pollMethod.call(config, method(args), async ({ data }) => {
    const thisPolledTime = new Date().getTime()
  
    const newResults = _resultsAfterDate(data, dateKey as any, lastPolledTime)
    if (!newResults) return false

    await middlewareFn(newResults)
  
    lastPolledTime = thisPolledTime
    return true
  }) as any as Promise<void>
}