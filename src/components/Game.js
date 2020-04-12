import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledBoard } from "./components";
import {
  deleteCards,
  toggleDisabled,
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

  const resetFlippedCards = () => {
    if (flippedCards.length < 2) return;
    setTimeout(() => {
      dispatch(resetFlipped());
      dispatch(toggleDisabled());
    }, 800);
  };

  useEffect(resetFlippedCards, [flippedCards]);

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
