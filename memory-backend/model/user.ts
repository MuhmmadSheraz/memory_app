import mongoose, { Schema } from "mongoose";
 import validator from "validator"
 import bcrypt from "bcrypt"
 export interface User extends Document {
    name: string,
    profilePicture: string,
    email: string,
    password: string,
    confirmPassword: string,
    correctPassword:(candidatePassword:string,userPassword:string)=>boolean
}
const userSchema:Schema= new Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        validate:validator.isEmail

    },
    profilePicture:{
        type:String,
        required:[true,"profilePicture is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:6,
        select:false
        
    },
    confirmPassword:{
        type:String,
        required:[true,"confirmPassword is required"],
        minlength:6,
        select:false
        

    },
})


// Middleware for password confirmation
userSchema.pre('validate', function(next) {
    if (this.confirmPassword&&(this.password !== this.confirmPassword)) {
        this.invalidate('passwordConfirmation', 'enter the same password');
    }
    next();
});


// Middleware for authenticate password

// Password hashing using middleware
userSchema.pre("save",async function(next){
    // do not has hashed the password if it's not modified or newly created
    if(!this.isModified("password"))return next()
    this.password=await bcrypt.hash(this.password,10)
    this.confirmPassword=undefined
    next()
})
userSchema.methods.correctPassword=async function (candidatePassword:string,userPassword:string) {
    return await bcrypt.compare(candidatePassword,userPassword)
   
}
export const userModal=mongoose.model<User & mongoose.Document>("users",userSchema)