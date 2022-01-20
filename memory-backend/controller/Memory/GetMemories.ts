import { memories } from './../../../model/memory';
import { Request,Response} from "express"
export const getAllMemories=async(req:Request,res:Response,)=>{
    try {
        const data=await memories.find()
        res.send({
            status: 'success',
            length:data?.length,
            data
        });
    } catch (error:any) {
        res.send({
            status:500,
            message:error?.message
        })


    }

}