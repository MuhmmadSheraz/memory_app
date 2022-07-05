import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoCreateOutline } from 'react-icons/io5'
import { BiLockAlt, BiLogOutCircle } from 'react-icons/bi'
interface Props {
  showSidebar: boolean
  setShowSidebar: (e: boolean) => void
}
export const Sidebar = ({ showSidebar, setShowSidebar }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const handleSignout = () => {
    localStorage.removeItem('user_Session')
    navigate('/login')
  }
  console.log(location)
  return (
    <div
      className={`z-20 h-screen  bg-white w-[100vh] sm:w-[75vhsi] md:w-[50vh] lg:w-[20vw] fixed top-0 left-0 shadow-lg border-r-2 border-gray-200 ${
        showSidebar ? 'translate-x-0 overflow-hidden' : '-translate-x-full'
      } flex justify-center items-center flex-col ease-in-out duration-500 transition-all `}
    >
      <ul className="space-y-3 text-black w-full px-4 h-full   flex justify-center items-start flex-col ">
        <Link
          to={'/create'}
          onClick={() => setShowSidebar(false)}
          className={` items-center rounded-lg hover:text-white hover:bg-blue-500 text-lg hover:font-semibold cursor-pointer duration-200 bg-gray-100 w-[100%] h-12 flex justify-start px-4 ${
            location.pathname == '/create' && 'bg-blue-500 text-white'
          }`}
        >
          <IoCreateOutline className="mr-3 text-xl" />
          Create Memory
        </Link>
        <Link
          to="/private"
          className={` items-center rounded-lg hover:text-white hover:bg-blue-500 text-lg hover:font-semibold cursor-pointer duration-200 bg-gray-100 w-[100%] h-12 flex justify-start px-4 ${
            location.pathname == '/private' && 'bg-blue-500 text-white'
          }`}
          onClick={() => setShowSidebar(false)}
        >
          <BiLockAlt className="mr-3 text-xl" />
          Private Memory
        </Link>
      </ul>
      <footer className="w-full self-end justify-center bg-white">
        <hr className="bg-gray-500 text-red-200 w-full h-[2px]" />
        <p
          onClick={handleSignout}
          className={` items-center  hover:text-white hover:bg-gray-400 text-lg hover:font-semibold cursor-pointer duration-200 bg-gray-100 w-[100%]  flex justify-start p-4 `}
        >
          <BiLogOutCircle className="mr-3 text-xl" />
          Sign Out
        </p>
      </footer>
    </div>
  )
}
