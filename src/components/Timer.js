import React from "react";
import { useSelector } from "react-redux";

const Timer = () => {
  const time = useSelector(
    ({ timer: { initialTime, passedTime } }) => passedTime - initialTime
  );
  return <div>{`Seconds ${Math.floor(time / 1000)}`}</div>;
};

export default Timer;
