import App from "../../App";
import React from "react";
import { render } from "@testing-library/react";
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
