import { tokenDecoder } from './../../helper/tokenDecoder'
import { memories } from './../../model/memory'
import { Response, Request } from 'express'
import cloudinary from 'cloudinary'
export const createMemory = async (req: Request, res: Response) => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_API_SECRET,
  })
  const { body, headers } = req

  const file = req?.files?.image
  try {
    const authToken = headers?.authorization?.split(' ')[1] || ''
    const { id } = tokenDecoder(authToken)

    let memBody: any = { ...body }
    memBody.tags = JSON.parse(body?.tags)
    memBody.userId = id
    await cloudinary.v2.uploader?.upload(
      // @ts-ignore
      file?.tempFilePath,
      {
        folder: 'memories',
      },
      function (error: any, result: any) {
        if (error) {
          console.log('err', error)
        } else {
          console.log('result***', result)
          memBody.image = {
            public_id: result.public_id,
            url: result.url,
          }
        }
      }
    )
    await memories.create(memBody)

    console.log('body', memBody)
    res.send({
      status: 201,
      message: 'success',
      data: {},
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.send({
      status: 500,
      message: error?.message,
    })
  }
}
