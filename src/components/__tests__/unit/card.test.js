import Card from "../../Card";
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../../reducers";

afterEach(cleanup);

const mockStore = createStore(rootReducer);

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
