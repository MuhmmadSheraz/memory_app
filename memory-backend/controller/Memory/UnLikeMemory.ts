import { generateError } from './../../helper/generateError'
import { memories } from './../../model/memory'
import { Request, Response } from 'express'
import { tokenDecoder } from '../../helper/tokenDecoder'
export const unLikeMemory = async (req: Request, res: Response) => {
  const { body, headers } = req
  if (!body.memoryId) generateError(res, 500, 'Invalid Payload')

  try {
    const authToken = headers?.authorization?.split(' ')[1] || ''
    const { id } = tokenDecoder(authToken)
    const data = await memories.findByIdAndUpdate(body.memoryId, {
      new: true,
      $pull: {
        likes: id,
      },
    })
    res.send({
      status: 200,
      message: 'Memory un-liked Successfully',
      data,
    })
  } catch (error: any) {
    res.send({
      status: 500,
      message: error?.message,
    })
  }
}
