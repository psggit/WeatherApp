import { createReducer } from "@reduxjs/toolkit";
import {
  loginInProgress,
  loginFailed,
  loginSuccess,
  resetLoginField,
} from "./actions";

const initialValue = {
  loginInProgress: false,
  loginSuccess: false,
  loginFailed: false,
  profileData: null,
  errorMsg: "",
};

const loginReducer = createReducer(initialValue, {
  [loginSuccess]: (state, data) => {
    console.log("data", data);
    return {
      ...state,
      loginSuccess: true,
      loginFailed: false,
      loginInProgress: false,
      profileData: data.payload,
    };
  },
  [loginInProgress]: (state, data) => {
    return {
      ...state,
      loginSuccess: false,
      loginFailed: false,
      loginInProgress: true,
    };
  },
  [loginFailed]: (state, data) => {
    return {
      ...state,
      loginSuccess: false,
      loginFailed: true,
      loginInProgress: false,
    };
  },
  [resetLoginField]: (state, data) => {
    return {
      ...state,
      ...initialValue,
    };
  },
});

export { loginReducer };
