import * as actions from "../constants/actionTypes";

const initialState = {
  running: false,
  initialTime: 0,
  passedTime: 0
};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RUN_TIMER:
      return {
        ...state,
        running: true,
        passedTime: action.time,
        initialTime: action.time
      };

    case actions.STOP_TIMER:
      return {
        ...state,
        running: false
      };

    case actions.TIME:
      return {
        ...state,
        passedTime: action.time
      };

    default:
      return state;
  }
};

export default timerReducer;
