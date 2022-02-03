import { combineReducers, createStore } from "redux";

import loginReducer from "./login";
import productsReducer from "./products";
import cartsReducer from "./cart/carts";
import wishListsReducer from "./wishLists";


const reducers = combineReducers({ loginReducer,productsReducer,cartsReducer,wishListsReducer });

const store = createStore(reducers);

export default store;