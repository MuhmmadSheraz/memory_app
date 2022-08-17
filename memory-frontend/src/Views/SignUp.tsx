import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import AuthInput from '../Componets/AuthInput'
import { useMutation } from 'react-query'
import { onSignUp } from '../Services/API/api'
import { toast } from 'react-toastify'
import { TailSpin } from 'react-loader-spinner'
import { AxiosError } from 'axios'
import { SignUpUser } from '../Types/Auth'
import { Link, useNavigate } from 'react-router-dom'
import useSession from '../Helper/useSession'
import { useEffect } from 'react'
import MemoryBackground from '../Assets/Images/mem.jpg'

type Inputs = {
  email: string
  password: string
  confirmPassword: string
  name: string
}
const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().min(6).required(),
  })
  .required()

const SignUp = () => {
  const navigate = useNavigate()
  const validUser = useSession('user_Session', null)
  useEffect(() => {
    !!validUser?.token && navigate('/')
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const handleSignUp = useMutation(
    async (body: SignUpUser) => {
      return await onSignUp(body)
    },
    {
      onSuccess: (data) => {
        localStorage.setItem('user_Session', JSON.stringify(data.data.user))
        navigate('/')
        toast('🦄 Signed Up', {
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
      onError: (err) => {
        const error = err as AxiosError
        toast(error.response?.data.message, {
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

  const onSubmit: SubmitHandler<Inputs> = async () => {
    const body = {
      email: getValues()?.email,
      name: getValues()?.name,
      password: getValues()?.password,
      confirmPassword: getValues()?.confirmPassword,
    }
    handleSignUp.mutateAsync(body)
  }
  const userName = watch('name')

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
          <h3 className="text-3xl font-semibold my-3">
            Hello {userName}
            {!!userName && '!'}
          </h3>
          <p className="text-xs sm:text-base">
            Create and Save Your Memories with others.{' '}
          </p>

          <div className="w-full my-2 text-center flex-col">
            <AuthInput
              register={register}
              name={'name'}
              type="text"
              placeholder={'Please enter your name'}
            />
            {errors.name && (
              <span className="m_0 pt-2 text-red-500 block ">
                {errors?.name.message}
              </span>
            )}
          </div>
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
          <div className="w-full my-2 text-center flex-col ">
            <AuthInput
              register={register}
              name={'confirmPassword'}
              type={'password'}
              placeholder={'Please enter your confirm password'}
            />

            {errors.confirmPassword && (
              <span className="m_0 pt-2 text-red-500 block">
                {errors?.confirmPassword.message}
              </span>
            )}
          </div>
          <button
            disabled={handleSignUp.isLoading}
            type="submit"
            className=" text-center flex justify-center items-center w-[30%] border py-2 border-blue-500 text-lg outline-none  rounded-md text-white  hover:bg-blue-700 bg-blue-500 hover:text-white   transition-all ease-out duration-300 mt-3  "
          >
            {handleSignUp.isLoading ? (
              <TailSpin
                height="30"
                width="30"
                color="white"
                ariaLabel="loading"
              />
            ) : (
              'SignUp'
            )}
          </button>
          <p className="mt-4 text-gray-500 md:text-lg lg:text-xl self-center  absolute bottom-5 text-center ">
            Already have an account?{' '}
            <Link to={'/login'} className="font-semibold text-blue-500">
              Login Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
