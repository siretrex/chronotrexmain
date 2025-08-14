import React from 'react'
import LandingPage from './component/LandingPage'
import { Routes, Route, Link } from 'react-router-dom'
import LoginPage from './component/LoginPage'
import RegisterPage from './component/RegisterPage'
import Addnewtask from './component/Addnewtask'
import Showtasks from './component/Showtasks'
import Footer from './component/Footer'
import Protected from './component/Protected'
import HeroPage from './component/HeroPage'
import Navbar from './component/Navbar'
import { useSelector } from 'react-redux'
import './App.css'

function App() {
   const userId = useSelector((state) => state.user?.user?._id)

  return (
    <>
     <div className="w-full min-h-screen  text-white flex flex-col">
          <div className="flex-1">
            { !userId ? <Navbar/> : <></>}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/addtask" element={<Protected Element={Addnewtask} />} />
              <Route path="/home" element={<Protected Element={HeroPage} />} />
              <Route path="/showtasks" element={<Protected Element={Showtasks} />} />
            </Routes>
          </div>
          </div>
    </>
  )
}

export default App
