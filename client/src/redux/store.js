import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import rootReducer from "./rootreducer";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore(
  { reducer: rootReducer },
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
