import { toast } from 'react-toastify'
interface Props {
  fun: any
  pending: string
  success: string
}
export const showToast = (props: Props) => {
  toast.promise(props.fun, {
    pending: props.pending,
    success: props.success,
    error: 'Promise rejected 🤯',
  })
}
