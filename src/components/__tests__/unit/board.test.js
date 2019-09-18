import Main from "../../Main";
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../../reducers";
import "jest-styled-components";

const mockStore = createStore(rootReducer);

const component = numberofCards =>
  render(
    <Provider store={mockStore}>
      <Main pairOfCards={numberofCards} />
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
