import axios from "axios";
import { RECIPE_REQUEST, RECIPE_FAILURE, RECIPE_SUCCESS } from "../ActionTypes";

export const getRecipeDetails =(id)=>(dispatch) => {
  dispatch({type:RECIPE_REQUEST});
  axios.get(`${process.env.REACT_APP_SERVER}recipe/${id}`)
  .then((res)=>{
    dispatch({type:RECIPE_SUCCESS,payload:res.data});
  })
  .catch((err)=>{
    dispatch({type:RECIPE_FAILURE});
  })
};

