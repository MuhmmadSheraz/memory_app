import { BiMenu, BiSearch } from 'react-icons/bi'
import { CgClose } from 'react-icons/cg'
import { Link } from 'react-router-dom'
interface Props {
  showSidebar: boolean
  setShowSidebar: (e: boolean) => void
}
export const Header = ({ showSidebar, setShowSidebar }: Props) => {
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
          placeholder="Search Memories..."
          className=" px-4  py-2 rounded-lg w-full outline-gray-400 text-lg bg-blue-50 placeholder:text-gray-500"
        ></input>
        <BiSearch size={30} className="text-gray-500 right-2 absolute" />
      </div>
      <p className="block md:hidden">
        hamburger
        {/* will add something not decided yet ! */}
      </p>
    </div>
  )
}
