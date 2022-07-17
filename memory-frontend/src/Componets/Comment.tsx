import { KeyboardEvent, useEffect, useRef, useState } from 'react'
interface Props {
  value: CommentBody
  handlePostReply: any
}
interface CommentBody {
  parentIds: [number] | null
  id: number
  data: string
  replies: [CommentBody]
  handlePostReply: any
}
const Comment = ({ value, handlePostReply }: Props) => {
  const [replyInput, setReplyInput] = useState<boolean>(false)
  const replyInputRef = useRef<any>()
  useEffect(() => {
    console.log('render')
    console.log(value)
  }, [])

  const handlReply = (text: string) => {
    const parentIds: number[] | null = value.parentIds || []
    console.log(value.parentIds)
    parentIds.unshift(value.id)
    let replyBody = {
      parentIds,
      id: Math.floor(Math.random() * 200),
      data: text,
      replies: [],
    }
    handlePostReply(parentIds, replyBody)
    console.log({ value, parentIds })
  }
  return (
    <div className="flex justify-start  flex-row w-full mt-3 bg-cyan-200 p-2">
      <img
        className="h-10 w-10 rounded-full mr-4"
        src={
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80'
        }
      />
      {/*Content*/}
      <div className="flex flex-col flex-wrap">
        {/* Name and time */}
        <div className="flex items-center justify-start">
          <p className="mr-2 font-semibold text-lg">Muhammad Shiraz</p>
          <p> 11 Minutes ago</p>
        </div>
        {/* Comment */}
        <div className="max-w-full ">{value?.data}</div>
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
            onKeyDown={(e: KeyboardEvent<HTMLElement>) => {
              if (e.key == 'Enter') {
                setReplyInput(false)
                // @ts-ignore
                handlReply(e.target.value)
              }
            }}
            placeholder="Enter your reply"
            className="bg-blue-50 w-full text-gray-600 p-2 rounded-md outline-none focus:border-2 focus:border-blue-300"
          />
        )}
        <>
          {value.replies.length > 0 &&
            value?.replies?.map(
              (reply) => (
                <Comment
                  key={reply.id}
                  value={reply}
                  handlePostReply={handlePostReply}
                />
              )
              // console.log({ reply })
            )}
        </>
      </div>
    </div>
  )
}

export default Comment
