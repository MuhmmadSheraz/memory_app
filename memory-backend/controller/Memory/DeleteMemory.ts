import { memories } from './../../model/memory'
import { Request, Response } from 'express'
import { generateError } from '../../helper/generateError'
export const deleteMemory = async (req: Request, res: Response) => {
  const { params } = req
  try {
    await memories.deleteOne({ id: params?.id })
    res.send({
      status: 200,
      message: 'Memory Deleted Successfully',
    })
  } catch (error: any) {
    return generateError(res, 500, error.message)
  }
}
