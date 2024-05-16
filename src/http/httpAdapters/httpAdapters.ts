// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ObjectPrettify } from "typeforge"
import type { HttpHandlerProps, HttpResponse } from "../httpHandler"

export type HttpAdapter = <
  Body extends any = any
>(props: HttpHandlerProps) => (
  Promise<ObjectPrettify<HttpResponse<Body>>>
)
//////////////////////////////////////////////////////////////////////////////////