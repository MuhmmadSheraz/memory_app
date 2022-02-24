import { memories } from './../../model/memory';
import { Response } from 'express';
import cloudinary from 'cloudinary'
export const createMemory = async (req: any, res: Response) => {
  cloudinary.v2.config({
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API, 
        api_secret: process.env.CLOUD_API_SECRET
    })
  const {body}: any = req;
 
  const file = req.files.image
  try {
    let memBody={...body}
    memBody.tags=JSON.parse(body.tags)
    await cloudinary.v2.uploader?.upload(file.tempFilePath,{
      folder:"memories"
    },function(error:any, result:any){
      if(error){
        console.log("err",error)
      }
      else{
        console.log("result",result)
      memBody.image=result.url
      }
    });
    await memories.create(memBody);
   
    console.log("body***",memBody)
  res.send({
    status: 201,
    message: 'success',
    data: {}
  });
  } catch (error:any) {
    console.log("error",error.message)
    res.send({
      status: 500,
      message: error?.message
      
    });
  }
};
