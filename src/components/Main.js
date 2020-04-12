import React from "react";
import MoveCounter from "./MoveCounter";
import Stopwatch from "./Stopwatch";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { StyledMain } from "./components";
import Game from "./Game";

const Main = () => {
  const { moveCount } = useSelector(({ boardState }) => boardState);

  return (
    <StyledMain>
      <MoveCounter moveCount={moveCount} />
      <Game />
      <Stopwatch />
    </StyledMain>
  );
};

Main.propTypes = {
  order: PropTypes.bool
};

export default Main;
