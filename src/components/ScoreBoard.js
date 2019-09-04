import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { firestoreDB } from "../config/config";

const List = styled.ol`
  position: absolute;
  top: 0;
`;

const ScoreBoard = () => {
  const [score, setScore] = useState([]);

  useEffect(() => {
    const data = firestoreDB.collection("scores");
    data.onSnapshot(QuerySnapshot => {
      QuerySnapshot.docChanges().forEach(change => {
        switch (change.type) {
          case "added":
            setScore(prevState => [
              ...prevState,
              { ...change.doc.data(), id: change.doc.id }
            ]);
            break;
          case "removed":
            setScore(prevState =>
              prevState.filter(score => score.id !== change.doc.id)
            );
            break;
          default:
            return;
        }
      });
    });
  }, []);

  return (
    <List>
      {score.length
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
