import React from 'react'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
const Introduction = () => {
  const navigate = useNavigate();
  return (
    <div className='flex h-100 w-full items-center justify-center md:w-[60%] md:justify-start relative'>
        <motion.div
          className='absolute top-10 left-10 h-50 w-50 rounded-full bg-blue-600 -z-20 blur-[50px] md:blur-[100px]  md:h-100 md:w-100'
          initial={{x : -20, y: -20}}
          animate={{x : 0, y: 0}}
          exit={{x : -100, y: -100}}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          transform="translate(-50%, -50%)"
          

        ></motion.  div>

      <div className='flex w-full max-w-xl flex-col gap-3'>
        <span className='text-sm text-[#6B7280] sm:text-base'>Anonymous feedback, made simple.</span>
        <span className='text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl'>Know what people really think.</span>
        <span className='w-full text-sm text-[#6B7280] sm:text-base md:w-10/12'>
          Create your personal feedback link and receive honest anonymous messages from the people around you.
        </span>
        <div className='mt-4 flex flex-col gap-3 sm:flex-row md:gap-5'>
          <button onClick={()=> navigate("/register") }  className='rounded-md bg-[#2563EB] px-3 py-2 text-sm font-medium text-white sm:text-base'>
            Create your Feedback link
          </button>
          <button onClick={()=> navigate("/register") } className='rounded-md border border-[#171717] px-3 py-2 text-sm font-medium text-[#171717] sm:text-base'>
            Sign in
          </button>
        </div>
      </div>
    </div>
  )
}

export default Introduction