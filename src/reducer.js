import { combineReducers } from "redux";
import { loginReducer } from "./Login/index.js";
import { forecastReducer } from "./Forecast/index.js";

const rootReducer = combineReducers({
  login: loginReducer,
  forecast: forecastReducer,
});

export { rootReducer };
