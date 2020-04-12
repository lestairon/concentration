import React from "react";
import { useDispatch } from "react-redux";
import { createBoard } from "../../actions";
import { StyledForm } from "../components";
import PropTypes from "prop-types";

const PreGame = ({ ordered }) => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const difficulty = {
      test: 1,
      easy: 3,
      advanced: 6,
      hard: 10
    };
    dispatch(createBoard({ pairOfCards: difficulty[e.target.value], ordered }));
  };

  return (
    <StyledForm>
      <label>Select a difficulty</label>
      <button
        value="test"
        style={{ display: "none" }}
        data-testid="button"
        onClick={handleSubmit}
      ></button>
      <button className="easy" value="easy" onClick={handleSubmit}>
        Easy
      </button>
      <button className="advanced" value="advanced" onClick={handleSubmit}>
        Advanced
      </button>
      <button className="hard" value="hard" onClick={handleSubmit}>
        Hard
      </button>
    </StyledForm>
  );
};

PreGame.propTypes = {
  ordered: PropTypes.bool
};

export default PreGame;
