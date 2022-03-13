import { InputElementProps } from '@chakra-ui/react'

interface HookInput {
  placeholder: string
  register: any
  name: string
}
const AuthInput: React.FC<HookInput | InputElementProps> = ({
  register,
  name,
  placeholder,
  ...rest
}) => {
  return (
    <input
      {...rest}
      {...register(name)}
      placeholder={placeholder}
      className="w-9/12 sm:w-1/2 md:w-[45%] lg:w-[35%] py-3 px-4  outline-lime-100 transition-all ease-out duration-300  rounded-md shadow-md"
    />
  )
}

export default AuthInput
