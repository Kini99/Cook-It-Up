import axios from "axios";
import { SEARCH_REQUEST, SEARCH_FAILURE, SEARCH_SUCCESS } from "../ActionTypes";

export const getRecipes =(query)=>(dispatch) => {
  dispatch({type:SEARCH_REQUEST})
  axios.get(`${process.env.REACT_APP_SERVER}recipe/search?query=${query}&page`)
  .then((res)=>{
    dispatch({type:SEARCH_SUCCESS,payload:res.data})
  })
  .catch((err)=>{
    dispatch({type:SEARCH_FAILURE})
  })
};

