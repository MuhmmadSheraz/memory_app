import { Link, useNavigate } from 'react-router-dom'

interface Props {
  showSidebar: boolean
  setShowSidebar: (e: boolean) => void
}
export const Sidebar = ({ showSidebar, setShowSidebar }: Props) => {
  const navigate = useNavigate()
  const handleSignout = () => {
    localStorage.removeItem('user_Session')
    navigate('/')
  }
  return (
    <div
      className={`z-20 h-screen  bg-white w-[100vh] sm:w-[75vh] md:w-[50vh] lg:w-[25vw] fixed top-0 left-0 shadow-lg border-r-2 border-gray-200 ${
        showSidebar ? 'translate-x-0 overflow-hidden' : '-translate-x-full'
      } flex justify-center items-center ease-in-out duration-500 transition-all `}
    >
      <ul className="space-y-8 text-black w-full px-4">
        <button onClick={() => setShowSidebar(!showSidebar)}>Toggle</button>
        <Link
          to={'/create'}
          onClick={() => setShowSidebar(false)}
          className="block text-xl hover:font-semibold cursor-pointer duration-200 "
        >
          Create Memory
        </Link>
        <li
          className=" text-xl hover:font-semibold cursor-pointer duration-200 "
          onClick={() => setShowSidebar(false)}
        >
          Private Memory
        </li>
        <li
          onClick={handleSignout}
          className=" text-xl hover:font-semibold cursor-pointer duration-200  items-end"
        >
          Sign Out
        </li>
      </ul>
    </div>
  )
}
