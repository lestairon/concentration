import { StyledBoard } from "../../components";
import Card from "../../Card";
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../../reducers";
import "jest-styled-components";

const mockStore = createStore(rootReducer);

const component = pairOfCards => {
  const cards = Array.from({ length: pairOfCards * 2 }, (_, i) =>
    Math.floor(i / 2)
  ).map((value, index) => ({ value, key: index }));
  return render(
    <Provider store={mockStore}>
      <StyledBoard pairOfCards={pairOfCards}>
        {cards.map(({ value, key }) => (
          <Card number={value} key={key} id={key} />
        ))}
      </StyledBoard>
    </Provider>
  );
};

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
