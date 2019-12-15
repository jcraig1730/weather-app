import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import imageMap from '../../../imageMap.js';
import { weatherAPI } from '../../../keys';
import WeatherMap from './weatherMap/WeatherMap.jsx';
import { useStateValue } from '../../state/AppState.jsx';
import './current.css';

import CurrentCard from './currentCard/CurrentCard.jsx';

export default function Current(props) {
  const [currentWeather, setCurrentWeather] = useState({});
  const [{ zip }, dispatch] = useStateValue();

  useEffect(() => {
    if (zip) {
      axios
        .get(
        // "http://localhost:3001/current"
          `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${weatherAPI}&units=imperial`,
        )
        .then((data) => {
          setCurrentWeather({
            icon: data.data.weather[0].icon,
            temp: data.data.main.temp,
            description: data.data.weather[0].main,
            humidity: data.data.main.humidity,
            city: data.data.name,
            time: moment(data.data.dt).format('dddd, MM-DD-YYYY'),
            ready: true,
          });
        });
    }
  }, [zip]);
  return (
    <div className="">
      {/* <div className="container"> */}
      <div className="container p-5 bg-primary">
        <div className="row">
          <div className="px-1 col-4">
            <CurrentCard currentWeather={currentWeather} />
          </div>
          <div className="px-1 col-8">
            <WeatherMap setZip={props.setZip} />
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
