import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { flipCard } from "../actions";
import PropTypes from "prop-types";

const Card = ({ number, id }) => {
  const isFlipped = useSelector(
    ({ state }) => state.flippedCards.includes(id) || state.solved.includes(id)
  );
  const disabled = useSelector(({ state }) => state.disabled);
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (!disabled && !isFlipped) dispatch(flipCard(id));
  };

  return (
    <button
      className="card"
      onClick={clickHandler}
      style={{
        background: isFlipped ? "#FFF" : "#8762b8ab",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
      }}
    >
      {isFlipped ? number : ""}
    </button>
  );
};

Card.propTypes = {
  number: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};

export default Card;
