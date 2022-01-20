import mongoose, { Schema } from "mongoose"
const currentDate=new Date()
 const memorySchema:Schema=new Schema({
    title:{
        type:String,
        require:[true,"title is required"],
    },
    description:{
        type:String,
        
    },
    image:{
        type:String,
        require:[true,"image is required"]
    },
    createdAt:{
        type:Date,
        default:currentDate.getDate()
    },
    likes:{
       type:[String],
       default:[]
       
    },
    tags:{
        type:[String]
    }
})
export const memories=mongoose.model("Memories",memorySchema)