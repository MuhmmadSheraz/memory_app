import { InputElementProps } from '@chakra-ui/react'
import { UseFormReturn } from 'react-hook-form'

interface HookInput {
  placeholder: string
  register: UseFormReturn['register']
  name: string
  type: string
}
const AuthInput: React.FC<HookInput | InputElementProps> = ({
  register,
  name,
  type,
  placeholder,
  ...rest
}) => {
  return (
    <input
      {...rest}
      {...register(name)}
      type={type == 'password' ? 'password' : 'text'}
      placeholder={placeholder}
      className=" w-[75%] py-3 px-4  outline-blue-100 transition-all ease-out duration-300  rounded-md shadow-md"
    />
  )
}

export default AuthInput
