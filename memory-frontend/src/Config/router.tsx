import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import BookmarkMemories from '../Views/BookmarkMemories'
import CreateMemory from '../Views/CreateMemory'
import Home from '../Views/Home'
import MemoryDetail from '../Views/MemoryDetail'
import PrivateMemories from '../Views/PrivateMemories'
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
        />
        <Route
          path="/memory/:id"
          element={
            <ProtectedRoute>
              <MemoryDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/private"
          element={
            <ProtectedRoute>
              <PrivateMemories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <BookmarkMemories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateMemory />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Router>
  )
}
