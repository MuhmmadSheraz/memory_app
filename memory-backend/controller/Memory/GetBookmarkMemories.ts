import { memories } from './../../model/memory'
import { Request, Response } from 'express'
export const getAllBookmarkMemories = async (req: Request, res: Response) => {
  const { params } = req
  try {
    const ids = params.ids.split(',')
    let response = await memories.find({
      isPublic: { $eq: true },
      _id: { $in: ids },
    })

    res.send({
      status: 'success',
      length: response?.length,
      response: response,
    })
  } catch (error: any) {
    res.send({
      status: 500,
      message: error?.message,
    })
  }
}
