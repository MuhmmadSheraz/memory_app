import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const loggedIn = false
  if (!loggedIn) {
    return <Navigate to="/login" replace />
  } else {
    return children
  }
}
