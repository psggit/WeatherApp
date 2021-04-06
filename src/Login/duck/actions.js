import { createAction } from "@reduxjs/toolkit";

const loginInProgress = createAction("loginInProgress");
const loginFailed = createAction("loginFailed");
const loginSuccess = createAction("loginSuccess");
const resetLoginField = createAction("resetLoginField");

export { loginInProgress, loginFailed, loginSuccess, resetLoginField };
