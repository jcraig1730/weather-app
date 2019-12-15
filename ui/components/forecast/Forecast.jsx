import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner.jsx';


import { useStateValue } from '../../state/AppState.jsx';
import ForecastDays from './forecastDays/ForecastDays.jsx';
import ForecastChart from './forecastChart/ForecastChart.jsx';
import { weatherAPI } from '../../../keys.js';

function Forecast(props) {
  const [{ zip, userInfo }, dispatch] = useStateValue();
  const [state, setState] = useState({
    city: '',
    forecastList: [],
    isLoading: true,
  });

  const fetchData = () => {
    setState({ isLoading: true });
    // let test = zip === "76309" ? "test" : "test2";
    // let test = "test2";
    axios
      .get(
        // "http://localhost:3001/" + test
        `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&APPID=${weatherAPI}&units=imperial`,
      )
      .then((data) => {
        setState({
          city: data.data.city.name,
          forecastList: data.data.list.map((node) => ({
            timestamp: node.dt_txt,
            temp: node.main.temp,
            humidity: node.main.humidity,
            description: node.weather[0].main,
          })),
          isLoading: false,
        });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    (async () => {
      if (!zip && userInfo.home) {
        await dispatch({ type: 'SET_ZIP', payload: zip });
      }
      fetchData();
    })();
  }, [zip]);

  return (
    <div>
      <div className="container-fluid py-5 px-5 bg-shade3 my-4">
        {state.isLoading ? (
          <LoadingSpinner />
        ) : (
          <ForecastChart
            style={{ width: '75vw' }}
            data={state.forecastList}
            city={state.city}
          />
        )}
      </div>

      {state.isLoading ? (
        <LoadingSpinner />
      ) : (
        <ForecastDays data={state.forecastList} />
      )}
    </div>
  );
}

export default withRouter(Forecast);
