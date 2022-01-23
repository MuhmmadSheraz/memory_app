import { userModal } from './../../model/user';
import { Request, Response } from "express";

export const signUp=async(req:Request,res:Response)=>{
   try {
    await userModal.create(req.body)
    console.log(req.body)
    res.send({
        status:200,
        message:"user created Successfully"
    })
   } catch (error:any) {
    res.send({
        status:500,
        message:error.message
    })
   }
}