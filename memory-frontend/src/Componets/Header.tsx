import {BiSearch} from "react-icons/bi"

export const Header = () => {
  return (
      <div className='flex justify-between items-center bg-red-200 min-w-screen px-8 p-3 max-h-[20%] '>
          <h1 className=' text-2xl font-semibold text-red-500 pb-[0.5%]'>Memory App</h1>
        <div className=" hidden sm:w-[50%] lg:w-[30%] md:flex justify-center items-center relative">
        <input type="text" name="search-box" placeholder='Search Memories...'  className=' px-4  py-2 rounded-lg w-full outline-red-400 text-lg' >
          </input>
          <BiSearch size={30} className="text-red-500 right-2 absolute"/>
        </div>
       <p className="block md:hidden">
           hamburger
           {/* will add something not decided yet ! */}
       </p>
          
      </div>
  )
};
