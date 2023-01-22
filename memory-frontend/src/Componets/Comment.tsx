import dayjs from 'dayjs'
import { KeyboardEvent, useRef, useState } from 'react'
interface Props {
  value: CommentBody
  handlePostReply: any
  user: any
}
interface CommentBody {
  parentIds: [number] | null
  id: number
  data: string
  replies: [CommentBody]
  handlePostReply: any
  createdAt: any
  userName: string
}
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
const Comment = ({ user, value, handlePostReply }: Props) => {
  const date = value?.createdAt ? new Date(value.createdAt) : new Date()
  const [replyInput, setReplyInput] = useState<boolean>(false)
  const replyInputRef = useRef<any>()

  const handlReply = (text: string) => {
    const parentIds: number[] | null = value.parentIds || []
    parentIds.push(value.id)
    let replyBody = {
      userName: user?.name,
      userId: user?._id,
      parentIds,
      id: Math.floor(Math.random() * 200),
      data: text,
      replies: [],
    }
    handlePostReply(parentIds, replyBody)
  }

  //@ts-ignore
  console.log(value.createdAt)
  return (
    <div
      className="flex justify-start  flex-row w-full p-2 rounded-md my-2 border-black"
      onClick={() => console.log({ value })}
    >
      <img
        className="h-10 w-10 rounded-full mr-4"
        src={
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80'
        }
      />
      {/*Content*/}
      <div className="flex flex-col flex-wrap w-full">
        {/* Name and time */}
        <div className="flex items-center justify-start">
          <p className="mr-2 font-semibold text-lg">{value?.userName}</p>
          {/* @ts-ignore */}
          <p>{dayjs(date).fromNow()}</p>
        </div>
        {/* Comment */}
        <div className="max-w-full text-lg ">{value?.data}</div>
        <button
          onClick={() => {
            if (replyInput) {
              setReplyInput(false)
            } else {
              setReplyInput(true)
              setTimeout(() => {
                replyInputRef.current.focus()
              }, 10)
            }
          }}
          className="rounded-full p-1 my-2 text-base text-center bg-white border-blue-300 border-2 text-blue-300 w-24 cursor-pointer hover:bg-blue-500 hover:text-white"
        >
          reply
        </button>
        {replyInput && (
          <textarea
            ref={replyInputRef}
            onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key == 'Enter') {
                setReplyInput(false)
                // @ts-ignore
                handlReply(e.target.value)
              }
            }}
            placeholder="Enter your reply"
            className="bg-white w-full text-gray-600 p-2 my-2 rounded-md outline-none focus:border-2 focus:border-blue-300"
          />
        )}
        <div className="w-full border-l-4">
          {value?.replies?.length > 0 &&
            value?.replies?.map((reply) => (
              <Comment
                user={user}
                key={reply.id}
                value={reply}
                handlePostReply={handlePostReply}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Comment
