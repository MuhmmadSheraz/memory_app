import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModal } from './../../model/user';
export const signUp=async(req:Request,res:Response)=>{
   try {
  const newUser=await userModal.create({
        name:req.body.name,
        email:req.body.email,
        profilePicture:req.body.profilePicture,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        
    })
    const token=jwt.sign({id:newUser._id},process.env.JWT_SECRECT||"",{
        expiresIn:process.env.JWT_EXPIRY
    })
    res.send({
        status:200,
        token,
        data:{
            newUser
        },
        message:"user created Successfully"
    })
   } catch (error:any) {
    res.send({
        status:500,
        message:error.message
    })
   }
}