import { combineReducers } from "redux";
import todoReducer from "./behavior/todo/reducer";

export default combineReducers({
    todo: todoReducer
});