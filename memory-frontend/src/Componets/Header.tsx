import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import { BiMenu, BiSearch } from 'react-icons/bi'
import { CgClose } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { searchMemory } from '../Services/API/api'
import { TailSpin } from 'react-loader-spinner'
import UseDebounce from '../Hooks/UseDebounce'
import { Memory } from '../Types/Memory'
interface Props {
  showSidebar: boolean
  setShowSidebar: (e: boolean) => void
}
export const Header = ({ showSidebar, setShowSidebar }: Props) => {
  const [searchText, setSearchText] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searhSuggestions, setSearchSuggestion] = useState<boolean>()
  const [searchResult, setSearchResults] = useState<Memory[]>([])
  const debounceSearch = UseDebounce(searchText, 2000)

  const ref = useRef<HTMLInputElement>(null)
  // Outside Click Detection
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      // @ts-ignore
      if (searhSuggestions && ref.current && !ref.current.contains(e.target)) {
        setSearchSuggestion(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [searhSuggestions])
  useEffect(() => {
    handleSearchMemory()
  }, [debounceSearch])
  useEffect(() => {
    return () => setSearchText('')
  }, [])
  const handleSearchMemory = async () => {
    try {
      setIsLoading(true)
      const response = await searchMemory(debounceSearch)
      setSearchResults(response?.data?.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  return (
    <div
      className={`z-20 flex justify-between items-center  border-blue-500 border-b-2 bg-white px-8 p-3 max-h-[20%] shadow-md fixed top-0 w-full    `}
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
      <div
        ref={ref}
        className="  xs:w-[50%] lg:w-[30%] md:flex justify-center items-center relative "
      >
        <input
          type="text"
          name="search-box"
          onChange={handleOnChange}
          onClick={() => setSearchSuggestion(true)}
          value={searchText}
          placeholder="Search Memories..."
          className=" px-4 peer  py-2 rounded-lg w-full outline-gray-400 text-lg bg-blue-50 placeholder:text-gray-500"
        />
        <BiSearch size={30} className="text-gray-500 right-2 absolute top-2" />
        <div
          className={`${
            searhSuggestions ? 'block' : 'hidden'
          } absolute top-10 w-full mt-1 bg-white scrollbar-hide z-20 max-h-[30vh] overflow-y-scroll hide    rounded-md outline-gray-400 text-lg border-2 border-t-0 border-gray-200  shadow-lg `}
        >
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
          {searchResult?.length > 0
            ? searchResult?.map((mem: Memory) => (
                <Link
                  onClick={() => setSearchSuggestion(false)}
                  to={`/memory/${mem?._id}`}
                  className="hover:bg-blue-200 text-lg w-full px-2  block py-2 cursor-pointer my-1"
                >
                  {mem?.title}
                </Link>
              ))
            : searchText !== '' && (
                <p className="text-center py-2">No Memory Found </p>
              )}
        </div>
      </div>
      <p className="hidden">
        hamburger
        {/* will add something not decided yet ! */}
      </p>
    </div>
  )
}
