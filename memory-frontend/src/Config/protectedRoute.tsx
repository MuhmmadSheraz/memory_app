import React, { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Header } from '../Componets/Header'
import { Sidebar } from '../Componets/Sidebar'
import useSession from '../Helper/useSession'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSession('user_Session', null)
  const [showSidebar, setShowSidebar] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  // Outside Click Detection
  useEffect(() => {
    const checkIfClickedOutside = (e: EventListener | MouseEvent) => {
      // @ts-ignore
      if (showSidebar && ref.current && ref.current.contains(e.target)) {
        setShowSidebar(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showSidebar])
  if (!user?.token) {
    return <Navigate to="/login" replace />
  } else {
    return (
      <div className="min-h-screen flex justify-center  min-w-screen ">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="w-full" ref={ref}>
          <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          {children}
        </div>
      </div>
    )
  }
}
export default ProtectedRoute
