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
import { useNavigate } from 'react-router-dom'

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
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
          name={'name'}
          placeholder={'Please enter your name'}
        />
        {errors.name && (
          <span className="m_0 pt-2 text-black">{errors?.name.message}</span>
        )}
        <AuthInput
          register={register}
          name={'email'}
          placeholder={'Please enter your email'}
        />

        {errors.email && (
          <span className="m_0 pt-2 text-black">{errors?.email.message}</span>
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
        <AuthInput
          register={register}
          name={'confirmPassword'}
          placeholder={'Please enter your confirm password'}
        />

        {errors.confirmPassword && (
          <span className="m_0 pt-2  text-black">
            {errors?.confirmPassword.message}
          </span>
        )}
        <button
          disabled={handleSignUp.isLoading}
          type="submit"
          className="w-[30%] text-center flex justify-center items-center sm:w-[25%] md:w-[15%] lg:w-[12%] border py-2 border-lime-500 text-lg outline-none  rounded-md text-lime-500 hover:bg-lime-500 hover:text-white   transition-all ease-out duration-300"
        >
          {handleSignUp.isLoading ? (
            <TailSpin
              height="30"
              width="30"
              color="green"
              ariaLabel="loading"
            />
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
    </div>
  )
}

export default SignUp
