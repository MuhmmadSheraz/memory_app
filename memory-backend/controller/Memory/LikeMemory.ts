import { generateError } from './../../helper/generateError'
import { memories } from './../../model/memory'
import { Request, Response } from 'express'
export const likeMemory = async (req: Request, res: Response) => {
  const { body } = req
  if (!body.memoryId) generateError(res, 500, 'Invalid Payload')

  try {
    const data = await memories.findByIdAndUpdate(body.memoryId, {
      new: true,
      $addToSet: {
        likes: body.userId,
      },
    })
    res.send({
      status: 200,
      message: 'Memory Updated Successfully',
      data,
    })
  } catch (error: any) {
    res.send({
      status: 500,
      message: error?.message,
    })
  }
}
