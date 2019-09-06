import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { flipCard, runTimer } from "../actions";
import PropTypes from "prop-types";
import { CardDiv } from "./components";

const Card = ({ number, id }) => {
  const isFlipped = useSelector(
    ({ boardState }) =>
      boardState.flippedCards.includes(id) || boardState.solved.includes(id)
  );
  const { disabled } = useSelector(({ boardState }) => boardState);
  const dispatch = useDispatch();
  const isRunning = useSelector(({ timer: { running } }) => running);

  const clickHandler = () => {
    if (!disabled && !isFlipped) dispatch(flipCard(id));
    !isRunning && dispatch(runTimer());
  };

  return (
    <CardDiv
      isFlipped={isFlipped}
      onClick={clickHandler}
      className={isFlipped && "active"}
    >
      {isFlipped && number}
    </CardDiv>
  );
};

Card.propTypes = {
  number: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};

export default Card;
