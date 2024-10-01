// [ Types ] /////////////////////////////////////////////////////////////////////
import { ObjectPrettify } from "typeforge";
import type { CallApiMethod } from "../apis/apiGroup/apiGroup.types";
import { HttpHandlerProps, HttpResponse } from "../http/http.utils";
import { config as openbloxConfig } from "../config"
import { FetchAdapter } from "../http/httpAdapters/fetchHttpAdapter";

export type PollConfig = ObjectPrettify<{
  iterations?: number,
  multiplyer?: number,
  retryOffset?: number,
  debug?: boolean
}>
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const sleep = async (s: number) => new Promise(resolve => setTimeout(resolve, s))

const expBackoff = (iter: number, stepMultiplier: number) => stepMultiplier * (iter - 1);
//////////////////////////////////////////////////////////////////////////////////


export const pollMethod = async <
  MethodBase extends ReturnType<CallApiMethod<any, any, true | false>>,
  Method extends MethodBase | Awaited<MethodBase>
>(
  method: Method,
  handlerFn: (result: Awaited<MethodBase>, stopPolling: () => void) => Promise<boolean | void>,
  config?: PollConfig
): Promise<Awaited<Method>> => {
  // Makes sure the method is awaited.
  const methodAwaited = await method

  let polling = true, dataToReturn = methodAwaited
  const stopPolling = () => polling = false

  // Checks to see if polling can be avoided all together.
  await handlerFn(methodAwaited, stopPolling)
  if (!polling) return dataToReturn

  const iterations = config?.iterations ?? 15, multiplyer = config?.multiplyer ?? 200, retryOffset = config?.retryOffset ?? 5, debug = config?.debug
  let offset = 0, newIteration = false

  const again = methodAwaited.again

  console.warn(`Polling method (Please be patient)...`)

  while (polling) {
    for (let iter = 1 + offset; iter <= iterations + offset; iter++) {
      const backoff = expBackoff(iter, multiplyer)
      if (debug) console.log(`iteration ${iter} start, backing off for ${backoff}ms...`)
      
      if (backoff !== 0) await sleep(backoff)

      const response: Awaited<Method> = await again() as any
      newIteration = await handlerFn(response, stopPolling) ?? false

      if (!polling) {
        dataToReturn = response
        break
      }

      if (debug) console.log(`iteration ${iter} end.\n`)

      // if a new / valid response was gotten then breaks out of the current iteration cycle.
      if (newIteration) break
    }

    offset = newIteration ? 0 : retryOffset
    newIteration = false
  }

  return dataToReturn
}


export const pollHttp = async <Body extends any>(
  httpArgs: HttpHandlerProps,
  handlerFn: (result: HttpResponse<Body>, stopPolling: () => void) => Promise<boolean | void>,
  config?: PollConfig
): Promise<void> => {
  const iterations = config?.iterations ?? 15, multiplyer = config?.multiplyer ?? 200, retryOffset = config?.retryOffset ?? 5, debug = config?.debug
  let offset = 0, newIteration = false

  let polling = true
  const stopPolling = () => polling = false
  
  const httpAdapter = openbloxConfig.http?.adapter ?? FetchAdapter

  while (polling) {
    for (let iter = 1 + offset; iter <= iterations + offset; iter++) {
      const backoff = expBackoff(iter, multiplyer)
      if (debug) console.log(`iteration ${iter} start, backing off for ${backoff}ms...`)
      
      if (backoff !== 0) await sleep(backoff)

      const response = await httpAdapter(httpArgs)
      newIteration = await handlerFn(response as HttpResponse<Body>, stopPolling) ?? false

      if (!polling) break

      if (debug) console.log(`iteration ${iter} end.\n`)

      // if a new / valid response was gotten then breaks out of the current iteration cycle.
      if (newIteration) break
    }

    offset = newIteration ? 0 : retryOffset
    newIteration = false
  }
}