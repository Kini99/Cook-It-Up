import axios from "axios";
import { SAVED_RECIPE_REQUEST, SAVED_RECIPE_FAILURE, SAVED_RECIPE_SUCCESS } from "../ActionTypes";

export const getSavedRecipe =(id)=>(dispatch) => {
  dispatch({type:SAVED_RECIPE_REQUEST});
  axios.get(`${process.env.REACT_APP_SERVER}recipe/${id}`)
  .then((res)=>{
    dispatch({type:SAVED_RECIPE_SUCCESS,payload:res.data});
  })
  .catch((err)=>{
    dispatch({type:SAVED_RECIPE_FAILURE});
  })
};

