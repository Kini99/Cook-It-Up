import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as SearchReducer } from "./SearchReducer/Reducer";
import { reducer as RecipeReducer } from "./RecipeReducer/Reducer";
import { reducer as AuthReducer } from "./AuthReducer/Reducer"

const rootReducer = combineReducers({SearchReducer,RecipeReducer,AuthReducer});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
