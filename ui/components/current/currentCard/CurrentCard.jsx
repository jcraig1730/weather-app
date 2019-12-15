import React from 'react';
import imageMap from '../../../../imageMap.js';
import LoadingSpinner from '../../LoadingSpinner.jsx';

export default function CurrentCard({ currentWeather }) {
  return (
    currentWeather.ready
      ? (
        <div className="card w-100 bg-shade2" style={{ width: '18rem' }}>
          <img
            src={`${imageMap.day[currentWeather.description]}`}
            className="card-img-top"
            alt="..."
          />
      Currently in
          {' '}
          {currentWeather.city}
          <div className="card-body bg-shade4 text-shade1">
            <ul style={{ listStyle: 'none', fontSize: '1.5em' }}>
              <li className="">{currentWeather.description}</li>
              <li className="">
Temp
                {currentWeather.temp}
&#8457;
              </li>
              <li className="">
Humidity
                {currentWeather.humidity}
%
              </li>
            </ul>

          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )
  );
}
