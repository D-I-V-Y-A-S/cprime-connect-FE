import React, { useEffect, useState } from 'react'
import {useApi} from '../../hooks/useApi'
import AdminDashboardComponent from '../AdminDashboardComponent/AdminDashboardComponent';
import UserDashboardComponent from '../UserDashboardComponent/UserDashboardComponent';

const UserLoginComponent = () => {
    //  const [email, setEmail] = useState('john.doe@cprime.com');
    const [email, setEmail] = useState('bob.johnson@cprime.com');
    const [role, setRole] = useState(null);
    const {request ,loading ,error} = useApi();

    const getRole = async(email) => {
      const responseJSON = await request({
       method:'POST',
       url:'/validate/userLogin' ,
       data:{
        email
       }
      })
      console.log(responseJSON)
      setRole(responseJSON.role)

    }
    //   if (responseJSON.role === 'Admin') {
    //           console.log("Admin")
    //             // window.location.href='/'  //admin dashboard path
    //         }
    //         else {
    //           console.log("User")
    //              // window.location.href='/'  //user dashboard path
    //         }
    // }

    useEffect(() => {
      window.localStorage.setItem('email', email);
      
      const get_email = localStorage.getItem('email');
      if (!get_email) {
        window.location.href = '/' //main login page path
      }
      else{
      getRole(get_email)
      }
    },[])

  return (
    <div>
      {role === 'Admin' && <AdminDashboardComponent />}
      {role === 'User' && <UserDashboardComponent />}
    </div>
  )
}

export default UserLoginComponent
