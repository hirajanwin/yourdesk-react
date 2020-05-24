import { combineReducers } from "redux";
import deskProducts from "./deskProducts";
import currentDeskProduct from "./currentDeskProduct";

export default combineReducers({ deskProducts, currentDeskProduct});
