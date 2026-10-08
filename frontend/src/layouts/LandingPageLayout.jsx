import React from 'react'
import LandingPageNav from '../components/landingPage/LandingPageNav'
import { Outlet } from 'react-router-dom'

const LandingPageLayout = () => {
  return (
    <div className='min-h-screen w-full relative'>
        <LandingPageNav/>
        <Outlet/>
    </div>
  )
}

export default LandingPageLayout