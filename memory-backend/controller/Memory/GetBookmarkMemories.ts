import { memories } from './../../model/memory'
import { Request, Response } from 'express'
export const getAllBookmarkMemories = async (req: Request, res: Response) => {
  const { params } = req
  try {
    const ids = params.ids?.split(',')
    console.log(params)
    let data = await memories.find({
      isPublic: { $eq: true },
      _id: { $in: ids },
    })

    res.send({
      status: 'success',
      length: data?.length,
      data: data,
    })
  } catch (error: any) {
    res.send({
      status: 500,
      message: error?.message,
    })
  }
}
