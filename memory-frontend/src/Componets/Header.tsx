import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { BiMenu, BiSearch } from 'react-icons/bi'
import { CgClose } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { searchMemory } from '../Services/API/api'
import { TailSpin } from 'react-loader-spinner'
interface Props {
  showSidebar: boolean
  setShowSidebar: (e: boolean) => void
}
export const Header = ({ showSidebar, setShowSidebar }: Props) => {
  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    return () => setSearchText('')
  }, [])
  const { data, isLoading, refetch } = useQuery(
    ['search-memories', searchText],

    () => {
      return searchMemory(searchText ? searchText : '')
    },
    {
      refetchOnWindowFocus: false,
      retryOnMount: false,
    }
  )
  console.log({ data })
  return (
    <div
      className={`z-20 flex justify-between items-center bg-white px-8 p-3 max-h-[20%] shadow-md fixed top-0 w-full    `}
    >
      <div className="flex items-center space-x-4 ">
        {!showSidebar ? (
          <BiMenu
            size={24}
            className="cursor-pointer -ml-4 duration-500 transition-all ease-in-out"
            onClick={() => setShowSidebar(true)}
          />
        ) : (
          <CgClose
            size={24}
            className="cursor-pointer -ml-4 duration-500 transition-all ease-in-out"
            onClick={() => setShowSidebar(false)}
          />
        )}
        <Link
          to="/"
          className=" text-2xl font-semibold text-black-500 pb-[0.5%] cursor-pointer"
        >
          Memory App
        </Link>
      </div>
      <div className=" hidden sm:w-[50%] lg:w-[30%] md:flex justify-center items-center relative ">
        <input
          type="text"
          name="search-box"
          onChange={(e) => {
            setSearchText(e.target.value)
            e.target.value !== '' && refetch()
          }}
          value={searchText}
          placeholder="Search Memories..."
          className=" px-4 peer  py-2 rounded-lg w-full outline-gray-400 text-lg bg-blue-50 placeholder:text-gray-500"
        />
        <BiSearch size={30} className="text-gray-500 right-2 absolute" />
        <div className="peer-focus:block hidden absolute top-10 w-full mt-1 bg-white z-20    rounded-md outline-gray-400 text-lg border-2 border-t-0 border-gray-200  shadow-lg ">
          {searchText == '' && (
            <p className="text-center py-2">Type Something</p>
          )}
          {isLoading && (
            <p className="text-center py-2 flex justify-center ">
              <TailSpin
                height="30"
                width="30"
                color="green"
                ariaLabel="loading"
              />
            </p>
          )}
          {data?.data?.data?.map((mem: any) => (
            <Link
              to={`/memory/${mem?._id}`}
              className="hover:bg-blue-200 text-lg w-full px-2  block py-2 cursor-pointer my-1"
            >
              {mem?.title}
            </Link>
          ))}
        </div>
      </div>
      <p className="block md:hidden">
        hamburger
        {/* will add something not decided yet ! */}
      </p>
    </div>
  )
}
