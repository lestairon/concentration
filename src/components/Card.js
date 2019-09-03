import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { flipCard, runTimer } from "../actions";
import PropTypes from "prop-types";
import styled from "styled-components";

const CardButton = styled.button`
  width: 10vw;
  height: 16vw;
  outline: none;
  border: 0;
  padding: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background: ${props => (props.isFlipped ? "#FFF" : "#8762b8ab")};
`;

const Card = ({ number, id }) => {
  const isFlipped = useSelector(
    ({ boardState }) =>
      boardState.flippedCards.includes(id) || boardState.solved.includes(id)
  );
  const disabled = useSelector(({ boardState }) => boardState.disabled);
  const dispatch = useDispatch();
  const isRunning = useSelector(({ timer: { running } }) => running);

  const clickHandler = () => {
    if (!disabled && !isFlipped) dispatch(flipCard(id));
    !isRunning && dispatch(runTimer());
  };

  return (
    <CardButton isFlipped={isFlipped} onClick={clickHandler}>
      {isFlipped ? number : ""}
    </CardButton>
  );
};

Card.propTypes = {
  number: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};

export default Card;
