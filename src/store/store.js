import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { rootReducer } from "./../reducer.js";

const store = configureStore({
  reducer: combineReducers({
    store: rootReducer,
  }),
  middleware: [thunk],
});

export default store;
