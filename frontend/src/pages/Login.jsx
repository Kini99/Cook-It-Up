import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../redux/AuthReducer/Action";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import "../styles/Login.css";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(null);

  const { isAuth,username } = useSelector((store) => store.AuthReducer);

  useEffect(() => {
    if (location.state && location.state.from) {
      setPrevLocation(location.state.from);
    }
  }, [location.state]);

  const handleLogin = () => {
    const userData = {
      username:name,
      password,
    };

    dispatch(login(userData))
      .then((res) => {
        localStorage.setItem("user",name);
          navigate(location.state || "/");
      })

    setName("");
    setPassword("");
  };

  const handleSignup = () => {
    const userData = {
      username:name,
      email,
      password,
    };
    dispatch(signup(userData))
      .then((res) => {
        localStorage.setItem("user",name);
        navigate(location.state)
      })
      .catch((err) => alert(err.response.data.message));

    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSuccess = async (response) => {
    const { credential } = response;
    const decodedToken = jwtDecode(credential);
    const userName = decodedToken.name
    const userEmail = decodedToken.email;

    const data = {
      email: userEmail,
      password: userEmail,
      username: userName
    };

    console.log(data)

    try {
      const isUser = await axios.post(`${process.env.REACT_APP_SERVER}/google/register`, data);
      if(isUser.data.success){
        try {
          const response = await axios.post(`${process.env.REACT_APP_SERVER}/login`, {
            email: data.email, 
            password: data.password, 
          });

          if (response.data.success) {
            const userData = response.data
            localStorage.setItem('user', JSON.stringify(userData.username));
          } 
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFailure = () => {
    console.log('Google login failed');
  };

  return (
    <>
    <Navbar/>
      <div className="main-container">
        <div className="container">
          <img src={logo} alt="" />
          <Tabs isFitted variant='soft-rounded' colorScheme='orange' className="login-container">
            <TabList>
              <Tab>LOGIN</Tab>
              <Tab>REGISTER</Tab>
            </TabList>
            <TabPanels >
              <TabPanel className="panel">
                <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                  <GoogleLogin
                    id="google-login-button"
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                  />
                </GoogleOAuthProvider>
                <p>Or:</p>
                <form className="form">
                  <Input variant='outline' placeholder='Enter Username' value={name} onChange={(e) => setName(e.target.value)} required/>
                  <Input variant='outline' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  <Button colorScheme='blue' className="button" onClick={handleLogin}>Login</Button>
                </form>
              </TabPanel>
              <TabPanel className="panel">
                <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                  <GoogleLogin
                    id="google-login-button"
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                  />
                </GoogleOAuthProvider>
                <p>Or:</p>
                <form className="form">
                  <Input variant='outline' placeholder='Enter Username' value={name} onChange={(e) => setName(e.target.value)} required />
                  <Input variant='outline' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <Input variant='outline' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  <Button colorScheme='blue' className="button" onClick={handleSignup}>Sign Up</Button>
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
        <Footer className="footer" />
      </div>
    </>
  )
}

export default Login