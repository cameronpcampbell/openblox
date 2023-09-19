import { AllOverrides } from "../config/config.types"

export const Override = <T extends (...args: any) => Promise<any>>(
  method: T, overrides: AllOverrides): ((...args: Parameters<T>) => ReturnType<T>
) => {
  const binded = method.bind(overrides) as ((...args: Parameters<T>) => ReturnType<T>)

  /* @ts-expect-error */
  binded.overrides = overrides

  return binded
}