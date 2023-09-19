import axios from "axios";
import { SAVED_RECIPE_REQUEST, SAVED_RECIPE_FAILURE, SAVED_RECIPE_SUCCESS, CLEAR } from "../ActionTypes";

export const getSavedRecipe =(username)=>(dispatch) => {
  dispatch({type:SAVED_RECIPE_REQUEST});
  console.log(username)
  axios.get(`${process.env.REACT_APP_SERVER}savedrecipe?username=${username}`)
  .then((res)=>{
    dispatch({type:SAVED_RECIPE_SUCCESS,payload:res.data});
    console.log(res.data)
  })
  .catch((err)=>{
    console.log("Faliled in dispatch")
    dispatch({type:SAVED_RECIPE_FAILURE});
  })
};

export const saveRecipe =(recipeData)=>(dispatch) => {
  dispatch({type:SAVED_RECIPE_REQUEST});
  axios.post(`${process.env.REACT_APP_SERVER}recipe/save`,recipeData)
  .then((res)=>{
    console.log(res,"in dispatch")
    dispatch({type:SAVED_RECIPE_SUCCESS,payload:res.data.recipe});
  })
  .catch((err)=>{
    dispatch({type:SAVED_RECIPE_FAILURE});
  })
};

export const clear=()=>(dispatch)=>{
  dispatch({type:CLEAR});
}