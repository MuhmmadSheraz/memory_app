import mongoose, { Schema } from "mongoose";
 import validator from "validator"
const userSchema:Schema= new Schema({
    name:{
        type:String,
        require:[true,"name is required"],
        unique:true
        
    },
    email:{
        type:String,
        require:[true,"email is required"],
        unique:true,
        validate:validator.isEmail

    },
    profilePicture:{
        type:String,
        require:[true,"profilePicture is required"]
    },
    password:{
        type:String,
        require:[true,"password is required"],
        min:[6,"Password length in correct"]

    },
    confirmPassword:{
        type:String,
        require:[true,"confirmPassword is required"],
        min:[6,"Password length in correct"]

    },
})
export const userModal=mongoose.model("users",userSchema)