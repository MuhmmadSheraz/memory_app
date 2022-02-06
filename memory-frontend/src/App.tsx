import React from 'react'
import logo from './logo.svg'
import './App.css'
import Login from './Views/SignIn'
import SignUp from './Views/SignUp'
import Home from './Views/Home'
import CreateMemory from './Views/CreateMemory'
import MemoryDetail from './Views/MemoryDetail'
import MainRouter from './Config/router'

function App() {
  return <MainRouter />
}

export default App
