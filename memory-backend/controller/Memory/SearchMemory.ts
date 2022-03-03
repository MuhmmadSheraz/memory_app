import { memories } from './../../model/memory'
import { Request, Response } from 'express'
export const searchMemory = async (req: Request, res: Response) => {
  const query = {
    $search: 'Pop',
  }

  try {
    const data = await memories.find(query)
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
