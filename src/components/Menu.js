import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { firestoreDB } from "../config/config";
import { MenuDiv, ButtonMenu } from "./components";
import ScoreBoard from "./ScoreBoard";

const Menu = ({ cleanState }) => {
  const clickHandler = () => {
    cleanState();
  };
  const [submitted, setSubmitted] = useState(false);

  const { moveCount, numberOfCards } = useSelector(
    ({ boardState }) => boardState
  );
  const time = useSelector(
    ({ timer: { initialTime, passedTime } }) => passedTime - initialTime
  );

  const submit = () => {
    firestoreDB
      .collection("scores")
      .add({
        card_pairs: numberOfCards,
        date: new Date(),
        moves: moveCount,
        name: "defaultUser",
        score: 100 / moveCount + 100 / time,
        time: time / 1000
      })
      .then(() => {
        setSubmitted(true);
      });
  };

  return (
    <MenuDiv>
      <ScoreBoard />
      <ButtonMenu onClick={clickHandler}>Restart</ButtonMenu>
      {!submitted && <ButtonMenu onClick={submit}>Submit score?</ButtonMenu>}
    </MenuDiv>
  );
};

Menu.propTypes = {
  cleanState: PropTypes.func.isRequired
};

export default Menu;
