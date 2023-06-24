import React, { useEffect } from 'react'
import { Navigate,useNavigate } from 'react-router-dom'

function Demo() {
  const navigate = useNavigate();
  // const history = useHistory()
  useEffect(()=>{
    check();
  })
  const check = ()=>{
    const tok = sessionStorage.getItem("token")
    if(!tok){
      // console.log(tok)
      navigate("/signup")
      // history.push("/signup")
    }
    console.log({tok})
  }
  return (
    <div >
      <h1 >ho gya register</h1>  
    </div>
  )
}

export default Demo
