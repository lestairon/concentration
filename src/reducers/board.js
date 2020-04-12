import * as actions from "../constants/actionTypes";

const initialState = {
  cards: [],
  flippedCards: [],
  disabled: false,
  solved: [""],
  moveCount: 0,
  pairOfCards: 0,
  gameState: "started"
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

  const states = {
    started: { next: "inProgress" },
    inProgress: { next: "finished" },
    finished: { next: "started" }
  };

  switch (action.type) {
    case actions.CREATE_BOARD: {
      const cards = createCards(action.pairOfCards, action.ordered);
      return {
        ...initialState,
        cards,
        solved: [],
        pairOfCards: action.pairOfCards,
        gameState: states[state.gameState].next
      };
    }

    case actions.RESET_GAME:
      return { ...initialState, gameState: states[state.gameState].next };

    case actions.RESET_FLIPPED:
      return { ...state, flippedCards: [] };

    case actions.FLIP_CARD:
      return {
        ...state,
        flippedCards: [
          ...state.flippedCards,
          { id: action.id, number: action.number }
        ]
      };

    case actions.TOGGLE_DISABLED:
      return { ...state, disabled: !state.disabled };

    case actions.SET_SOLVED:
      return { ...state, solved: [...state.solved, ...action.cards] };

    case actions.INCREMENT_MOVES:
      return { ...state, moveCount: state.moveCount + 1 };

    case actions.FINISH_GAME: {
      return { ...state, gameState: states.inProgress.next };
    }

    default:
      return state;
  }
};
export default boardReducer;
