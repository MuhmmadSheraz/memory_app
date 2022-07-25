import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { BsFillBookmarkFill, BsHeartFill } from 'react-icons/bs'
import { TailSpin } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Comment from '../Componets/Comment'
import { InputTag } from '../Componets/InputTag'
import useSession from '../Helper/useSession'
import {
  addBookmark,
  getMemory,
  likeMemory,
  removeBookmark,
  unLikeMemory,
} from '../Services/API/api'
import { demoComments } from '../todo'

const MemoryDetail = () => {
  let { id } = useParams()
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isBookmarked, setIsBookmarked] = useState<boolean | null>(false)
  const { user, token } = useSession('user_Session', null)
  const [comment, setComment] = useState('')
  const [allComments, setAllComments] = useState<any[]>(demoComments)
  const handleGetMemory = (id: string) => {
    return getMemory(id)
  }

  const { data, isLoading, refetch } = useQuery(
    ['memories', id],
    () => handleGetMemory(!!id ? id : ''),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      enabled: true,
    }
  )
  useEffect(() => {
    data?.data?.data?.likes.find((like: string) =>
      like == user?._id ? setIsLiked(true) : null
    )
    user?.myBookmarks?.includes(id)
      ? setIsBookmarked(true)
      : setIsBookmarked(false)
  }, [data?.data?.data])
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 flex justify-center items-center">
        <TailSpin height="30" width="30" color="green" ariaLabel="loading" />
      </div>
    )
  }
  const handleLikeAction = async (e: any) => {
    e.stopPropagation()
    const body = {
      memoryId: data?.data?.data?._id,
    }
    try {
      if (data?.data?.data?.likes.includes(user?._id)) {
        const response = await unLikeMemory(body)
        response?.data && setIsLiked(false)
        refetch()
      } else {
        const response = await likeMemory(body)
        response?.data && setIsLiked(true)
        refetch()
      }
    } catch (error) {
      const err = error as AxiosError
      console.log(err.message)
    }
  }
  const handleBookmarkAction = async (e: any) => {
    e.stopPropagation()
    const body = {
      memoryId: data?.data?.data?._id,
    }
    try {
      let response: any
      if (isBookmarked) {
        response = await removeBookmark(body)
        const userCopy = { user: response?.data?.data, token: token }
        localStorage.setItem('user_Session', JSON.stringify(userCopy))
        response?.status == 200 && setIsBookmarked(false)
      } else {
        response = await addBookmark(body)
        response?.status >= 200 && setIsBookmarked(true)
        const userCopy = { user: response.data.data, token: token }
        localStorage.setItem('user_Session', JSON.stringify(userCopy))
      }
    } catch (error) {
      const err = error as AxiosError
      console.log(err.message)
    }
  }
  const handlePostComment = () => {
    let commentBody = {
      parentIds: null,
      id: Math.floor(Math.random() * 200),
      data: comment,
      replies: [],
    }
    setAllComments([...allComments, commentBody])
    setComment('')
  }
  const a = (parentIds: [number], replyBody: any) => {
    // 1 id single reply
    // 2 id single reply ==> reply

    let commentIndex: any

    console.log({ parentIds, replyBody })
    const cloneComments = [...allComments]
    // const commentIndex = cloneComments.findIndex(
    //   (com: any) => com?.id == parentIds[0]
    // )
    let currentComment: any
    for (let index = 0; index < parentIds.length; index++) {
      // commentIndex = cloneComments.findIndex(
      //   (com: any) => com?.id == parentIds[0]
      // )
    }
    // console.log(cloneComments)
    // console.log(cloneComments[commentIndex])
    cloneComments[commentIndex].replies.unshift(replyBody)
    setAllComments(cloneComments)
  }
  const handlePostReply = (parentIds: Number[], replyBody: any) => {
    console.log('Parent Length', parentIds)
    const cloneComments = [...allComments]
    let parentComment: any
    let parentCommentId = parentIds[0]
    parentComment = cloneComments.findIndex(
      (com: any) => com?.id == parentCommentId
    )

    console.log(parentComment)
    if (parentIds.length == 1) {
      cloneComments[parentComment].replies.unshift(replyBody)
    }
    if (parentIds.length > 1) {
      console.log('else', parentIds, parentComment)
      let replyId: any = parentIds[1]
      console.log(cloneComments[parentComment].replies, replyId)
      const repIndex = cloneComments[parentComment].replies.findIndex(
        (repI: any) => repI.id == replyId
      )
      console.log(cloneComments[parentComment].replies[repIndex], repIndex)
      cloneComments[parentComment].replies[repIndex].replies.unshift(replyBody)
    }
    setAllComments(cloneComments)
  }
  return (
    <div className="flex  flex-col md:flex-row mt-[2p] xmd:mt-2 pb-4">
      <div className="w-full md:w-1/2">
        <img
          className="h-[50vh] md:min-h-screen w-full md:w-1/2 md:fixed top-0 left-0"
          src={data?.data?.data?.image.url || data?.data?.data?.image}
        />
      </div>
      <div className="flex flex-col mt-4 md:mt-16 px-3 lg:px-5 w-full md:w-1/2  mb-2   ">
        <h1 className="text-3xl lg:text-4xl font-semibold text-center mt-5">
          {data?.data?.data?.title}
        </h1>
        <h3 className="text-base lg:text-lg mt-5 text-clip">
          {data?.data?.data?.description}
        </h3>
        <p className="text-right mt-4">
          {dayjs(data?.data?.data?.createdAt).format('ddd-MMM-YYYY')}
        </p>
        <div className="mt-5">
          {data?.data?.data?.tags?.map((tag: string, index: number) => (
            <InputTag title={tag} key={tag + index} />
          ))}
        </div>
        <div className="flex items-center justify-between mt-5">
          <div className="flex space-x-4 items-center">
            <BsHeartFill
              size={24}
              onClick={handleLikeAction}
              className={`text-gray-300 ${
                isLiked && 'text-red-500'
              }  hover:text-red-500 hover:scale-125 transition-all transform ease-out duration-200 cursor-pointer`}
            />
            {data?.data?.data?.likes.length > 0 && (
              <div className="mx-2 my-3 text-sm lg:text-base">
                <p>
                  Liked by
                  <span className="font-semibold">
                    {' '}
                    {isLiked && 'You'}{' '}
                    {isLiked
                      ? `and ${data?.data?.data?.likes?.length - 1}`
                      : data?.data?.data?.likes?.length}{' '}
                    others.
                  </span>
                </p>
              </div>
            )}
          </div>
          <BsFillBookmarkFill
            size={24}
            onClick={handleBookmarkAction}
            className={`${
              isBookmarked ? 'text-black' : 'text-gray-300'
            }  hover:text-black hover:scale-125 transition-all transform ease-out duration-200 cursor-pointer`}
          />
        </div>
        {/* Add UI Comments */}
        <div className="mt-10 h-[100%] flex justify-center flex-col w-full">
          <hr />
          <h1 className="text-left text-2xl font-semibold  self-start my-4">
            Comments
          </h1>
          {/* Comment Input */}
          <div className="border-blue-400 border-2 w-5/6 rounded-lg flex flex-col min-h-[20px]">
            <textarea
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              name="comment"
              rows={3}
              className=" outline-none w-full py-6 px-4 text-base scrollbar-hide"
            />
            <button
              onClick={handlePostComment}
              className="outline-none text-center text-white hover:bg-blue-600 text-lg py-2 px-2 items-center justify-center m-2 bg-blue-500  rounded flex  self-end w-1/4"
            >
              Post
            </button>
          </div>
          <div className="mt-4 self-start w-full">
            {allComments?.map((com) => (
              // @ts-ignore
              <Comment
                key={com.id}
                value={com}
                handlePostReply={handlePostReply}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemoryDetail
