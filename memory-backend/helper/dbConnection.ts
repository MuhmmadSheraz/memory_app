import mongoose from 'mongoose';
export const connectDB = () => {
  try {
    mongoose.connect(
      `mongodb+srv://demouser:demouser1231456@cluster0.3juuo.mongodb.net/MemoryApp?retryWrites=true&w=majority`,
      {
        // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log('Mongo-DB Connected Successfully ✔');
  } catch (err) {
    console.log('Mongo DB Cofig Failed');
  }
};
