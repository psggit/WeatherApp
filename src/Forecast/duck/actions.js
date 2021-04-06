import { createAction } from "@reduxjs/toolkit";

const fetchingForecastInProgress = createAction("fetchingForecastInProgress");
const fetchForecastFailed = createAction("fetchForecastFailed");
const fetchForecastSuccess = createAction("fetchForecastSuccess");
const resetForecastState = createAction("resetForecastState");

export {
  fetchingForecastInProgress,
  fetchForecastFailed,
  fetchForecastSuccess,
  resetForecastState,
};
