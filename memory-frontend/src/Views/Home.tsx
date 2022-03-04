import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Card } from '../Componets/Card'

import { getMemories } from '../Services/API/api'
import { Memory } from '../Types/Memory'

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    refetch()
  }, [])

  const getAllMemories = () => {
    console.log('refetching...')
    return getMemories()
  }
  const { data, isError, isLoading, error, refetch } = useQuery(
    'allMemories',
    getAllMemories,

    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      enabled: true,
    }
  )
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
      <div className="min-h-screen bg-gray-100 pt-20">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2 px-2 ">
          {data?.data?.data?.map((memory: Memory) => (
            <Card key={memory._id} data={memory} handleRefetch={refetch} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
