import React, { useEffect } from "react";
import Card from "./Card";
import MoveCounter from "./MoveCounter";
import Stopwatch from "./Stopwatch";
import Menu from "./Menu";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { StyledMain, StyledBoard } from "./components";
import {
  createBoard,
  toggleDisabled,
  setSolved,
  incrementMoves,
  toggleMenu,
  resetFlipped,
  stopTimer
} from "../actions";
const Main = ({ numberOfCards, ordered }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createBoard({ numberOfCards, ordered }));
  }, [dispatch, numberOfCards, ordered]);

  const { showMenu, moveCount, solved, flippedCards, cards } = useSelector(
    ({ boardState }) => boardState
  );

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
      }, 800);
    }
  };

  useEffect(validateFlipped, [flippedCards]);

  useEffect(() => {
    if (solved.length === cards.length) {
      dispatch(stopTimer());
      setTimeout(() => {
        dispatch(toggleMenu());
      }, 850);
    }
  }, [solved, cards, dispatch]);

  return (
    <StyledMain>
      <MoveCounter moveCount={moveCount} />
      {showMenu ? (
        <Menu cleanState={cleanState} />
      ) : (
        <StyledBoard numberOfCards={numberOfCards}>
          {cards.map(({ value, key }) => (
            <Card number={value} key={key} id={key} />
          ))}
        </StyledBoard>
      )}
      <Stopwatch />
    </StyledMain>
  );
};

Main.propTypes = {
  numberOfCards: x =>
    isFinite(x) && typeof x === "number" && Math.floor(x) === x && x,
  ordered: PropTypes.bool
};

export default Main;
