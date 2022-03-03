import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InputTag } from '../Componets/InputTag'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { createMemory } from '../Services/API/api'
import useSession from '../Helper/useSession'
import { TailSpin } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

type Inputs = {
  title: string
  description: string
  memImage: string
  isPublic: boolean
}
const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
    memImage: yup
      .mixed()
      .required()
      .test('fileSize', 'Please provide image', (value) => {
        if (!value.length) return false
        return value[0].size <= 2000000
      }),
    isPublic: yup.boolean(),
  })
  .required()
const CreateMemory = () => {
  const navigate = useNavigate()

  const authCreds = useSession('user_Session', null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })
  const [tags, setTags] = useState<string[]>([])
  const mutation = useMutation(
    async (formData: FormData | any) => {
      return await createMemory(formData)
    },
    {
      onSuccess: () => {
        toast('Memory Created', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'success',
        })
        navigate('/')
      },
      onError: () => {
        const err = mutation.error as AxiosError
        toast(err.response?.data.message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'error',
        })
      },
    }
  )
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = new FormData()
    formData.append('image', data?.memImage[0])
    formData.append('title', data?.title)
    formData.append('description', data?.description)
    formData.append('tags', JSON.stringify(tags))
    formData.append('isPublic', JSON.stringify(data?.isPublic))
    mutation.mutateAsync(formData)
  }

  const handleOnChange = (e: React.KeyboardEvent | any) => {
    const value = e.target.value
    if (e.keyCode == 32) {
      e.target.value = ''
      setTags((preValue: any) => [...preValue, value])
    }
  }
  const handleRemoveTag = (tagName: string) => {
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
          encType="multipart/form-data"
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
              {...register('memImage', { required: true })}
              type="file"
              accept="image/x-png,image/jpeg,image/jpg"
              className="block w-full"
            />

            <img
              className="w-8 h-8 absolute right-2 top-[10px] hidden sm:block"
              src="https://cdn.dribbble.com/users/443570/screenshots/5276693/therapist.jpg?compress=1&resize=800x600&vertical=top"
            />
          </div>
          {errors.memImage && (
            <span className="m_0  text-red-500 ">
              {errors?.memImage.message}
            </span>
          )}

          <div className="w-1/2 my-3 ml-2 flex items-center">
            <input
              {...register('isPublic')}
              className="items-start form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label inline-block text-gray-800 text-lg">
              Public Memory
            </label>
          </div>
          <button
            disabled={mutation.isLoading}
            type="submit"
            className="cursor-pointer flex justify-center items-center w-[65%] sm:w-[50%] md:w-[20%] py-2  bg-blue-500 text-white hover:bg-blue-600 hover:drop-shadow-sm my-2 px-3 rounded-lg text-lg shadow-sm"
          >
            {mutation.isLoading ? (
              <>
                <span className="mr-4">Loading</span>
                <TailSpin
                  height="25"
                  width="25"
                  color="white"
                  ariaLabel="loading"
                />
              </>
            ) : (
              'Create Memory'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateMemory
