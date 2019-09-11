import React from "react";
import { useSelector } from "react-redux";
import { Time } from "./components";

const Stopwatch = () => {
  const time = useSelector(
    ({ timer: { initialTime, passedTime } }) => passedTime - initialTime
  );
  return <Time>{`Seconds ${Math.floor(time / 1000)}`}</Time>;
};

export default Stopwatch;
