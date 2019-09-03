import Card from "../../Card";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../../reducers";
import "jest-styled-components";
import * as actions from "../../../actions";

const mockStore = createStore(rootReducer);

jest.spyOn(actions, "runTimer").mockReturnValue({ type: null });

const component = (number, id) =>
  render(
    <Provider store={mockStore}>
      <Card number={number} id={id} />
    </Provider>
  );

describe("card functionality", () => {
  it("card renders correctly", () => {
    const { container } = component(3, 0);
    expect(container).toMatchSnapshot();
  });

  it("flips the card on click", () => {
    const { container } = component(3, 0);
    expect(container.firstChild.textContent).toBe("");
    fireEvent.click(container.firstChild);
    expect(container.firstChild.textContent).toBe("3");
  });

  it("doesnt allow to unflip the card", () => {
    const { container } = component(3, 0);
    fireEvent.click(container.firstChild);
    fireEvent.click(container.firstChild);
    expect(container.firstChild.textContent).toBe("3");
  });
});
