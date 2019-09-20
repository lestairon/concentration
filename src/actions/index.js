import * as actions from "../constants/actionTypes";

const createBoard = ({ pairOfCards, ordered }) => ({
  type: actions.CREATE_BOARD,
  pairOfCards,
  ordered
});

const flipCard = ({ id, number }) => {
  return (dispatch, getState) => {
    dispatch({
      type: actions.FLIP_CARD,
      id,
      number
    });
    const [card1, card2] = getState().boardState.flippedCards;
    if (card1 && card2 && card1.id !== card2.id) {
      dispatch(toggleDisabled());
      if (card1.number === card2.number) {
        dispatch(setSolved([card1.id, card2.id]));
      }
      dispatch(incrementMoves());
    }
  };
};

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

const deleteCards = () => ({
  type: actions.RESET_GAME
});

const finishGame = () => ({
  type: actions.FINISH_GAME
});

export {
  createBoard,
  toggleDisabled,
  setSolved,
  incrementMoves,
  flipCard,
  resetFlipped,
  runTimer,
  stopTimer,
  deleteCards,
  finishGame
};
