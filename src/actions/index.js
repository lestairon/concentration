import * as actions from "./types";
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
export {
  createBoard,
  toggleDisabled,
  setSolved,
  incrementMoves,
  toggleMenu,
  flipCard,
  resetFlipped
};
