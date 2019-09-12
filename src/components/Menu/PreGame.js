import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBoard, updateGame } from "../../actions";

const PreGame = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("easy");

  const handleSubmit = e => {
    e.preventDefault();
    const difficulty = {
      easy: 3,
      advanced: 6,
      hard: 10
    };
    dispatch(createBoard({ numberOfCards: difficulty[value] }));
    dispatch(updateGame());
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <form>
      <label htmlFor="cards">
        Select the difficulty:
        <select value={value} onChange={handleChange}>
          <option value="easy">Easy</option>
          <option value="advanced">Advanced</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={handleSubmit}>Ok</button>
      </label>
    </form>
  );
};

export default PreGame;
