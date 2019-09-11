import * as actions from "../../../actions";
import Board from "../../Main";
import React from "react";
import { render, fireEvent, waitForDomChange } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../../../reducers";
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
  it("finishes the game correctly", async () => {
    const { container, getByText } = component(<Board numberOfCards={1} />);
    const cards = container.firstChild.firstChild.nextSibling;
    fireEvent.click(cards.firstChild);
    fireEvent.click(cards.lastChild);
    await waitForDomChange({ container });
    expect(getByText(/restart/i)).toBeTruthy();
  });

  it("restarts the game", async () => {
    const { container, getByText } = component(<Board numberOfCards={1} />);
    const cards = container.firstChild.firstChild.nextSibling;
    fireEvent.click(cards.firstChild);
    fireEvent.click(cards.lastChild);
    await waitForDomChange({ container });
    fireEvent.click(getByText(/restart/i));
    expect(container).toMatchSnapshot();
  });

  it("updates the move counter", () => {
    const { container } = component(<Board numberOfCards={1} />);
    expect(container.firstChild.firstChild.innerHTML).toBe("0");
    const cards = container.firstChild.firstChild.nextSibling;
    fireEvent.click(cards.firstChild);
    fireEvent.click(cards.lastChild);
    expect(container.firstChild.firstChild.innerHTML).toBe("1");
  });

  it("disables the board when 2 cards are flipped", () => {
    const { container } = component(<Board numberOfCards={2} />);
    const cards = container.firstChild.firstChild.nextSibling;
    fireEvent.click(cards.firstChild);
    fireEvent.click(cards.lastChild);
    fireEvent.click(cards.firstChild.nextSibling);
    expect(cards.firstChild.nextSibling.innerHTML).toBe("");
  });

  it("shows the card for a short span of time if incorrect", async () => {
    jest.useFakeTimers();
    const { container } = component(<Board numberOfCards={2} order={true} />);
    const cards = container.firstChild.firstChild.nextSibling;
    jest.spyOn(actions, "runTimer").mockImplementation(() => ({ type: null }));
    fireEvent.click(cards.firstChild);
    fireEvent.click(cards.lastChild);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 800);
    const spyResetFlipped = jest.spyOn(actions, "resetFlipped");
    jest.runAllTimers();
    expect(spyResetFlipped).toHaveBeenCalled();
    jest.useRealTimers();
  });
});

describe("score board functionality", () => {
  const mock = score =>
    jest.spyOn(firestoreDB, "collection").mockImplementation(() => ({
      limit: () => ({
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
      }),
      add: () => Promise.resolve()
    }));

  it("fetch the score ", async () => {
    mock(1);
    const { container } = component(<Board numberOfCards={0} />);
    await waitForDomChange({ container });
    const scoreBoard = container.firstChild.firstChild.nextSibling.firstChild;
    expect(scoreBoard).toMatchSnapshot();
  });

  it("updates after submitting new score", async () => {
    mock(420);
    const { container, queryByText } = component(<Board numberOfCards={1} />);
    const cards = container.firstChild.firstChild.nextSibling;
    fireEvent.click(cards.firstChild);
    fireEvent.click(cards.lastChild);
    await waitForDomChange({ container });
    const submitButton = queryByText(/submit score/i);
    expect(submitButton).toBeTruthy();
    fireEvent.click(submitButton);
    await waitForDomChange({ container });
    const scoreBoard = container.firstChild.firstChild.nextSibling.firstChild;
    expect(scoreBoard).toMatchSnapshot();
  });
});
