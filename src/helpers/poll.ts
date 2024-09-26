// [ Types ] /////////////////////////////////////////////////////////////////////
import { ObjectPrettify } from "typeforge";
import type { CallApiMethod } from "../apis/apiGroup/apiGroup.types";

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


export const poll = async <CallMethod extends CallApiMethod<any, any, true | false>>(
    method: CallMethod, args: Parameters<CallMethod>[0],
    handlerFn: (result: Awaited<ReturnType<CallMethod>>, stopPolling: () => void) => Promise<boolean | void>,
    config?: PollConfig
): Promise<void> => {
  const iterations = config?.iterations ?? 15, multiplyer = config?.multiplyer ?? 200, retryOffset = config?.retryOffset ?? 5, debug = config?.debug
  let offset = 0, isSuccess = false

  let polling = true
  const stopPolling = () => polling = false

  while (polling) {
    for (let iter = 1 + offset; iter <= iterations + offset; iter++) {
      const backoff = expBackoff(iter, multiplyer)
      if (debug) console.log(`iteration ${iter} start, backing off for ${backoff}ms...`)
      
      if (backoff !== 0) await sleep(backoff)

      const response = await method(args)
      isSuccess = (await handlerFn(response as Awaited<ReturnType<CallMethod>>, stopPolling)) ?? false

      if (!polling) break

      if (debug) console.log(`iteration ${iter} end.\n`)

      // if a new / valid response was gotten then breaks out of the current iteration cycle.
      if (isSuccess) break
    }

    offset = isSuccess ? 0 : retryOffset
    isSuccess = false
  }
}