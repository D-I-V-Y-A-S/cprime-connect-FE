//Import Area start
import React,{ useState} from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import Login from '../components/Login/Login'
import UserDashboard from '../components/UserDashboard/UserDashboard'
import ForgotPassword from '../components/ForgotPassword/ForgotPassword'
import OtpInputWrapper from '../components/ForgotPassword/OtpInputWrapper'
import ResetPasswordWrapper from '../components/ResetPassword/ResetPasswordWrapper'
// Import Area End

const AppRoutes = () => {
  const [emailEntered, setEmailEntered] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword onEmailSubmit={() => setEmailEntered(true)}/>} />
        <Route path="/otp-sent" element={emailEntered ? (<OtpInputWrapper  onOtpSubmit={() => setOtpVerified(true)}/>) : (<Navigate to="/forgot-password" />) } />
        <Route path="/reset-password" element={otpVerified ? (<ResetPasswordWrapper onOtpSubmit={() => otpVerified(true)}/>) : (<Navigate to="/forgot-password" />)} />
      </Routes>
    </>
  )
}

export default AppRoutes