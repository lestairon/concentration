import * as actions from "../constants/actionTypes";

const createBoard = ({ numberOfCards, order }) => ({
  type: actions.CREATE_BOARD,
  numberOfCards,
  order
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

const loadScore = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    return firestore
      .collection("scores")
      .get()
      .then(({ docs }) =>
        dispatch({
          type: actions.LOAD_SCORE,
          data: docs.map(x => x.data())
        })
      );
  };
};

const runTimer = () => {
  return (dispatch, getState) => {
    dispatch({ type: actions.RUN_TIMER, time: Date.now() });
    let timer = () => {
      if (getState().timer.running) {
        dispatch({ type: actions.TIME, time: Date.now() });
        setTimeout(timer, 10);
      }
    };
    timer();
  };
};

const stopTimer = () => ({
  type: actions.STOP_TIMER
});

const submitScore = ({ score, numberOfCards, moveCount, time }) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    return firestore
      .collection("scores")
      .add({
        card_pairs: numberOfCards,
        date: new Date(),
        moves: moveCount,
        name: "defaultUser",
        score,
        time: time / 1000
      })
      .then(async docRef => docRef.parent.get())
      .then(({ docs: scores }) => {
        const data = scores.map(score => score.data());
        dispatch({ type: actions.SET_SCORE, data });
      });
  };
};

export {
  createBoard,
  toggleDisabled,
  setSolved,
  incrementMoves,
  toggleMenu,
  flipCard,
  resetFlipped,
  loadScore,
  runTimer,
  stopTimer,
  submitScore
};
