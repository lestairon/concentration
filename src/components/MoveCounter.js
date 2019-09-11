import React from "react";
import PropTypes from "prop-types";
import * as S from "./components";

const MoveCounter = ({ moveCount }) => {
  return <S.MoveCounter>{moveCount}</S.MoveCounter>;
};

MoveCounter.propTypes = {
  moveCount: PropTypes.number.isRequired
};

export default MoveCounter;
