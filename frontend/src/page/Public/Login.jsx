import React from 'react'
import LoginForm from '../../components/auth/LoginForm'

const Login = () => {
  return (
    <div className='flex min-h-[calc(100vh-80px)] justify-center py-10 w-full px-2'>
      <LoginForm/>
    </div>
  )
}

export default Login