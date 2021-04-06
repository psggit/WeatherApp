import { connect } from "react-redux";
import LoginComponent from "./LoginComponent";
import { loginSuccessAPI, loginInProgressAPI } from "./duck/index";

const mapStateToProps = (state) => {
  return {
    loginSuccess: state.store.login.loginSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccessAPI: (data) => dispatch(loginSuccessAPI(data)),
    loginInProgressAPI: () => dispatch(loginInProgressAPI()),
  };
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export { LoginContainer };
