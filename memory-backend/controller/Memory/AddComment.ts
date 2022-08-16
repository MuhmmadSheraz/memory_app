import { generateError } from './../../helper/generateError'
import { memories } from './../../model/memory'
import { Request, Response } from 'express'
export const AddComment = async (req: Request, res: Response) => {
  const { body } = req
  if (!body) generateError(res, 500, 'Invalid Payload')

  try {
    const data = await memories.findByIdAndUpdate(body.memoryId, {
      new: true,
      $addToSet: {
        comments: body,
      },
    })
    res.send({
      status: 201,
      message: 'Comment Added Successfully',
      data,
    })
  } catch (error: any) {
    return generateError(res, 500, error)
  }
}
