import {
    SAVED_RECIPE_SUCCESS,
    SAVED_RECIPE_FAILURE,
    SAVED_RECIPE_REQUEST,
  } from "../ActionTypes";
  
  const initState = {
    isLoading: false,
    isError: false,
    savedRecipe: {},
  };
  export const reducer = (state = initState, { type, payload }) => {
    switch (type) {
      case SAVED_RECIPE_REQUEST: {
        return { ...state, isLoading: true };
      }
      case SAVED_RECIPE_FAILURE: {
        return { ...state, isLoading: false, isError: true };
      }
      case SAVED_RECIPE_SUCCESS: {
        return { ...state, isLoading: false, savedRecipe: payload };
      }
      default: {
        return state;
      }
    }
  };