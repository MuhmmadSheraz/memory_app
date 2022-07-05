import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Card } from '../Componets/Card'
import useSession from '../Helper/useSession'

import { getAllBookmarkMemories } from '../Services/API/api'
import { Memory } from '../Types/Memory'

const BookmarkMemories = () => {
  const { user } = useSession('user_Session', null)
  const navigate = useNavigate()
  const getAllMemories = () => {
    return getAllBookmarkMemories(user?.myBookmarks)
  }
  const { data, isError, isLoading, error, refetch } = useQuery(
    ['bookmarkMemories'],
    getAllMemories,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      enabled: false,
    }
  )
  useEffect(() => {
    console.log({ user })
    refetch()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 flex justify-center items-center">
        <TailSpin height="30" width="30" color="green" ariaLabel="loading" />
      </div>
    )
  }
  if (isError) {
    const err = error as AxiosError
    if (err?.response?.data.message === 'Invalid Token') {
      localStorage.removeItem('user_Session')
      navigate('/login')
    }
    return (
      <div className="min-h-screen bg-gray-100 pt-20">
        <h1 className="text-center text-4xl">Something went wrong ☹</h1>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 pt-20 w-[100vw]">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2 px-2 ">
          {data?.data?.data?.map(
            (memory: Memory) =>
              user?.myBookmarks.includes(memory?._id) && (
                <Card handleRefetch={refetch} key={memory._id} data={memory} />
              )
          )}
          {!data?.data?.data?.length && (
            <h2 className="text-center w-[98vw] flex justify-center items-center font-semibold text-2xl h-[85vh]">
              No Bookmarked Memory Added 😌
            </h2>
          )}
        </div>
      </div>
    </>
  )
}

export default BookmarkMemories
