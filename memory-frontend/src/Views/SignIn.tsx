import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AuthInput from '../Componets/AuthInput'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { SignInUser } from '../Types/Auth'
import { onSignIn } from '../Services/API/api'
import { AxiosError } from 'axios'
import useSession from '../Helper/useSession'
import { TailSpin } from 'react-loader-spinner'

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
        localStorage.setItem('user_Session', JSON.stringify(data.data.user))
        navigate('/')
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
    <div className="bg-lime-100 min-h-screen flex justify-center items-center  flex-col min-w-screen">
      <h1 className=" text-2xl sm:text-3xl md:text-4xl mb-6  lg:text-5xl font-semibold text-lime-500 pb-[0.5%]">
        Memory App
      </h1>
      <form
        className=" flex justify-center items-center space-y-3 flex-col w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AuthInput
          register={register}
          name={'email'}
          placeholder={'Please enter your email'}
        />

        {errors.email && (
          <span className="m_0 pt-2 text-black ">{errors?.email.message}</span>
        )}
        <AuthInput
          register={register}
          name={'password'}
          placeholder={'Please enter your password'}
        />

        {errors.password && (
          <span className="m_0 pt-2  text-black">
            {errors?.password.message}
          </span>
        )}
        <button
          disabled={handleSignIn.isLoading}
          type="submit"
          className="w-[30%] text-center flex justify-center items-center sm:w-[25%] md:w-[15%] lg:w-[12%] border py-2 border-lime-500 text-lg outline-none  rounded-md text-lime-500 hover:bg-lime-500 hover:text-white   transition-all ease-out duration-300"
        >
          {handleSignIn.isLoading ? (
            <TailSpin
              height="30"
              width="30"
              color="green"
              ariaLabel="loading"
            />
          ) : (
            'Sign In'
          )}
        </button>
      </form>
    </div>
  )
}

export default Login
