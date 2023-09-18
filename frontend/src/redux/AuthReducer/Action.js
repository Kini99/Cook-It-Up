import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../ActionTypes";
import axios from "axios";

export const login = (userData) => async(dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  console.log("reducer", userData)
  try {
    const res = await axios.post(`${process.env.REACT_APP_SERVER}user/login`, userData);
    console.log("res", res);
    dispatch({ type: LOGIN_SUCCESS, payload: userData.username });
  } catch (err) {
    console.error("Error:", err);
    dispatch({ type: LOGIN_FAILURE });
  }
};

export const signup = (userData) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return axios.post(`${process.env.REACT_APP_SERVER}user/register`, userData)
    .then((res) => {
      console.log("res",res,res.data.registeredUser.username);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.registeredUser.username });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILURE });
      alert("User already Exists! Kindly Login!")
    })
};