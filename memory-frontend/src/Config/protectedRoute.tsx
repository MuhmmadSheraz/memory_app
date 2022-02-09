import { Navigate } from 'react-router-dom'
import useSession from '../Helper/useSession'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSession('user_Session', null)
  if (!user?.token) {
    return <Navigate to="/login" replace />
  } else {
    return children
  }
}
