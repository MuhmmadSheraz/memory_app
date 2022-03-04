import { memories } from './../../model/memory'
import { Request, Response } from 'express'
export const searchMemory = async (req: Request, res: Response) => {
  try {
    const searchTerm: any = req?.query?.searchText || ''
    const data = await memories.find({
      $text: { $search: searchTerm },
    })

    res.send({
      status: 200,
      data,
    })
  } catch (error: any) {
    res.send({
      status: 500,
      message: error?.message,
    })
  }
}
