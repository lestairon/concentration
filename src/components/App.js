import Main from "./Main";
import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { getFirestore, reduxFirestore } from "redux-firestore";
import config from "../config/config";

const saveToLocalStorage = state => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("state", serializedState);
};

const loadFromLocalStorage = () => {
  const serializedState = localStorage.getItem("state");
  return JSON.parse(serializedState) || undefined;
};

const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore })),
    reduxFirestore(config)
  )
);

store.subscribe(() => saveToLocalStorage(store.getState()));

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
export default App;
