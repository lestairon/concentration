import React from "react";
import PropTypes from "prop-types";
import { CounterH3 } from "./components";

const Counter = ({ moveCount }) => {
  return <CounterH3>{moveCount}</CounterH3>;
};

Counter.propTypes = {
  moveCount: PropTypes.number.isRequired
};

export default Counter;
