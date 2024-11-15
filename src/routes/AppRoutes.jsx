//Import Area start
import React,{ useState} from 'react'
import { Routes,Route,Navigate, BrowserRouter } from 'react-router-dom'
import UserLoginComponent from '../Components/UserLoginComponent/UserLoginComponent'
import EmployeeManagement from '../Components/EmployeeDetailsManagement/EmployeeManagement'
// Import Area End

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeManagement/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes