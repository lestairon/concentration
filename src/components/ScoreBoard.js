import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loadScore } from "../actions";

const List = styled.ol`
  position: absolute;
  top: 0;
`;

const ScoreBoard = () => {
  const score = useSelector(({ scoreBoard }) => scoreBoard.score);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadScore());
  }, [dispatch]);

  return (
    <List>
      {score
        ? score
            .sort((a, b) => b.score - a.score)
            .map(({ name, score }, i) => (
              <li key={i}>{`Player: ${name}
            Score: ${score.toLocaleString()}`}</li>
            ))
        : "Loading..."}
    </List>
  );
};
export default ScoreBoard;
