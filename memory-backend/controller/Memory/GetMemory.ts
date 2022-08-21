import { memories } from './../../model/memory'
import { Request, Response } from 'express'
import { generateError } from '../../helper/generateError'
export const getMemory = async (req: Request, res: Response) => {
  const { params } = req
  try {
    const data = await memories.findById(params?.id)
    res.send({
      status: 200,
      data,
    })
  } catch (error: any) {
    return generateError(res, 500, error.message)
  }
}
