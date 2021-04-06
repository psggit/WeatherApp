import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "react-google-login";
import "./Login.css";
import "./../i18n.js";
import { useTranslation } from "react-i18next";
import GoogleSvg from "./../icons/google.svg";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    cardRoot: {
      padding: 20,
      width: 500,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      [theme.breakpoints.down("sm")]: {
        width: 450,
      },
    },
    title: {
      fontWeight: 600,
      textAlign: "center",
      fontSize: 22,
    },
    buttonStyle: {
      margin: "20px 0",
      marginRight: 20,
    },
    highlightedButton: {
      background: "#0086AD",
      color: "#fff",
      margin: "20px 0",
      marginRight: 20,
    },
  })
);

function LoginHooks(props) {
  let history = useHistory();

  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState("en");

  const classes = useStyles();

  const DEFAULT_LANG = "en";
  const CLIENT_ID =
    "478509267293-ki0vg43bjgi7f9hcioap50d8utbao4do.apps.googleusercontent.com";

  //on login success navigate to /weather-forecast
  useEffect(() => {
    if (props.loginSuccess) {
      history.push("/weather-forecast");
    }
  }, [props.loginSuccess]);

  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    props.loginSuccessAPI(res.profileObj);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: CLIENT_ID,
    //isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  if (props.loginSuccess) {
    return <></>;
  }

  return (
    <div id="login" className="login-container">
      <div className="lang-switch">
        <Button
          variant="contained"
          onClick={() => handleLangChange("en")}
          className={
            selectedLang === DEFAULT_LANG
              ? classes.highlightedButton
              : classes.buttonStyle
          }
        >
          English
        </Button>
        <Button
          variant="contained"
          onClick={() => handleLangChange("hi")}
          className={
            selectedLang === "hi"
              ? classes.highlightedButton
              : classes.buttonStyle
          }
        >
          Hindi
        </Button>
      </div>
      <Card classes={{ root: classes.cardRoot }}>
        <p className={classes.title}>{t("welcomeAppText")}</p>

        <button onClick={signIn} className="signin-button">
          <img src={GoogleSvg} alt="google login" className="icon"></img>
          <span className="buttonText">{t("signInText")}</span>
        </button>
      </Card>
    </div>
  );
}

export default LoginHooks;
