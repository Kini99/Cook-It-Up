import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/AuthReducer/Action";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const Login = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const dispatch=useDispatch();
  const location=useLocation();
  const navigate=useNavigate();
  
  const handleLogin=()=>{
    const userData={
      email,password
    }
    dispatch(login(userData))
    .then((res)=>{
      navigate(location.state)
    })
  }

  return (
    <>
    <h2>Log In</h2>
    <input  type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
    <input
      type="password"
      placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} 
    />
    <button onClick={handleLogin}>Log In</button>
    </>
  )
}

export default Login