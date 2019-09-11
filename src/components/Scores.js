import React, { useState, useEffect } from "react";
import { StyledScoreList, StyledScoreListElement } from "./components";
import { firestoreDB } from "../config/config";

const Scores = () => {
  const [score, setScore] = useState([]);

  useEffect(() => {
    const database = firestoreDB.collection("scores").limit(3);
    const removeListener = database.onSnapshot(QuerySnapshot => {
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
    return removeListener;
  }, []);

  return (
    <StyledScoreList>
      Top 3 players:
      {score.length
        ? score
            .sort((a, b) => b.score - a.score)
            .map(({ name, score }, i) => (
              <StyledScoreListElement key={i}>{`Player: ${name}
            Score: ${score.toLocaleString()}`}</StyledScoreListElement>
            ))
        : "Loading..."}
    </StyledScoreList>
  );
};
export default Scores;
