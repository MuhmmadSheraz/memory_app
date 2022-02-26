import { memories } from './../../model/memory'
import { Request, Response } from 'express'
export const getAllPrivateMemories = async (req: Request, res: Response) => {
  try {
    let data = await memories.find({ isPublic: { $eq: false } })

    console.log(req.query.tags)
    res.send({
      status: 'success',
      length: data?.length,
      data,
    })
  } catch (error: any) {
    res.send({
      status: 500,
      message: error?.message,
    })
  }
}
