import * as actions from "../constants/actionTypes";

const scoreReducer = (state = { submitted: false }, action) => {
  switch (action.type) {
    case actions.LOAD_SCORE:
      return { ...state, score: action.data };

    case actions.SET_SCORE:
      return { ...state, score: action.data, submitted: true };

    default:
      return state;
  }
};
export default scoreReducer;
