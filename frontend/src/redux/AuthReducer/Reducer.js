import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../ActionTypes"


const initialState = {
    isLoading: false,
    isError: false,
    isAuth: false,
    username: "",
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return { ...state, isLoading: true }
        case LOGIN_SUCCESS:
            console.log("payload: ",payload)
            return { ...state, isLoading: false, isAuth: true, username: payload }
        case LOGIN_FAILURE:
            return { ...state, isLoading: false, isError: true }
        default: return state
    }
}