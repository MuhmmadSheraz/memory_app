import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import {
  BsFillBookmarkFill,
  BsHeartFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs'
import { TailSpin } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { InputTag } from '../Componets/InputTag'
import useSession from '../Helper/useSession'
import { getMemory, likeMemory, unLikeMemory } from '../Services/API/api'

const MemoryDetail = () => {
  const navigate = useNavigate()
  let { id } = useParams()
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const { user } = useSession('user_Session', null)
  useEffect(() => {
    data?.data?.data?.likes.find((like: string) =>
      like == user?._id ? setIsLiked(true) : null
    )
  }, [])
  const handleGetMemory = (id: string) => {
    return getMemory(id)
  }
  const { data, isLoading, refetch } = useQuery(['memories', id], () => {
    return handleGetMemory(id ? id : '')
  })
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
  return (
    <div className="flex  flex-col md:flex-row mt-[2p] xmd:mt-2">
      <div className="w-full md:w-1/2">
        <img
          className="h-[50vh] md:min-h-screen w-full md:w-1/2 md:fixed top-0 left-0"
          src={data?.data?.data?.image}
        />
        <BsFillArrowLeftCircleFill
          onClick={() => navigate(-1)}
          className="hidden md:absolute  md:top-5 left-5 bg-transparent text-gray-100 cursor-pointer hover:text-black transition-all ease-in-out duration-100"
          size={40}
        />
      </div>
      <div className="flex flex-col mt-4 md:mt-16 px-3 lg:px-5 w-full md:w-1/2  mb-2 ">
        <h1 className="text-3xl lg:text-4xl font-semibold text-center mt-5">
          {data?.data?.data?.title}
        </h1>
        <h3 className="text-base lg:text-lg mt-5 text-clip">
          {data?.data?.data?.description}
        </h3>
        <p className="text-right">
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
            <div className="mx-2 my-3 text-sm lg:text-base">
              <p>
                Liked by
                <span className="font-semibold"> Hamza and 254 others</span>
              </p>
            </div>
          </div>
          <BsFillBookmarkFill
            size={24}
            className="text-gray-300 hover:text-red-500 hover:scale-125 transition-all transform ease-out duration-200 cursor-pointer"
          />
        </div>
        {/* Add UI Comments later */}
        <div className="mt-20 font-semibold text-center text-cyan-500">
          <h1>Comments Comming Soon...</h1>
        </div>
      </div>
    </div>
  )
}

export default MemoryDetail
