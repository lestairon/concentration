import { combineReducers } from "redux";
import boardReducer from "./board";

const rootReducer = combineReducers({
  state: boardReducer
});

export default rootReducer;
