import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Axios from 'axios';
import { googleAPIKey, weatherAPI } from '../../../../keys.js';
import LoadingSpinner from '../../LoadingSpinner.jsx';
import { useStateValue } from '../../../state/AppState.jsx';

function WeatherMap(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState({ lat: '', lng: '' });
  const [zoom, setZoom] = useState(12);
  const [features, setFeatures] = useState([]);
  const [{ zip }, dispatch] = useStateValue();

  const handleMarkerClick = (e) => {
    const { lat, lng } = e.position;

    Axios.get(
      // `http://localhost:3003/api/zipbycoords/${lat}/${lng}`
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleAPIKey}`,
    ).then(({ data }) => {
      const nextZip = data.results[0].formatted_address
        .match(/[0-9]{5}, \w*$/)[0]
        .slice(0, 5);
      dispatch({ type: 'SET_ZIP', payload: nextZip });
    });
  };

  const getWeather = (northLat, eastLng, southLat, westLng) => new Promise((resolve, reject) => {
    Axios.get(
      `http://api.openweathermap.org/data/2.5/box/city?bbox=${westLng},${northLat},${eastLng},${southLat},${zoom}&cluster=yes&format=json&APPID=${weatherAPI}`,
    ).then((data) => {
      const newFeatures = data.data.list.map((dataPoint) => jsonToGeoJson(dataPoint));
      setFeatures(newFeatures);
      resolve();
    });
  }).catch((err) => console.log(err));

  const jsonToGeoJson = (weatherItem) => {
    const feature = {
      type: 'Feature',
      properties: {
        city: weatherItem.name,
        weather: weatherItem.weather[0].main,
        temperature: weatherItem.main.temp,
        min: weatherItem.main.temp_min,
        max: weatherItem.main.temp_max,
        humidity: weatherItem.main.humidity,
        pressure: weatherItem.main.pressure,
        windSpeed: weatherItem.wind.speed,
        windDegrees: weatherItem.wind.deg,
        windGust: weatherItem.wind.gust,
        icon:
          `http://openweathermap.org/img/w/${
            weatherItem.weather[0].icon
          }.png`,
        coordinates: [weatherItem.coord.Lon, weatherItem.coord.Lat],
      },
      geometry: {
        type: 'Point',
        coordinates: [weatherItem.coord.Lon, weatherItem.coord.Lat],
      },
    };
    return feature;
  };

  const centerMoved = (mapProps, map) => {
    const center = { lat: map.center.lat(), lng: map.center.lng() };
    getWeather(
      center.lat + 2.5,
      center.lng + 2.5,
      center.lat - 2.5,
      center.lng - 2.5,
    );
  };

  useEffect(() => {
    if (zip) {
      Axios.get(`http://localhost:3003/api/coordsbyzip/${zip}`)
        .then(({ data }) => {
          const center = data[0];
          // the largest area the free weather api will allow is 5 deg squared, so add and subtract 2.5 to the center
          // to find the northeast and southeast corners
          getWeather(
            Number(center.lat) + 2.5,
            Number(center.lng) + 2.5,
            Number(center.lat) - 2.5,
            Number(center.lng) - 2.5,
          ).then(() => {
            setCoords(center);
            setIsLoading(false);
          });
        })
        .catch((err) => console.log(err));
    }
  }, [zip]);

  let { lat, lng } = coords;
  lat = Number(lat);
  lng = Number(lng);
  const mapStyles = { width: '100%', height: '476px' };
  const MapImage = (
    <div className="">
      <Map
        id="mymap"
        google={props.google}
        zoom={zoom}
        style={mapStyles}
        initialCenter={coords}
        features={features}
        onDragend={centerMoved}
        className="map"
      >
        {features.map((feature) => {
          const [lng, lat] = feature.geometry.coordinates;
          return (
            <Marker
              title={feature.properties.city}
              name={feature.properties.city}
              position={{ lng, lat }}
              icon={{ url: feature.properties.icon }}
              onClick={handleMarkerClick}
              key={feature.properties.city}
            />
          );
        })}
      </Map>
    </div>
  );

  return isLoading ? <LoadingSpinner /> : <div>{MapImage}</div>;
}

export default GoogleApiWrapper({ apiKey: googleAPIKey })(WeatherMap);
