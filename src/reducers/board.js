import * as actions from "../constants/actionTypes";

const initialState = {
  cards: [],
  flippedCards: [],
  disabled: false,
  solved: [""],
  moveCount: 0,
  showMenu: false,
  pairOfCards: 0
};

const boardReducer = (state = initialState, action) => {
  const createCards = (pairOfCards, order) => {
    const array = Array.from({ length: pairOfCards * 2 }, (_, i) =>
      Math.floor(i / 2)
    ).map((value, index) => ({ value, key: index }));

    if (order) {
      return array;
    }

    return array.sort(() => Math.random() - 0.5);
  };

  switch (action.type) {
    case actions.CREATE_BOARD: {
      const cards = createCards(action.pairOfCards, action.ordered);
      return {
        ...initialState,
        cards,
        solved: [],
        pairOfCards: action.pairOfCards
      };
    }

    case actions.RESET_FLIPPED:
      return { ...state, flippedCards: [] };

    case actions.FLIP_CARD:
      return { ...state, flippedCards: [...state.flippedCards, action.id] };

    case actions.TOGGLE_DISABLED:
      return { ...state, disabled: !state.disabled };

    case actions.SET_SOLVED:
      return { ...state, solved: [...state.solved, ...action.cards] };

    case actions.INCREMENT_MOVES:
      return { ...state, moveCount: state.moveCount + 1 };

    case actions.TOGGLE_MENU:
      return { ...state, showMenu: !state.showMenu };

    default:
      return state;
  }
};
export default boardReducer;
