import { AllOverrides } from "../config/config.types"

export const Override = <T extends (...args: any) => Promise<any>>(
  method: T, overrides: AllOverrides): ((...args: Parameters<T>) => ReturnType<T>
) => {
  return method.bind(overrides) as ((...args: Parameters<T>) => ReturnType<T>)
}