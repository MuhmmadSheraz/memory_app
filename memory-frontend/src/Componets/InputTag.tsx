import { IoMdClose } from 'react-icons/io'
interface Props {
  title: string
  onRemove?: (e: string) => void | null
}
export const InputTag = ({ title, onRemove }: Props) => {
  return (
    <div className="m-1  text-xs inline-flex relative items-center font-bold leading-sm uppercase px-2 sm:px-3 py-2 bg-blue-200 text-blue-500 rounded-md">
      {title}
      {onRemove && (
        <span
          onClick={() => onRemove(title)}
          className="text-white z-10 block bg-red-500 text-center cursor-pointer  h-5 w-5 ml-1 sm:ml-4 p-1 pt-[2px] rounded-full"
        >
          <IoMdClose />
        </span>
      )}
    </div>
  )
}
