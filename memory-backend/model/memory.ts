import mongoose, { Schema } from 'mongoose'

const memorySchema: Schema = new Schema({
  title: {
    type: String,
    require: [true, 'title is required'],
  },
  description: {
    type: String,
    require: [true, 'description is required for memory'],
  },
  image: {
    type: Object,
    require: [true, 'image is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: [String],
    default: [],
  },
  tags: {
    type: [String],
    require: [true, 'tags are required'],
  },
  isPublic: {
    type: Boolean,
    require: [true, 'memory type is required public or private'],
  },
  userId: {
    type: String,
    require: [true, 'user is required'],
  },
  comments: {
    type: [
      {
        userName: String,
        userId: String,
        memoryId: String,
        id: String,
        data: String,
        replies: [],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
})

// Query Middleware for not showing any private memory in getMemories
// Here we use reg. expression for any find method or findById should not return private memory
// regex for allFind ==> /^find/
// memorySchema.pre('find', function (next) {
//   this.find({ isPublic: { $ne: false } });
//   next();
// });

// Indexing for searching
memorySchema.index({ title: 1 })

export const memories = mongoose.model('Memories', memorySchema)
