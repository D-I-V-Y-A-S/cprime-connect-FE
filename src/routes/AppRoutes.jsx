//Import Area start
// import React,{ useState} from 'react'
// import { Routes,Route,Navigate, BrowserRouter } from 'react-router-dom'
import React from 'react'
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import UserLoginComponent from '../Components/UserLoginComponent/UserLoginComponent'
import OrgChartComponent from '../Components/OrgChartComponent/OrgChartComponent';
// Import Area End

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLoginComponent/>} />
        <Route path="/org-chart" element={<OrgChartComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes