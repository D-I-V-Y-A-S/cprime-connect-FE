//Import Area start
import React,{ useState} from 'react'
import { Routes,Route,Navigate, BrowserRouter } from 'react-router-dom'
import UserLoginComponent from '../Components/UserLoginComponent/UserLoginComponent'
import CandidatesComponent from '../Components/CandidatesComponent/CandidatesComponent'
import AddCandidatesComponent from '../Components/CandidatesComponent/AddCandidatesComponent'
import EditCandidateComponent from '../Components/CandidatesComponent/EditCandidate'
// Import Area End

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLoginComponent/>} />
        <Route path="/onboard" element={<CandidatesComponent/>} />  
        <Route path="/add_candidate" element={<AddCandidatesComponent/>} />
        <Route path='/edit_candidate' element={<EditCandidateComponent/>}/>        
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes