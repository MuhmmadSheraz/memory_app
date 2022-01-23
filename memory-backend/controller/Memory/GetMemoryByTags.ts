import { memories } from './../../model/memory';
import { Request, Response } from 'express';
export const getMemoryByTag = async (req: Request, res: Response) => {
  let data: any;
  try {
    const tag:string|any=req.query?.tag
    const tagsArray=tag.split(",").map((tg:string)=>tg)
    //  data=await memories.find({tags:[tag]}) // for one tag 
     data=await memories.find({tags:{ $in: tagsArray }}) // for all tag 
    res.send({
      status: 'success',
      length: data?.length,
      data,
    });
  } catch (error:any) {
    res.send({
      status: 500,
      message: error?.message,
    });
  }
};
