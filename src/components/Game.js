import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledBoard } from "./components";
import {
  deleteCards,
  setSolved,
  toggleDisabled,
  incrementMoves,
  resetFlipped,
  stopTimer,
  finishGame
} from "../actions";
import Card from "./Card";
import PostGameMenu from "./Menu/PostGame";
import PreGameMenu from "./Menu/PreGame";

const Game = ({ ordered }) => {
  const dispatch = useDispatch();
  const { cards, gameState, flippedCards, solved, pairOfCards } = useSelector(
    ({ boardState }) => boardState
  );

  const cleanState = () => {
    dispatch(deleteCards());
  };

  useEffect(() => {
    if (solved.length === cards.length) {
      dispatch(stopTimer());
      setTimeout(() => {
        dispatch(finishGame());
      }, 850);
    }
  }, [solved, cards, dispatch]);

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

  const stateView = {
    started: <PreGameMenu ordered={ordered} />,
    inProgress: (
      <StyledBoard pairOfCards={pairOfCards}>
        {cards.map(({ value, key }) => (
          <Card number={value} key={key} id={key} />
        ))}
      </StyledBoard>
    ),
    finished: <PostGameMenu cleanState={cleanState} />
  };

  return stateView[gameState];
};
export default Game;
