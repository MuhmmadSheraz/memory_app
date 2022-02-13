import mongoose, { Schema } from 'mongoose';
const currentDate = new Date();
const memorySchema: Schema = new Schema({
  title: {
    type: String,
    require: [true, 'title is required']
  },
  description: {
    type: String,
    require: [true, 'description is required for memory']
  },
  image: {
    type: String,
    require: [true, 'image is required']
  },
  createdAt: {
    type: Date,
    default: currentDate.getDate()
  },
  likes: {
    type: [String],
    default: []
  },
  tags: {
    type: [String],
    require: [true, 'tags are required']
  },
  isPublic: {
    type: Boolean,
    require: [true, 'memory type is required public or private']
  },
  userId:{
    type:String,
    require: [true, 'user is required']
  }
});

// Query Middleware for not showing any private memory in getMemories
// Here we use reg. expression for any find method or findById should not return private memory
// regex for allFind ==> /^find/
memorySchema.pre('find', function (next) {
  this.find({ isPublic: { $ne: false } });
  next();
});
export const memories = mongoose.model('Memories', memorySchema);
