import React from "react";
import PropTypes from "prop-types";
import { StyledMoveCounter } from "./components";

const MoveCounter = ({ moveCount }) => {
  return <StyledMoveCounter>Number of moves: {moveCount}</StyledMoveCounter>;
};

MoveCounter.propTypes = {
  moveCount: PropTypes.number.isRequired
};

export default MoveCounter;
