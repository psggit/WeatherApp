import { connect } from "react-redux";
import ForecastComponent from "./ForecastComponent";
import { fetchForecastAPI, resetForecastAPI } from "./duck/index";
import { resetLoginFieldAPI } from "./../Login/duck";

const mapStateToProps = (state) => {
  return {
    loginSuccess: state.store.login.loginSuccess,
    profileData: state.store.login.profileData,
    fetchForecastSuccess: state.store.forecast.fetchForecastSuccess,
    fetchingForecastInProgress: state.store.forecast.fetchingForecastInProgress,
    forecastData: state.store.forecast.forecastData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchForecastAPI: (payload) => dispatch(fetchForecastAPI(payload)),
    resetForecastAPI: () => dispatch(resetForecastAPI()),
    resetLoginFieldAPI: () => dispatch(resetLoginFieldAPI()),
  };
};

const ForecastContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForecastComponent);

export { ForecastContainer };
