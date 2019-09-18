import * as actions from "../constants/actionTypes";

const createBoard = ({ pairOfCards, ordered }) => ({
  type: actions.CREATE_BOARD,
  pairOfCards,
  ordered
});

const flipCard = id => ({
  type: actions.FLIP_CARD,
  id
});

const toggleDisabled = () => ({
  type: actions.TOGGLE_DISABLED
});

const setSolved = cards => ({
  type: actions.SET_SOLVED,
  cards
});

const incrementMoves = () => ({
  type: actions.INCREMENT_MOVES
});

const resetFlipped = () => ({
  type: actions.RESET_FLIPPED
});

const toggleMenu = () => ({
  type: actions.TOGGLE_MENU
});

const runTimer = () => {
  return (dispatch, getState) => {
    dispatch({ type: actions.RUN_TIMER, time: Date.now() });
    let timer = () => {
      if (getState().timer.running) {
        dispatch({ type: actions.TIME, time: Date.now() });
        setTimeout(timer, 1000);
      }
    };
    timer();
  };
};

const stopTimer = () => ({
  type: actions.STOP_TIMER
});

export {
  createBoard,
  toggleDisabled,
  setSolved,
  incrementMoves,
  toggleMenu,
  flipCard,
  resetFlipped,
  runTimer,
  stopTimer
};
