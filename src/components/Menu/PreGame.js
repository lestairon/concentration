import React from "react";
import { useDispatch } from "react-redux";
import { createBoard } from "../../actions";
import { StyledForm } from "../components";

const PreGame = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const difficulty = {
      easy: 3,
      advanced: 6,
      hard: 10
    };
    dispatch(createBoard({ pairOfCards: difficulty[e.target.value] }));
  };

  return (
    <StyledForm>
      <label>Select a difficulty</label>
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

export default PreGame;
