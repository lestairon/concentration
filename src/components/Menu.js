import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { submitScore } from "../actions";

const Menu = ({ cleanState }) => {
  const clickHandler = () => {
    cleanState();
  };
  const dispatch = useDispatch();

  const { moveCount, numberOfCards } = useSelector(
    ({ boardState }) => boardState
  );
  const time = useSelector(
    ({ timer: { initialTime, passedTime } }) => passedTime - initialTime
  );

  const submit = () => {
    const score = time * moveCount;
    dispatch(submitScore({ score, numberOfCards, moveCount, time }));
  };
  const { submitted } = useSelector(({ scoreBoard }) => scoreBoard);

  return (
    <div>
      <button onClick={clickHandler}>Restart</button>
      {!submitted && <button onClick={submit}>Submit score?</button>}
    </div>
  );
};

Menu.propTypes = {
  cleanState: PropTypes.func.isRequired
};

export default Menu;
