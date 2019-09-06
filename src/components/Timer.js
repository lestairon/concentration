import React from "react";
import { useSelector } from "react-redux";
import { TimerDiv } from "./components";

const Timer = () => {
  const time = useSelector(
    ({ timer: { initialTime, passedTime } }) => passedTime - initialTime
  );
  return <TimerDiv>{`Seconds ${Math.floor(time / 1000)}`}</TimerDiv>;
};

export default Timer;
