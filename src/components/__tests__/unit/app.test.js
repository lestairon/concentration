import App from "../../App";
import React from "react";
import { render, waitForDomChange, fireEvent } from "@testing-library/react";
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
  const { getByLabelText, getByText, container } = render(<App />);
  const numberInput = getByLabelText(/number of cards/i);
  const submitButton = getByText(/Ok/i);
  fireEvent.change(numberInput, { target: { value: 3 } });
  fireEvent.click(submitButton);
  expect(container).toMatchSnapshot();
});
