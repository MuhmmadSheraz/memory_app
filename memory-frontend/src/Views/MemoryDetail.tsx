import dayjs from 'dayjs'
import {
  BsFillBookmarkFill,
  BsHeartFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs'
import { TailSpin } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { InputTag } from '../Componets/InputTag'
import { getMemory } from '../Services/API/api'

const MemoryDetail = () => {
  const navigate = useNavigate()
  let { id } = useParams()
  const { data, isLoading } = useQuery(['memories', id], () => {
    return getMemory(id ? id : '')
  })
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 flex justify-center items-center">
        <TailSpin height="30" width="30" color="green" ariaLabel="loading" />
      </div>
    )
  }
  return (
    <div className="flex  flex-col md:flex-row">
      <img
        className="h-[50vh] md:min-h-screen w-full md:w-1/2"
        src={data?.data?.data?.image}
      />
      <BsFillArrowLeftCircleFill
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 bg-transparent text-gray-100 cursor-pointer hover:text-black transition-all ease-in-out duration-100"
        size={40}
      />
      <div className="flex flex-col mt-2 px-3 lg:px-5 w-full md:w-1/2 mb-2">
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
          <InputTag title="Beautiful" />
          <InputTag title="Beautiful" />
          <InputTag title="Beautiful" />
          <InputTag title="Beautiful" />
          <InputTag title="Beautiful" />
          <InputTag title="Beautiful" />
        </div>
        <div className="flex items-center justify-between mt-5">
          <div className="flex space-x-4 items-center">
            <BsHeartFill
              size={24}
              className="text-gray-300 hover:text-red-500 hover:scale-125 transition-all transform ease-out duration-200 cursor-pointer"
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
