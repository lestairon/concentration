import React, { useEffect } from "react";
import Card from "./Card";
import Counter from "./Counter";
import Menu from "./Menu";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  createBoard,
  toggleDisabled,
  setSolved,
  incrementMoves,
  toggleMenu,
  resetFlipped
} from "../actions";

const Board = ({ numberOfCards, order }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createBoard({ numberOfCards, order }));
  }, []);

  const cards = useSelector(({ state }) => state.cards);
  const flippedCards = useSelector(({ state }) => state.flippedCards);
  const solved = useSelector(({ state }) => state.solved);
  const moveCount = useSelector(({ state }) => state.moveCount);
  const showMenu = useSelector(({ state }) => state.showMenu);

  const cleanState = () => {
    dispatch(createBoard({ numberOfCards }));
  };

  const validateFlipped = () => {
    const [card1, card2] = flippedCards
      .slice(-2)
      .map(card => cards.find(object => object.key === card));
    if (card1 && card2 && card1.key !== card2.key) {
      dispatch(toggleDisabled());
      if (card1.value === card2.value) {
        dispatch(setSolved([card1.key, card2.key]));
      }
      dispatch(incrementMoves());
      setTimeout(() => {
        dispatch(resetFlipped());
        dispatch(toggleDisabled());
      }, 500);
    }
  };

  useEffect(validateFlipped, [flippedCards]);

  useEffect(() => {
    if (solved.length === cards.length) {
      dispatch(toggleMenu());
    }
  }, [solved]);

  return (
    <div className="board">
      <Counter moveCount={moveCount} />
      <div className="container">
        {showMenu ? (
          <Menu cleanState={cleanState} />
        ) : (
          cards.map(({ value, key }) => (
            <Card number={value} key={key} id={key} />
          ))
        )}
      </div>
    </div>
  );
};

Board.propTypes = {
  numberOfCards: PropTypes.number.isRequired,
  order: PropTypes.bool
};

export default Board;
