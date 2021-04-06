import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./ForecastStyle.css";
import "./../i18n.js";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";

const getDayLabel = (dayId) => {
  let dayLabelText;
  switch (dayId) {
    case 0:
      dayLabelText = "Sunday";
      break;
    case 1:
      dayLabelText = "Monday";
      break;
    case 2:
      dayLabelText = "Tuesday";
      break;
    case 3:
      dayLabelText = "Wednesday";
      break;
    case 4:
      dayLabelText = "Thursday";
      break;
    case 5:
      dayLabelText = "Friday";
      break;
    case 6:
      dayLabelText = "Saturday";
      break;
    default:
      break;
  }
  return dayLabelText;
};

const ForecastComponent = (props) => {
  let history = useHistory();

  const [forecastDataList, setForecastDataList] = useState([]);
  const [cityData, setCityData] = useState();
  const { t, i18n } = useTranslation();
  const defaultLang = localStorage.getItem("language");

  //fetch and stores the coordinates in localstrage
  useEffect(() => {
    i18n.changeLanguage(defaultLang ? defaultLang : "en");
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      return;
    }
    function success(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const coordinates = {
        lat: lat,
        lng: lng,
      };
      fetchForecastData(coordinates);
      localStorage.setItem("coordinates", JSON.stringify(coordinates));
    }
    function error() {
      console.log("Unable to retrieve your location");
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  //hits forecast endpt every five minutes
  useEffect(() => {
    const coordinates = localStorage.getItem("coordinates")
      ? JSON.parse(localStorage.getItem("coordinates"))
      : null;

    if (props.loginSuccess && coordinates) {
      const interval = setInterval(() => {
        fetchForecastData(coordinates);
      }, 100000);
      return () => clearInterval(interval);
    }
  }, [props.loginSuccess]);

  //if login is not successful, navigate to login page
  useEffect(() => {
    if (!props.loginSuccess) {
      history.push("/");
    }
  }, [props.loginSuccess]);

  //process and stores the forecast data
  useEffect(() => {
    if (props.fetchForecastSuccess) {
      const forecastData = props.forecastData.list.filter((item) =>
        item.dt_txt.includes("06:00:00")
      );
      const forecastCity = props.forecastData.city;
      setForecastDataList(forecastData);
      setCityData(forecastCity);
    }
  }, [props.fetchForecastSuccess]);

  //reset the localStorage and global state
  const handleLogout = () => {
    props.resetLoginFieldAPI();
    props.resetForecastAPI();
    localStorage.clear();
  };

  const fetchForecastData = (coordinates) => {
    props.fetchForecastAPI({
      dt: new Date().getTime(),
      lat: coordinates.lat,
      lng: coordinates.lng,
    });
  };

  const RenderForecasts = () => {
    return (
      <div className="content">
        {forecastDataList.map((item) => {
          const dateValue = `${item.dt * 1000}`;
          const day = new Date(parseInt(dateValue));

          return (
            <div className="forecastContainer">
              <h4>{getDayLabel(day.getDay())}</h4>
              <p>{Moment(day).format("MMMM Do, hh:mm a")}</p>
              <img
                src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
              />
              <p>
                <b>{(item.main.temp - 273.15).toFixed(2)} °C</b>
              </p>
              <p>{item.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    );
  };

  if (!props.loginSuccess) {
    return <></>;
  }

  return (
    <React.Fragment>
      <Button
        variant="contained"
        className="logout"
        onClick={() => handleLogout()}
        style={{ position: "absolute", top: 20, right: 20 }}
      >
        {t("logoutText")}
      </Button>
      <div id="forecastWrapper">
        {props.fetchingForecastInProgress && (
          <div className="progress-bar">
            <CircularProgress
              variant="determinate"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              size={40}
              thickness={4}
              {...props}
              value={100}
            />
          </div>
        )}
        {props.fetchForecastSuccess && forecastDataList.length > 0 && (
          <>
            <h2 className="header">
              {t("welcomeText", {
                name: props.profileData.givenName,
                city: cityData.name,
              })}
            </h2>

            <h2 className="subtitle">{t("forecastText")}</h2>
            <RenderForecasts />
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default ForecastComponent;
