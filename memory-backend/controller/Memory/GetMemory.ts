import { memories } from './../../model/memory';
import { Request, Response } from 'express';
export const getMemory=async(req:Request,res:Response)=>{
    const {params}=req;
   try {
    const data=await memories.findById(params?.id)
    res.send({
        status:200,
        data
    })
   } catch (error:any) {
    res.send({
        status:500,
        message:error?.message
    }) 
   }

}