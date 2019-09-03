import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CounterH3 = styled.h3`
  width: 2vw;
  float: left;
`;

const Counter = ({ moveCount }) => {
  return <CounterH3>{moveCount}</CounterH3>;
};

Counter.propTypes = {
  moveCount: PropTypes.number.isRequired
};

export default Counter;
