import { memories } from './../../model/memory';
import { Response,Request } from 'express';
export const createMemory = async(req:Request,res:Response)=>{
const {body}:any=req

await memories.create(body)
    res.send({
        status:201,
        message:"success",
        data:{
            body
        }
    })

}
