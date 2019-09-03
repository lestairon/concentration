import App from "../../App";
import React from "react";
import { render } from "@testing-library/react";
import "jest-styled-components";

test("renders correctly the Main component", () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
