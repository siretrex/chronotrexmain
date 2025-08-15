import React from 'react'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import Navbar from './component/Navbar'
import { useSelector } from 'react-redux'
import './App.css'

function App() {
   const userId = useSelector((state) => state.user?.user?._id)

  return (
    <>
     <div className="w-full min-h-screen bg-gray-800  text-white flex flex-col">
          <div className="flex-1">
            { !userId ? <></> : <Navbar/>}
            <Outlet/>
          </div>
          </div>
    </>
  )
}

export default App
