import { memories } from './../../model/memory';
import { Request, Response } from 'express';
export const updateMemory = async (req: Request, res: Response) => {
  const { params, body } = req;
  console.log(params?.id);
  console.log(body);
  try {
    const data = await memories.findByIdAndUpdate(params?.id, body);
    res.send({
      status: 200,
      message: 'Memory Updated Successfully',
      data
    });
  } catch (error: any) {
    res.send({
      status: 500,
      message: error?.message
    });
  }
};
