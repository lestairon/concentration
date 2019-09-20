import App from "../../App";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "jest-styled-components";
import { firestoreDB } from "../../../config/config";

jest.spyOn(firestoreDB, "collection").mockImplementation(() => ({
  onSnapshot: cb => {
    Promise.resolve(
      cb({
        docChanges: () => [
          {
            type: "added",
            doc: { data: () => ({ name: "test", score: 100 }) }
          }
        ]
      })
    );
  }
}));

test("renders correctly the Main component", () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
test("renders popup before board", () => {
  const { getByText, container } = render(<App />);
  const difficultyButton = getByText(/easy/i);
  fireEvent.click(difficultyButton);
  expect(container).toMatchSnapshot();
});
