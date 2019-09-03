import Board from "./Board";
import ScoreBoard from "./ScoreBoard";
import Timer from "./Timer";
import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { getFirestore, reduxFirestore } from "redux-firestore";
import config from "../config/config";

const enchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  enchancers(
    applyMiddleware(thunk.withExtraArgument({ getFirestore })),
    reduxFirestore(config)
  )
);

const App = () => {
  return (
    <Provider store={store}>
      <Board numberOfCards={3} />
      <ScoreBoard />
      <Timer />
    </Provider>
  );
};
export default App;
