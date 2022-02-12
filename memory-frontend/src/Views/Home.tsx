import { TailSpin } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Card } from '../Componets/Card'
import { Header } from '../Componets/Header'
import { getMemories } from '../Services/API/api'
import { Memory } from '../Types/Memory'
const Home = () => {
  const getAllMemories = () => {
    return getMemories()
  }
  const { data, isError, isLoading } = useQuery('allMemories', getAllMemories)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 flex justify-center items-center">
        <TailSpin height="30" width="30" color="green" ariaLabel="loading" />
      </div>
    )
  }
  if (isError) {
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
            <Card key={memory._id} data={memory} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
