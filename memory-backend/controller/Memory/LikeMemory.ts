import { generateError } from './../../helper/generateError'
import { memories } from './../../model/memory'
import { Request, Response } from 'express'
export const likeMemory = async (req: Request, res: Response) => {
  const { body, headers } = req
  if (!body.memoryId) generateError(res, 500, 'Invalid Payload')

  try {
    const authToken = headers?.authorization?.split(' ')[1] || ''

    const data = await memories.findByIdAndUpdate(body.memoryId, {
      new: true,
      $addToSet: {
        likes: authToken,
      },
    })
    res.send({
      status: 200,
      message: 'Memory Liked Successfully',
      data,
    })
  } catch (error: any) {
    res.send({
      status: 500,
      message: error?.message,
    })
  }
}
