// this component needs to be updated to a function in order to
// use hooks to set the state for zip

import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { googleAPIKey, weatherAPI } from "../../../../keys.js";
import Axios from "axios";
import { useStateValue } from "../../../state/AppState.jsx";

function Scratch(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLoading: true,
  //     coords: { lat: "", lng: "" },
  //     zoom: 12,
  //     features: []
  //   };
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState({ lat: "", lng: "" });
  const [zoom, setZoom] = useState(12);
  const [features, setFeatures] = useState([]);
  const [{ zip }, dispatch] = useStateValue();
  // this.handleMapClick = this.handleMapClick.bind(this);
  // this.handleMarkerClick = this.handleMarkerClick.bind(this);

  const handleMapClick = e => {
    console.log(e);
  };
  const handleMarkerClick = e => {
    console.log(e);
    const { lat, lng } = e.position;
    console.log(lat, lng);
    Axios.get(
      // "http://localhost:3001/loctozip"
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleAPIKey}`
    ).then(({ data }) => {
      console.log(data);
      const zip = data.results[0].address_components[6].long_name;
      console.log(zip);
      dispatch(zip, "SET_ZIP");
    });
  };

  const getWeather = (northLat, eastLng, southLat, westLng) => {
    return new Promise((resolve, reject) => {
      Axios.get(
        `http://api.openweathermap.org/data/2.5/box/city?bbox=${westLng},${northLat},${eastLng},${southLat},${zoom}&cluster=yes&format=json&APPID=${weatherAPI}`
      ).then(data => {
        console.log(data);
        const newFeatures = data.data.list.map(dataPoint =>
          jsonToGeoJson(dataPoint)
        );
        setFeatures(newFeatures);
        resolve();
      });
    }).catch(err => console.log(err));
  };

  const jsonToGeoJson = weatherItem => {
    var feature = {
      type: "Feature",
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
          "http://openweathermap.org/img/w/" +
          weatherItem.weather[0].icon +
          ".png",
        coordinates: [weatherItem.coord.Lon, weatherItem.coord.Lat]
      },
      geometry: {
        type: "Point",
        coordinates: [weatherItem.coord.Lon, weatherItem.coord.Lat]
      }
    };
    // returns object
    return feature;
  };

  const centerMoved = (mapProps, map) => {
    console.log(mapProps.geometry);
    console.log(mapProps);
    console.log(map.center.lat(), map.center.lng());
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/geo`)
      .then(data => {
        const center = data.data.results[0].geometry.location;
        // the largest area the free weather api will allow is 5 deg squared, so add and subtract 2.5 to the center
        // to find the northeast and southeast corners
        getWeather(
          center.lat + 2.5,
          center.lng + 2.5,
          center.lat - 2.5,
          center.lng - 2.5
        ).then(() => {
          setCoords(center);
          setIsLoading(false);
        });
      })
      .catch(err => console.log(err));
  }, []);

  let { lat, lng } = coords;
  lat = Number(lat);
  lng = Number(lng);
  const mapStyles = { width: "60vw", height: "476px" };
  const MapImage = (
    <div className="">
      <Map
        id="mymap"
        google={props.google}
        zoom={zoom}
        style={mapStyles}
        initialCenter={coords}
        features={features}
        onClick={handleMapClick}
        onDragend={centerMoved}
      >
        {features.map(feature => {
          const [lng, lat] = feature.geometry.coordinates;
          return (
            <Marker
              title={feature.properties.city}
              name={feature.properties.city}
              position={{ lng, lat }}
              icon={{ url: feature.properties.icon }}
              onClick={handleMarkerClick}
            />
          );
        })}
      </Map>
    </div>
  );

  return isLoading ? <div>loading</div> : <div>{MapImage}</div>;
}

export default GoogleApiWrapper({ apiKey: googleAPIKey })(Scratch);
