import {
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    SEARCH_REQUEST,
  } from "../ActionTypes";
  
  const initState = {
    isLoading: false,
    isError: false,
    results: [],
  };
  export const reducer = (state = initState, { type, payload }) => {
    switch (type) {
      case SEARCH_REQUEST: {
        return { ...state, isLoading: true };
      }
      case SEARCH_FAILURE: {
        return { ...state, isLoading: false, isError: true };
      }
      case SEARCH_SUCCESS: {
        return { ...state, isLoading: false, results: payload };
      }
      default: {
        return state;
      }
    }
  };