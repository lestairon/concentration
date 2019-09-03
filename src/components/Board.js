import React, { useEffect } from "react";
import Card from "./Card";
import Counter from "./Counter";
import Menu from "./Menu";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  createBoard,
  toggleDisabled,
  setSolved,
  incrementMoves,
  toggleMenu,
  resetFlipped,
  stopTimer
} from "../actions";

const BoardDiv = styled.div`
  background: #9deed6ab;
  width: 50vw;
  height: 50vw;
  margin-left: auto;
  margin-right: auto;
`;

const ContainerDiv = styled.div`
  justify-content: space-around;
  flex-direction: column;
  display: flex;
  flex-wrap: wrap;
  height: inherit;
`;

const Board = ({ numberOfCards, order }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createBoard({ numberOfCards, order }));
  }, [dispatch, numberOfCards, order]);

  const cards = useSelector(({ boardState }) => boardState.cards);
  const flippedCards = useSelector(({ boardState }) => boardState.flippedCards);
  const solved = useSelector(({ boardState }) => boardState.solved);
  const moveCount = useSelector(({ boardState }) => boardState.moveCount);
  const showMenu = useSelector(({ boardState }) => boardState.showMenu);

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
      dispatch(stopTimer());
      dispatch(toggleMenu());
    }
  }, [solved, cards, dispatch]);

  return (
    <BoardDiv>
      <Counter moveCount={moveCount} />
      <ContainerDiv>
        {showMenu ? (
          <Menu cleanState={cleanState} />
        ) : (
          cards.map(({ value, key }) => (
            <Card number={value} key={key} id={key} />
          ))
        )}
      </ContainerDiv>
    </BoardDiv>
  );
};

Board.propTypes = {
  numberOfCards: PropTypes.number.isRequired,
  order: PropTypes.bool
};

export default Board;
