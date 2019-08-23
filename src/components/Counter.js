import React from "react";
import PropTypes from "prop-types";

const Counter = ({ moveCount }) => {
  return <h3 className="counter">{moveCount}</h3>;
};

Counter.propTypes = {
  moveCount: PropTypes.number.isRequired
};

export default Counter;
