import { tokenDecoder } from './../../helper/tokenDecoder'
import { memories } from './../../model/memory'
import { Request, Response } from 'express'
export const getAllPrivateMemories = async (req: Request, res: Response) => {
  const {
    headers: { authorization },
  } = req
  const authToken = authorization?.split(' ')[1] || ''
  try {
    const { id } = tokenDecoder(authToken)
    let data = await memories.find({
      isPublic: { $eq: false },
      userId: id,
    })
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
