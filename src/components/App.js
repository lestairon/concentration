import Board from "./Board";
import React from "react";
import { createStore } from "redux";
import rootReducer from "../reducers";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <Board numberOfCards={3} />
    </Provider>
  );
};
export default App;
