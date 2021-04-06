import { loginSuccess, loginInProgress, resetLoginField } from "./actions";

const loginSuccessAPI = (data) => {
  return (dispatch) => {
    dispatch(loginSuccess(data));
  };
};

const loginInProgressAPI = () => {
  return (dispatch) => {
    dispatch(loginInProgress());
  };
};

const resetLoginFieldAPI = () => {
  return (dispatch) => {
    dispatch(resetLoginField());
  };
};

export { loginSuccessAPI, loginInProgressAPI, resetLoginFieldAPI };
