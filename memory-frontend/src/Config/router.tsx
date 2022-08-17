import { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
const Home = lazy(() => import('../Views/Home'))
const BookmarkMemories = lazy(() => import('../Views/BookmarkMemories'))
const CreateMemory = lazy(() => import('../Views/CreateMemory'))
const MemoryDetail = lazy(() => import('../Views/MemoryDetail'))
const PrivateMemories = lazy(() => import('../Views/PrivateMemories'))
const Login = lazy(() => import('../Views/SignIn'))
const SignUp = lazy(() => import('../Views/SignUp'))
const ProtectedRoute = lazy(() => import('./protectedRoute'))

const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <h1 className="text-3xl text-blue-400 animate-pulse ">Loading...</h1>
    </div>
  )
}

export default function MainRouter() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </Router>
  )
}
