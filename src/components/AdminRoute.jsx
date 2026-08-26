import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminRoute({children}) {
    const role=localStorage.getItem('role')
    if(!role){
        return <Navigate to={'/'} replace/>
    }
  return children
}

export default AdminRoute