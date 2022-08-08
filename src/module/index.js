import { combineReducers } from "redux";
import counter from "./counter";
import logincheck from "./logincheck";

const rootReducer = combineReducers({ counter, logincheck });
export default rootReducer;