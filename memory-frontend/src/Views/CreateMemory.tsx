import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InputTag } from '../Componets/InputTag'
import { useState } from 'react'

type Inputs = {
  title: string
  description: string
  image: string
}
const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
    image: yup.string().required(),
  })
  .required()
const CreateMemory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })
  const [tags, setTags] = useState<string[]>([])
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log({ data, tags })
  const handleOnChange = (e: React.KeyboardEvent | any) => {
    const value = e.target.value
    if (e.keyCode == 32) {
      e.target.value = ''
      setTags((preValue: any) => [...preValue, value])
    }
  }
  const handleRemoveTag = (tagName: string) => {
    console.log('removed')
    const newTags = tags.filter((tag) => tag !== tagName)
    setTags(newTags)
  }
  return (
    <div>
      <div className="mt-16 pt-5 flex h-full justify-center min-w-[100vw] items-center flex-col px-5 bg-gray-100 min-h-[90vh]">
        <h1 className=" text-2xl sm:text-3xl font-semibold my-2">
          Create a memory
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex justify-center items-center flex-col"
        >
          <input
            {...register('title', { required: true })}
            placeholder="Enter Title"
            className="block w-full sm:w-3/4 md:w-1/2  py-2  outline-gray-400 border-gray-200 border-2 my-2 px-3 rounded-lg text-lg shadow-sm"
          />
          {errors.title && (
            <span className="m_0  text-red-500 ">{errors?.title.message}</span>
          )}
          <textarea
            {...register('description', { required: true })}
            placeholder="Enter Description"
            rows={4}
            className="block w-full sm:w-3/4 md:w-1/2  py-2  outline-gray-400 border-gray-200 border-2 my-2 px-3 rounded-lg text-lg shadow-sm"
          />
          {errors.description && (
            <span className="m_0  text-red-500 ">
              {errors?.description.message}
            </span>
          )}
          <input
            onKeyUp={handleOnChange}
            placeholder="Enter Tags"
            className="block w-full sm:w-3/4 md:w-1/2  py-2  outline-gray-400 border-gray-200 border-2 my-2 px-3 rounded-lg text-lg shadow-sm"
          />
          {tags.length > 0 && (
            <div className=" w-full   sm:w-3/4 md:w-1/2  py-1  bg-white  outline-gray-400 border-gray-200 border-2 my-2 sm:px-3 rounded-lg text-lg shadow-sm">
              {tags.map((tag, index) => (
                <InputTag title={tag} key={index} onRemove={handleRemoveTag} />
              ))}
            </div>
          )}

          <div className="block w-full sm:w-3/4 md:w-1/2  py-2 relative bg-white  outline-gray-400 border-gray-200 border-2 my-2 px-3 rounded-lg text-lg shadow-sm">
            <input
              {...register('image', { required: true })}
              type={'file'}
              placeholder="Enter Title"
              className="block w-full "
            />

            <img
              className="w-8 h-8 absolute right-2 top-[10px] hidden sm:block"
              src="https://cdn.dribbble.com/users/443570/screenshots/5276693/therapist.jpg?compress=1&resize=800x600&vertical=top"
            />
          </div>
          {errors.image && (
            <span className="m_0  text-red-500 ">{errors?.image.message}</span>
          )}

          <button className="block w-[33%] sm:w-[20%] md:w-[16%] py-2  bg-blue-500 text-white hover:bg-blue-600 hover:drop-shadow-sm my-2 px-3 rounded-lg text-lg shadow-sm">
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateMemory
