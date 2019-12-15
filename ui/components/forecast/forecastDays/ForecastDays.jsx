import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './forecastDays.css';
import imageMap from '../../../../imageMap.js';

export default function ForecastDays(props) {
  const [isLoading, setstate] = useState(true);
  const [days, setdays] = useState({});

  const setStateFromProps = () => {
    for (let i = 0; i < props.data.length; i++) {
      if (!days[props.data[i].timestamp.slice(0, 'YYYY-MM-DD'.length)]) {
        (days[props.data[i].timestamp.slice(0, 'YYYY-MM-DD'.length)] = {
          high: props.data[i].temp,
          low: props.data[i].temp,
          humidity: props.data[i].humidity,
          description: props.data[i].description,
        }
        );
      } else if (
        props.data[i].temp
          > days[props.data[i].timestamp.slice(0, 'YYYY-MM-DD'.length)].high
      ) {
        (days[props.data[i].timestamp.slice(0, 'YYYY-MM-DD'.length)].high = props.data[i].temp);
      }
      if (
        props.data[i].temp
        < days[props.data[i].timestamp.slice(0, 'YYYY-MM-DD'.length)].low
      ) {
        (days[props.data[i].timestamp.slice(0, 'YYYY-MM-DD'.length)].low = props.data[i].temp);
      }
    }
    Object.keys(days).forEach((day) => {
      (days[day].icon = imageMap.day[days[day].description]);
    });
    setstate(false);
  };

  useEffect(() => {
    setStateFromProps();
  });
  return (
    <div className="row justify-content-center">
      {isLoading ? (
        <div className="spinner-border text-shade4" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        Object.keys(days).map((day) => (
          <div
            className="col-12 col-sm-4 col-lg-2"
            style={{ width: '100%', height: '100%' }}
            key={day}
          >
            <div
              className="card text-shade4 bg-primary mb-3 mr-auto ml-auto"
              style={{
                maxWidth: '18rem',
                background: `url(${days[day].icon})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <div className="lead">
                {moment(day).format('ddd, MMM Do')}
              </div>
              <div className="card-body">
                <div className="card-text">
                  <ul className="list-unstyled">
                    {}
                    <li>{days[day].description}</li>
                    <li>
Hi
                      {Math.round(days[day].high)}
&#8457;
                    </li>
                    <li>
Lo
                      {Math.round(days[day].low)}
&#8457;
                    </li>
                    <li>
                      {days[day].humidity}
% Humidty
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
