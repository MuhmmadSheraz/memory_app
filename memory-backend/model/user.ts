import mongoose, { Schema } from "mongoose";
 import validator from "validator"
 import bcrypt from "bcrypt"
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
        minlength:6

    },
    confirmPassword:{
        type:String,
        required:[true,"confirmPassword is required"],
        minlength:6,
        

    },
})
// Middleware for password confirmation
userSchema.pre('validate', function(next) {
    if (this.confirmPassword&&(this.password !== this.confirmPassword)) {
        this.invalidate('passwordConfirmation', 'enter the same password');
    }
    next();
});

// Password hashing using middleware
userSchema.pre("save",async function(next){
    // do not has hashed the password if it's not modified or newly created
    if(!this.isModified("password"))return next()
    this.password=await bcrypt.hash(this.password,10)
    this.confirmPassword=undefined
    next()
})
export const userModal=mongoose.model("users",userSchema)