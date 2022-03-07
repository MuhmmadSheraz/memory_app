import { tokenDecoder } from './../../helper/tokenDecoder'
import { generateError } from './../../helper/generateError'
import { Request, Response } from 'express'
import { User, userModal } from './../../model/user'

export const removeBookmark = async (req: Request, res: Response) => {
  const {
    body: { memoryId },
    headers,
  } = req
  const authToken = headers?.authorization?.split(' ')[1] || ''
  const { id } = tokenDecoder(authToken)
  try {
    if (!memoryId) return generateError(res, 500, 'memory id is required')
    let user: User | any = await userModal.findByIdAndUpdate(id, {
      new: true,
      $pull: {
        myBookmarks: memoryId,
      },
    })
    if (!user) return generateError(res, 500, 'un-authorize request')
    const updatedBookmarks = user?.myBookmarks.filter(
      (bookmark: string) => bookmark != memoryId
    )
    user.myBookmarks = updatedBookmarks
    res.send({
      status: 200,
      message: 'bookmark removed Successfully',
      data: user,
    })
  } catch (error) {
    const err = error as any
    return generateError(res, 500, err?.message)
  }
}
