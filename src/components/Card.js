import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { flipCard, runTimer } from "../actions";
import PropTypes from "prop-types";
import cardBack from "../images/education.svg";
import { StyledCard } from "./components";

const Card = ({ number, id }) => {
  const isFlipped = useSelector(
    ({ boardState }) =>
      boardState.flippedCards.some(x => x.id === id) ||
      boardState.solved.includes(id)
  );
  const { disabled } = useSelector(({ boardState }) => boardState);
  const dispatch = useDispatch();
  const isRunning = useSelector(({ timer: { running } }) => running);

  const clickHandler = () => {
    if (!disabled && !isFlipped) dispatch(flipCard({ id, number }));
    !isRunning && dispatch(runTimer());
  };

  return (
    <StyledCard onClick={clickHandler} className={isFlipped && "active"}>
      <img
        src={cardBack}
        alt="Card"
        draggable="false"
        className="cardfront"
      ></img>
      <div className="cardback">{isFlipped && number}</div>
    </StyledCard>
  );
};

Card.propTypes = {
  number: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};

export default Card;
