import { combineReducers, createStore } from "redux";

import loginReducer from "./login";
import productsReducer from "./products";


const reducers = combineReducers({ loginReducer,productsReducer });

const store = createStore(reducers);

export default store;