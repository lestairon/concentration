import React from "react";
import { useSelector } from "react-redux";
import { StyledStopwatch } from "./components";

const Stopwatch = () => {
  const time = useSelector(
    ({ timer: { initialTime, passedTime } }) => passedTime - initialTime
  );
  return (
    <StyledStopwatch>{`Seconds ${Math.floor(time / 1000)}`}</StyledStopwatch>
  );
};

export default Stopwatch;
