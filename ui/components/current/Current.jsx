import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import imageMap from "../../../imageMap.js";
import { weatherAPI } from "../../../keys";
import WeatherMap from "./weatherMap/WeatherMap.jsx";
import { useStateValue } from "../../state/AppState.jsx";

export default function Current(props) {
  const [currentWeather, setCurrentWeather] = useState({});
  const [{ zip }, dispatch] = useStateValue();

  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/current"
        // `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${weatherAPI}&units=imperial`
      )
      .then(data => {
        setCurrentWeather({
          icon: data.data.weather[0].icon,
          temp: data.data.main.temp,
          description: data.data.weather[0].main,
          humidity: data.data.main.humidity,
          city: data.data.name,
          time: moment(data.data.dt).format("dddd, MM-DD-YYYY"),
          ready: true
        });
      });
    return () => {};
  }, []);
  return (
    <div>
      <div className="container d-flex justify-content-center">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={`${imageMap.day[currentWeather.description]}`}
            className="card-img-top"
            alt="..."
          />
          Currently in {currentWeather.city}
          <div className="card-body bg-shade4 text-shade1">
            {currentWeather.ready ? (
              <ul style={{ listStyle: "none", fontSize: "1.5em" }}>
                <li className="">{currentWeather.description}</li>
                <li className="">Temp {currentWeather.temp}&#8457;</li>
                <li className="">Humidity {currentWeather.humidity}%</li>
              </ul>
            ) : (
              <p>loading</p>
            )}
          </div>
        </div>
      </div>
      <WeatherMap />
    </div>
  );
}
