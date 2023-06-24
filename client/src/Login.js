import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Navigate,useNavigate ,Link} from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
function Login() {
const navigate = useNavigate()
  const [values,setValues] = useState({email:"",password:""})

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  

  // useEffect(()=>{
  //   if(sessionStorage.getItem("logindata")){
  //     navigate("/room")
  //   }
  // })

  const handleSubmit = async(event)=>{
    event.preventDefault();
    if(validationForm()){
      const {email,password} = values;
      const {data} = await axios.post(`http://localhost:4000/api/login`,{ email,password});
      if(data.status===false){
        console.log("yaha hu")
        toast.error(data.msg,toastOptions);
      }
      else if(data.status===true){
        console.log("nhi yaha hu")
        sessionStorage.setItem("logindata",JSON.stringify(data.user))
        navigate("/room")
      }
    }
  }

  const validationForm = ()=>{
    const {email,password} = values;
    if(email==="" || password===""){
      toast.error("email and password is required",toastOptions)
      return false;
    }
    return true;
  }

  const handleChange = (event)=>{
    setValues({...values,[event.target.name]:event.target.value});
  }

  return (
     <div>
  <title>Login Page</title>
  <div className="container">
    <h2>Login</h2>
    <form onSubmit={(event)=>handleSubmit(event)}>
      <div className="form-group">
        <label htmlFor="username">Email</label>
        <input type="text" id="username" placeholder="Enter your email" name='email'
        onChange={(event)=>handleChange(event)}/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" name='password'
        onChange={(event)=>handleChange(event)}/>
      </div>
      <div className="form-group">
        <button type='submit'>Login</button>
        <span>
          don't have account? <Link to="/signup">create one.</Link>
          </span>
      </div>
    </form>
  </div>
<ToastContainer/>

  </div>
    
  )
}

export default Login
