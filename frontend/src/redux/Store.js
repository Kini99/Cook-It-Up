import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as SearchReducer } from "./SearchReducer/Reducer";

const rootReducer = combineReducers({SearchReducer});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
