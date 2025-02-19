import { combineReducers } from "redux";
import { userReducer } from "./user";
import { itemReducer } from "./items";
import { sizeReducer } from "./size";
import { orderReducer } from "./orders";
import { productReducer } from "./products";
export const rootReducer = combineReducers({
    user: userReducer,
    items: itemReducer,
    size: sizeReducer,
    orders: orderReducer,
    product: productReducer,
});