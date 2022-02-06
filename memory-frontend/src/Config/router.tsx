import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import Home from '../Views/Home'
import Login from '../Views/SignIn'
import SignUp from '../Views/SignUp'

import { ProtectedRoute } from './protectedRoute'

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Router>
  )
}
