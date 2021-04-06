import { createReducer } from "@reduxjs/toolkit";
import {
  fetchingForecastInProgress,
  fetchForecastFailed,
  fetchForecastSuccess,
  resetForecastState,
} from "./actions";

const initialValue = {
  fetchingForecastInProgress: false,
  fetchForecastSuccess: false,
  fetchForecastFailed: false,
  forecastData: [],
  errorMsg: "",
};

const forecastReducer = createReducer(initialValue, {
  [fetchForecastSuccess]: (state, data) => {
    return {
      ...state,
      fetchForecastSuccess: true,
      fetchForecastFailed: false,
      forecastData: data.payload,
      fetchingForecastInProgress: false,
    };
  },
  [fetchingForecastInProgress]: (state, data) => {
    return {
      ...state,
      fetchForecastSuccess: false,
      fetchForecastFailed: false,
      fetchingForecastInProgress: true,
    };
  },
  [fetchForecastFailed]: (state, data) => {
    return {
      ...state,
      fetchForecastSuccess: false,
      fetchForecastFailed: true,
      fetchingForecastInProgress: false,
    };
  },
  [resetForecastState]: (state) => {
    return {
      ...state,
      ...initialValue,
    };
  },
});

export { forecastReducer };
