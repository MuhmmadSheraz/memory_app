import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AuthInput from '../Componets/AuthInput'
import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { SignInUser } from '../Types/Auth'
import { onSignIn } from '../Services/API/api'
import { AxiosError } from 'axios'
import useSession from '../Helper/useSession'
import { TailSpin } from 'react-loader-spinner'
import MemoryBackground from '../Assets/Images/mem.jpg'
type Inputs = {
  email: string
  password: string
}
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required()

const Login = () => {
  const navigate = useNavigate()
  const validUser = useSession('user_Session', null)
  console.log(validUser)
  useEffect(() => {
    !!validUser?.token && navigate('/')
  }, [])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })
  const handleSignIn = useMutation(
    async ({ email, password }: SignInUser) => {
      return await onSignIn({ email, password })
    },
    {
      onSuccess: (data) => {
        console.log({ data })
        localStorage.setItem('user_Session', JSON.stringify(data?.data?.user))
        navigate('/', { replace: true })
        toast('Logged In', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'success',
        })
      },
      onError: (error) => {
        const err = error as AxiosError
        console.log(err.response?.data.message)
        toast(err.response?.data.message, {
          position: 'top-right',
          autoClose: 3000,

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
    handleSignIn.mutateAsync({ email: data.email, password: data.password })
  }

  return (
    <div className="bg-blue-100 min-h-screen flex justify-center items-center  flex-col min-w-screen">
      <div className="w-11/12 flex items-center rounded-lg">
        <img
          src={MemoryBackground}
          className=" h-[90vh] w-0 md:w-1/2  rounded-tl-xl   rounded-bl-xl"
        />
        <form
          className="flex flex-col justify-center items-center w-[100%] md:w-1/2 bg-blue-300 h-[90vh] relative  md:rounded-tr-xl md:rounded-br-xl md:rounded-tl-none  md:rounded-bl-none rounded-xl "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h6 className="text-sm font-semibold my-3">Memory App</h6>
          <h3 className="text-3xl font-semibold my-3">Hello Again!</h3>
          <p className="text-xs sm:text-base">
            Create and Save Your Memories with others.{' '}
          </p>

          <div className="w-full my-2 text-center flex-col">
            <AuthInput
              register={register}
              name={'email'}
              placeholder={'Please enter your email'}
              type="email"
            />

            {errors.email && (
              <span className="m_0 pt-2 text-red-500 block ">
                {errors?.email.message}
              </span>
            )}
          </div>
          <div className="w-full my-2 text-center flex-col ">
            <AuthInput
              register={register}
              name={'password'}
              type={'password'}
              placeholder={'Please enter your password'}
            />

            {errors.password && (
              <span className="m_0 pt-2 text-red-500 block">
                {errors?.password.message}
              </span>
            )}
          </div>
          <button
            disabled={handleSignIn.isLoading}
            type="submit"
            className=" text-center flex justify-center items-center w-[30%] border py-2 border-blue-500 text-lg outline-none  rounded-md text-white  hover:bg-blue-700 bg-blue-500 hover:text-white   transition-all ease-out duration-300 mt-3  "
          >
            {handleSignIn.isLoading ? (
              <TailSpin
                height="30"
                width="30"
                color="white"
                ariaLabel="loading"
              />
            ) : (
              'Login'
            )}
          </button>
          <p className="mt-4 text-gray-500 md:text-lg lg:text-xl self-center  absolute bottom-5 text-center ">
            Don't have an account yet?{' '}
            <Link to={'/signup'} className="font-semibold text-blue-500">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
