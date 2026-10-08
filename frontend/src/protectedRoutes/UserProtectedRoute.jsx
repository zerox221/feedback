import React from 'react'
import { Navigate } from 'react-router-dom'

const UserProtectedRoute = ({children,user}) => {
    if(!user){
        return <Navigate to="/login" replace />
    }
  return children
}

export default UserProtectedRoute