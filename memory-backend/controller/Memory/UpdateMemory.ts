import { memories } from './../../model/memory'
import { Request, Response } from 'express'
import { tokenDecoder } from '../../helper/tokenDecoder'
import cloudinary from 'cloudinary'
export const updateMemory = async (req: Request, res: Response) => {
  const { params, body, headers } = req
  console.log('body***', body)
  cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_API_SECRET,
  })
  try {
    const authToken = headers?.authorization?.split(' ')[1] || ''
    const { id } = tokenDecoder(authToken)
    const data = await memories.find({ id: body._id, userId: id })
    console.log('data***', data)
    if (data?.length > 0) {
      const tempMemory = { ...body }
      const file = req?.files?.image
      await cloudinary.v2.uploader?.upload(
        // @ts-ignore
        file?.tempFilePath,
        {
          folder: 'memories',
          public_id: body.public_id,
          secure: true,
        },
        function (error: any, result: any) {
          if (error) {
            res.send({
              status: 500,
              message: error?.message,
            })
          } else {
            console.log('result***', result)
            tempMemory.image = {
              public_id: result.public_id,
              url: result.url,
            }
          }
        }
      )
      const updatedMemory = await memories.findByIdAndUpdate(
        body._id,
        tempMemory
      )
      res.send({
        status: 200,
        message: 'Memory Updated Successfully',
        data: updatedMemory,
      })
    }
  } catch (error: any) {
    res.send({
      status: 500,
      message: error?.message,
    })
  }
}
