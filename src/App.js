import "./App.css";
import React from "react";
import { LoginContainer } from "./Login/index";
import { ForecastContainer } from "./Forecast/index";
import { Suspense } from "react";
import { Router } from "react-router";
import { Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { ErrorBoundary } from "react-error-boundary";

const history = createHistory();

function ErrorFallback({ error }) {
  return (
    <p style={{ color: "#C81922" }}>Something went wrong: {error.message}</p>
  );
}

function App() {
  return (
    <Suspense>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Provider store={store}>
          <Router history={history}>
            <Route exact path="/" component={LoginContainer} />
            <Route
              exact
              path="/weather-forecast"
              component={ForecastContainer}
            />
          </Router>
        </Provider>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
