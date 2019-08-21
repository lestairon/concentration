import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { flipCard } from "./actions";

const Card = ({ number, id, disabled }) => {
  const isFlipped = useSelector(
    ({ state }) => state.flippedCards.includes(id) || state.solved.includes(id)
  );
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (!disabled && !isFlipped) dispatch(flipCard(id));
  };

  return (
    <div
      className="card"
      onClick={clickHandler}
      style={{
        background: isFlipped ? "#FFF" : "#8762b8ab",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
      }}
    >
      {isFlipped ? number : ""}
    </div>
  );
};
export default Card;
