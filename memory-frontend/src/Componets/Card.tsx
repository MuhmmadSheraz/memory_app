import { BsFillBookmarkFill, BsHeartFill, BsThreeDots } from 'react-icons/bs'
import { FaComment } from 'react-icons/fa'
import dayjs from 'dayjs'
import { Memory } from '../Types/Memory'
import { useNavigate } from 'react-router-dom'
import useSession from '../Helper/useSession'
import {
  addBookmark,
  likeMemory,
  removeBookmark,
  unLikeMemory,
} from '../Services/API/api'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { showToast } from '../Helper/showToast'
interface Props {
  data: Memory
  handleRefetch: () => void
}
export const Card = ({ data, handleRefetch }: Props) => {
  const userData = useSession('user_Session', null)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)

  useEffect(() => {
    console.log({ data })
    data?.likes.find((like: string) =>
      like == userData?.user?._id ? setIsLiked(true) : null
    )
    userData?.user?.myBookmarks.find((bookmark: string) =>
      bookmark == data?._id ? setIsBookmarked(true) : null
    )
  }, [data])

  const navigate = useNavigate()
  const handleShowDetail = () => {
    navigate(`/memory/${data?._id}`)
  }

  const handleEditMemory = async (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation()
    navigate(`/create`, {
      state: {
        editable: userData?.user?._id == data?.userId ? true : false,
        data,
      },
    })
  }
  const handleLikeAction = async (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation()
    const body = {
      memoryId: data?._id,
    }
    try {
      if (data?.likes.includes(userData?.user?._id)) {
        const response = await unLikeMemory(body)

        response?.status >= 200 && setIsLiked(false)
        handleRefetch()
      } else {
        const response = await likeMemory(body)
        response?.status >= 200 && setIsLiked(true)
        handleRefetch()
      }
    } catch (error) {
      const err = error as AxiosError
      console.log(err.message)
    }
  }
  const handleBookmark = async (e: any) => {
    e.stopPropagation()
    const body = {
      memoryId: data?._id,
    }
    try {
      let response: any
      if (userData?.user?.myBookmarks.includes(data?._id)) {
        response = await removeBookmark(body)
        const userCopy = { user: response?.data?.data, token: userData?.token }
        localStorage.setItem('user_Session', JSON.stringify(userCopy))
        response?.status == 200 && setIsBookmarked(false)
      } else {
        response = await addBookmark(body)
        response?.status >= 200 && setIsBookmarked(true)
        const userCopy = { user: response.data.data, token: userData?.token }
        localStorage.setItem('user_Session', JSON.stringify(userCopy))
      }
      handleRefetch()
    } catch (error) {
      const err = error as AxiosError
      console.log(err.message)
    }
  }

  return (
    <div
      onClick={handleShowDetail}
      className="bg-white overflow-hidden  hover:bg-blue-50 rounded-3xl shadow-md drop-shadow-sm transition-all ease-in-out duration-500 hover:-translate-y-1 cursor-pointer hover:shadow-gray-200 px-1"
    >
      {/* User Header */}
      <div className="my-3 mx-2  flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="data:image/jpeg;base64,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"
            className=" h-10 w-10 rounded-full"
          />
          <div className="ml-2 text-sm">
            <h2 className="font-semibold">{data?.title}</h2>
            <h3 className="text-gray-500">
              {dayjs(data?.createdAt).format('ddd-MMM-YYYY')}
            </h3>
          </div>
        </div>
        {userData?.user?._id == data?.userId && (
          <BsThreeDots
            onClick={handleEditMemory}
            size={24}
            className="text-gray-500"
            title="edit memory"
          />
        )}
      </div>
      {/* Image */}
      <img
        className="h-48 w-full rounded-3xl"
        //@ts-ignore
        src={data?.image?.url || data.image}
      />
      <div className="my-3 mx-2 flex items-center justify-between">
        <div className="flex space-x-3 items-center">
          <BsHeartFill
            onClick={handleLikeAction}
            size={20}
            className={`text-gray-300 ${
              isLiked && 'text-red-500'
            }  hover:text-red-500 hover:scale-125 transition-all transform ease-out duration-200 cursor-pointer`}
          />
          <FaComment
            size={20}
            className="text-gray-300 hover:text-red-500 hover:scale-125 transition-all transform ease-out duration-200 cursor-pointer"
          />
        </div>
        <BsFillBookmarkFill
          onClick={handleBookmark}
          size={20}
          className={`
          ${isBookmarked ? 'text-black' : ''}
          text-gray-300 hover:text-black hover:scale-125 transition-all transform ease-out duration-200 cursor-pointer`}
        />
      </div>
      <div className="mx-2 my-3 text-sm lg:text-base">
        <p>
          Liked by
          <span className="font-semibold"> Hamza and 254 others</span>
        </p>
      </div>
      <div className="mx-2 my-3 font-semibold text-sm lg:text-base truncate  text-ellipsis overflow-hidden">
        “{data?.description}
      </div>
    </div>
  )
}
