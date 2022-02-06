import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const loggedIn = true
  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }
  return children
}
