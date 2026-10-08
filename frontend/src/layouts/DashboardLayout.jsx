import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Home/Navbar'

const DashboardLayout = () => {
  return (
    <div className='min-h-screen w-full relative'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default DashboardLayout