import { Response } from 'express'

export const generateError = (res: any, status: number, message: string) => {
  return res.status(status).send({
    message,
  })
}
