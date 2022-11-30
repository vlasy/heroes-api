import { Request, Response } from 'express'
import * as lodash from 'lodash'

export interface AppMessage {
  param: {
    [key: string]: string
  }
  requestBody: any
}

export const createFromHttpRequest = async (httpContext: {
  req: Request
  res: Response
}): Promise<AppMessage> => {
  const { req } = httpContext
  return {
    param: lodash.defaults({}, req.headers, req.params, req.query),
    requestBody: req.body,
  }
}
