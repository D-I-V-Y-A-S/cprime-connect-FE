import React, { useEffect, useState } from 'react'
import {useApi} from '../../hooks/useApi'

const UserLoginComponent = () => {
    // const [email, setEmail] = useState('john.doe@cprime.com');
    const [email, setEmail] = useState('bob.johnson@cprime.com');
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
      if (responseJSON.role === 'Admin') {
              console.log("Admin")
              // window.location.href='/'  //admin dashboard path
            }
            else {
              console.log("User")
              // window.location.href='/'  //user dashboard path
            }
    }

    useEffect(() => {
      window.localStorage.setItem('email', email);
      
      const get_email = localStorage.getItem('email');
      if (!get_email) {
        window.location.href = '/' //main login page path
      }
      getRole(get_email)
    },[])

  return (
    <div>
      
    </div>
  )
}

export default UserLoginComponent
