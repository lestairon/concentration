import styled from "styled-components";

const Main = styled.div`
  background: #f3f3f3;
  border-radius: 10px;
  @media (min-width: 1025px) {
    height: auto;
    width: auto;
  }
  @media (max-width: 1920) {
    height: 1080;
    width: 1920;
  }
`;

const Board = styled.div`
  display: flex;
  height: inherit;
  flex-flow: wrap;
  justify-content: center;
`;
const MoveCounter = styled.h3`
  position: absolute;
  font-family: Nunito;
`;

const Card = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Nunito&display=swap");
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  font-family: Nunito, sans-serif;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  margin: 0.3em;
  width: 13vw;
  height: 40vh;
  min-width: 6.5em;
  max-height: 300px;
  min-height: 210px;
  cursor: pointer;
  &.active {
    animation: rotate-in-keyframes 0.6s;
  }
  @keyframes rotate-in-keyframes {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(180deg) scaleX(-1);
    }
  }
`;

const Menu = styled.div`
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

const Button = styled.button`
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

const ScoreList = styled.ol`
  font-family: Nunito;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  list-style: none;
  text-align: center;
  padding-left: 0;
`;

const ScoreListElement = styled.li`
  &::before {
    content: "";
    width: 65%;
    display: block;
    margin: auto;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
  }
`;

const Time = styled.div`
  font-family: Nunito;
  position: fixed;
  bottom: 0;
`;

export {
  Board,
  Main,
  MoveCounter,
  Card,
  Menu,
  Button,
  ScoreList,
  ScoreListElement,
  Time
};
