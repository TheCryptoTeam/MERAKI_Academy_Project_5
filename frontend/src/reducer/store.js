import { combineReducers, createStore } from "redux";

import loginReducer from "./login";
import productsReducer from "./products";
import cartsReducer from "./cart/carts";


const reducers = combineReducers({ loginReducer,productsReducer,cartsReducer });

const store = createStore(reducers);

export default store;