import Board from "../../Board";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../../reducers";

afterEach(cleanup);

const mockStore = createStore(rootReducer);

const component = numberofCards =>
  render(
    <Provider store={mockStore}>
      <Board numberOfCards={numberofCards} />
    </Provider>
  );

describe("correct functionality of the board", () => {
  it("displays the board correctly", () => {
    const { container } = component(3);
    expect(container).toMatchSnapshot();
  });
  it("shows no cards if the number is 0", () => {
    const { container } = component(0);
    expect(container).toMatchSnapshot();
  });
});
