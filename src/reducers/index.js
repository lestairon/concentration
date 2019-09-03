import { combineReducers } from "redux";
import boardReducer from "./board";
import scoreReducer from "./score";
import timerReducer from "./timer";

const rootReducer = combineReducers({
  boardState: boardReducer,
  scoreBoard: scoreReducer,
  timer: timerReducer
});

export default rootReducer;
