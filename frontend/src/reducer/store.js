import { combineReducers, createStore } from "redux";

import loginReducer from "./login";
import productsReducer from "./products";
import cartsReducer from "./cart/carts";
import wishListsReducer from "./wishLists";
import usersReducer from "./users/users";

const reducers = combineReducers({ loginReducer,productsReducer,cartsReducer,wishListsReducer,usersReducer });

const store = createStore(reducers);

export default store;