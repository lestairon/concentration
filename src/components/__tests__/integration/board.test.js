import * as actions from "../../../actions";
import Board from "../../Board";
import React from "react";
import { render, fireEvent, waitForDomChange } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../../../reducers";
import ScoreBoard from "../../ScoreBoard";
import thunk from "redux-thunk";
import "jest-styled-components";
import { getFirestore, reduxFirestore } from "redux-firestore";
import config, { firestoreDB } from "../../../config/config";

const component = (
  ui,
  {
    initialState,
    store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(thunk.withExtraArgument({ getFirestore })),
        reduxFirestore(config)
      )
    )
  } = {}
) => {
  return { ...render(<Provider store={store}>{ui}</Provider>), store };
};

describe("board responds correctly to state", () => {
  it("finishes the game correctly", () => {
    const { container, getByText } = component(<Board numberOfCards={1} />);
    fireEvent.click(container.firstChild.lastChild.firstChild);
    fireEvent.click(container.firstChild.lastChild.lastChild);
    expect(getByText(/restart/i)).toBeTruthy();
  });

  it("restarts the game", () => {
    const { container, getByText } = component(<Board numberOfCards={1} />);
    fireEvent.click(container.firstChild.lastChild.firstChild);
    fireEvent.click(container.firstChild.lastChild.lastChild);
    fireEvent.click(getByText(/restart/i));
    expect(container).toMatchSnapshot();
  });

  it("updates the move counter", () => {
    const { container } = component(<Board numberOfCards={1} />);
    expect(container.firstChild.firstChild.innerHTML).toBe("0");
    fireEvent.click(container.firstChild.lastChild.firstChild);
    fireEvent.click(container.firstChild.lastChild.lastChild);
    expect(container.firstChild.firstChild.innerHTML).toBe("1");
  });

  it("disables the board when 2 cards are flipped", () => {
    const { container } = component(<Board numberOfCards={2} />);
    fireEvent.click(container.firstChild.lastChild.firstChild);
    fireEvent.click(container.firstChild.lastChild.lastChild);
    fireEvent.click(container.firstChild.lastChild.firstChild.nextSibling);
    expect(
      container.firstChild.lastChild.firstChild.nextSibling.innerHTML
    ).toBe("");
  });

  it("shows the card for a short span of time if incorrect", async () => {
    jest.useFakeTimers();
    const { container } = component(<Board numberOfCards={2} order={true} />);
    jest.spyOn(actions, "runTimer").mockImplementation(() => ({ type: null }));
    fireEvent.click(container.firstChild.lastChild.firstChild);
    fireEvent.click(container.firstChild.lastChild.lastChild);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
    const spyResetFlipped = jest.spyOn(actions, "resetFlipped");
    jest.runAllTimers();
    expect(spyResetFlipped).toHaveBeenCalled();
    jest.useRealTimers();
  });
});

describe("score board functionality", () => {
  const mock = score =>
    jest.spyOn(firestoreDB, "collection").mockImplementation(() => ({
      add: () => Promise.resolve(),
      onSnapshot: cb => {
        setTimeout(() =>
          cb({
            docChanges: () => [
              {
                type: "added",
                doc: { data: () => ({ name: "test", score }) }
              }
            ]
          })
        );
      }
    }));

  it("fetch the score ", async () => {
    mock(1);
    const { queryByText } = component(
      <>
        <ScoreBoard />
        <Board numberOfCards={3} />
      </>
    );
    const scoreBoard = queryByText(/loading/i);
    await waitForDomChange({ container: scoreBoard });
    expect(scoreBoard).toMatchSnapshot();
  });

  it("updates after submitting new score", async () => {
    mock(420);
    const { container, queryByText } = component(
      <>
        <ScoreBoard />
        <Board numberOfCards={1} />
      </>
    );
    const cardContainer = container.lastChild.lastChild;
    fireEvent.click(cardContainer.firstChild);
    fireEvent.click(cardContainer.lastChild);
    const submitButton = queryByText(/submit score/i);
    expect(submitButton).toBeTruthy();
    fireEvent.click(submitButton);
    await waitForDomChange({ container: cardContainer });
    expect(cardContainer).toMatchSnapshot();
    expect(container.firstChild).toMatchSnapshot();
  });
});
