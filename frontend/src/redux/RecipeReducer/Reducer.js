import {
    RECIPE_SUCCESS,
    RECIPE_FAILURE,
    RECIPE_REQUEST,
  } from "../ActionTypes";
  
  const initState = {
    isLoading: false,
    isError: false,
    recipe: {},
  };
  export const reducer = (state = initState, { type, payload }) => {
    switch (type) {
      case RECIPE_REQUEST: {
        return { ...state, isLoading: true };
      }
      case RECIPE_FAILURE: {
        return { ...state, isLoading: false, isError: true };
      }
      case RECIPE_SUCCESS: {
        return { ...state, isLoading: false, recipe: payload };
      }
      default: {
        return state;
      }
    }
  };