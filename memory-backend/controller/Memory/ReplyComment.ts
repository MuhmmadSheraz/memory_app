import { generateError } from './../../helper/generateError'
import { memories } from './../../model/memory'
import { Request, Response } from 'express'
export const ReplyComment = async (req: Request, res: Response) => {
  const { body } = req
  if (!body) generateError(res, 500, 'Invalid Payload')

  try {
    const query = { _id: body?.memoryId }
    const updateDocument = {
      $set: { 'comments.$[comment].replies': body?.replies },
    }
    const options = {
      arrayFilters: [
        {
          'comment.id': body?.id,
        },
      ],
    }
    const data = await memories.updateOne(query, updateDocument, options)
    res.send({
      status: 201,
      message: 'Comment Added Successfully',
      data,
    })
  } catch (error: any) {
    return generateError(res, 500, error.message)
  }
}
