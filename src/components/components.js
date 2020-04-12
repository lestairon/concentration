import styled from "styled-components";

const StyledMain = styled.div`
  background: #f3f3f3;
  border-radius: 10px;
  min-height: 60vh;
  @media (min-width: 1025px) {
    height: auto;
    width: 100%;
  }
  @media (max-width: 1920) {
    height: 1080;
    width: 1920;
  }
`;

const StyledBoard = styled.div`
  --number-of-rows: ${({ pairOfCards }) =>
    Math.round(Math.sqrt(pairOfCards * 2))};
  --number-of-columns: ${({ pairOfCards }) =>
    (pairOfCards * 2) / Math.round(Math.sqrt(pairOfCards * 2))};
  display: grid;
  grid-template-rows: repeat(
    var(--number-of-rows),
    calc(85vmin / var(--number-of-rows))
  );
  grid-template-columns: repeat(
    var(--number-of-columns),
    calc(85vmin / var(--number-of-columns))
  );
  grid-row-gap: 2vmin;
  grid-column-gap: 2vmin;
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const StyledMoveCounter = styled.h3`
  z-index: 2;
  pointer-events: none;
  position: absolute;
  font-family: Nunito;
  font-size: 0.98em;
  opacity: 0.67;
`;

const StyledCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  font-family: Nunito, sans-serif;
  text-align: center;
  cursor: pointer;
  transition: transform 0.5s;
  transform-style: preserve-3d;
  &,
  & .cardback,
  & .cardfront {
    border-radius: 10px;
  }
  &:hover,
  & > *:hover {
    transform: scale(1.015);
  }
  &.active {
    transform: rotateY(180deg);
  }
  & .cardback,
  & .cardfront {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }
  & .cardfront {
    position: absolute;
    top: 0;
    left: 0;
  }
  & .cardback {
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const StyledMenu = styled.div`
  text-align: center;
  margin: auto;
  background-color: #fff;
  width: 20vw;
  border-radius: 20px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.6);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  min-width: 288px;
`;

const StyledButton = styled.button`
  position: relative;
  margin: 30px auto;
  cursor: pointer;
  overflow: hidden;
  border-width: 0;
  max-height: 47px;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  background-color: #fafafa;
  color: #000;
  transition: background-color 0.3s;
  display: block;
  padding: 12px 24px;
  grid-row-start: 2;
  grid-row-end: 3;
  &:hover {
    background-color: #c7c7c7;
  }
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    padding-top: 0;
    border-radius: 100%;
    background-color: rgba(236, 240, 241, 0.3);
    transform: translate(-50%, -50%);
  }
  &:active:before {
    width: 120%;
    padding-top: 120%;
    transition: width 0.2s ease-out, padding-top 0.2s ease-out;
  }
`;

const StyledScoreList = styled.ol`
  font-family: Nunito, sans-serif;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  list-style: none;
  text-align: center;
  padding-left: 0;
`;

const StyledScoreListElement = styled.li`
  &::before {
    content: "";
    width: 65%;
    display: block;
    margin: auto;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
  }
`;

const StyledStopwatch = styled.div`
  font-family: Nunito;
  position: fixed;
  bottom: 0;
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 80vh;
  width: 20%;
  margin: auto;
  & > label {
    position: absolute;
    top: calc(34% - 1em);
    font-family: Nunito;
  }
  & > button {
    box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
    padding: 10px 10px;
    letter-spacing: 1px;
    font-family: Quicksand;
    font-weight: bold;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    transition: all linear 0.2s;
    color: black;
    &:hover {
      background-color: mediumaquamarine;
      transform: scale(1.02);
    }
  }
`;

export {
  StyledBoard,
  StyledMain,
  StyledMoveCounter,
  StyledCard,
  StyledMenu,
  StyledButton,
  StyledScoreList,
  StyledScoreListElement,
  StyledStopwatch,
  StyledForm
};
