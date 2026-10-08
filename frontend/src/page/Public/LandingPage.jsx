import React from 'react'
import Introduction from '../../components/landingPage/Introduction'
import Examples from '../../components/landingPage/Examples'

const LandingPage = () => {
  return (
    <div className='min-h-screen flex gap-2 py-2 md:py-5   md:flex-row  md:px-15 px-3 flex-col w-full '>
        <Introduction/>
        <Examples/>
    </div>
  )
}

export default LandingPage