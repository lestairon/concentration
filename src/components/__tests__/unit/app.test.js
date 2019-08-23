import App from "../../App";
import React from "react";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

test("renders correctly the Main component", () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
