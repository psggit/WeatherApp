import {
  fetchingForecastInProgress,
  fetchForecastFailed,
  fetchForecastSuccess,
  resetForecastState,
} from "./actions";

const fetchForecastAPI = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchingForecastInProgress());
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${reqBody.lat}&lon=${reqBody.lng}&dt=${reqBody.dt}&appid=833ae7cf728331fea1d9fa826a022299`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        dispatch(fetchForecastSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchForecastFailed(error));
      });
  };
};

const resetForecastAPI = () => {
  return (dispatch) => {
    dispatch(resetForecastState());
  };
};

export { fetchForecastAPI, resetForecastAPI };
