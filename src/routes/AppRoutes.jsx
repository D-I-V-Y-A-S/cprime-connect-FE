//Import Area start
import React,{ useState} from 'react'
import { Routes,Route,Navigate, BrowserRouter } from 'react-router-dom'
import UserLoginComponent from '../Components/UserLoginComponent/UserLoginComponent'
// Import Area End

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLoginComponent/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes