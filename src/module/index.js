import { combineReducers } from "redux";
import counter from "./counter";
import logincheck from "./logincheck";
import characters from "./characters";
import goods from "./goods";

const rootReducer = combineReducers({ counter, logincheck, characters, goods });
export default rootReducer;