import * as actions from "../../../actions";
import Board from "../../Board";
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../../reducers";

afterEach(cleanup);
jest.useFakeTimers();
let store;

beforeEach(() => {
  store = createStore(rootReducer);
});

const component = ({ numberofCards, order }) =>
  render(
    <Provider store={store}>
      <Board numberOfCards={numberofCards} order={order} />
    </Provider>
  );

describe("board responds correctly to state", () => {
  it("finishes the game correctly", () => {
    const { container, getByText } = component({ numberofCards: 1 });
    fireEvent.click(container.firstChild.lastChild.firstChild);
    fireEvent.click(container.firstChild.lastChild.lastChild);
    expect(getByText(/restart/i)).toBeTruthy();
  });

  it("restarts the game", () => {
    const { container, getByText } = component({ numberofCards: 1 });
    fireEvent.click(container.firstChild.lastChild.firstChild);
    fireEvent.click(container.firstChild.lastChild.lastChild);
    fireEvent.click(getByText(/restart/i));
    expect(container).toMatchSnapshot();
  });

  it("updates the move counter", () => {
    const { container } = component({ numberofCards: 1 });
    expect(container.firstChild.firstChild.innerHTML).toBe("0");
    fireEvent.click(container.firstChild.lastChild.firstChild);
    fireEvent.click(container.firstChild.lastChild.lastChild);
    expect(container.firstChild.firstChild.innerHTML).toBe("1");
  });

  it("disables the board when 2 cards are flipped", () => {
    const { container } = component({ numberofCards: 2 });
    fireEvent.click(container.firstChild.lastChild.firstChild);
    fireEvent.click(container.firstChild.lastChild.lastChild);
    fireEvent.click(container.firstChild.lastChild.firstChild.nextSibling);
    expect(
      container.firstChild.lastChild.firstChild.nextSibling.innerHTML
    ).toBe("");
  });

  it("shows the card for a short span of time if incorrect", async () => {
    const { container } = component({ numberofCards: 2, order: true });
    fireEvent.click(container.firstChild.lastChild.firstChild);
    fireEvent.click(container.firstChild.lastChild.lastChild);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
    const spyResetFlipped = jest.spyOn(actions, "resetFlipped");
    jest.runAllTimers();
    expect(spyResetFlipped).toHaveBeenCalled();
  });
});
