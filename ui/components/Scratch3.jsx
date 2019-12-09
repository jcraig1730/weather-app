import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { googleAPIKey, weatherAPI } from "../../keys.js";
import Axios from "axios";

class Scratch extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      coords: { lat: "", lng: "" },
      zoom: 12,
      features: []
    };
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  handleMapClick(e) {
    console.log(e);
  }

  getWeather(northLat, eastLng, southLat, westLng) {
    return new Promise((resolve, reject) => {
      Axios.get(
        `http://api.openweathermap.org/data/2.5/box/city?bbox=${westLng},${northLat},${eastLng},${southLat},${this.state.zoom}&cluster=yes&format=json&APPID=${weatherAPI}`
      ).then(data => {
        const newFeatures = data.data.list.map(dataPoint =>
          this.jsonToGeoJson(dataPoint)
        );
        this.setState({ features: newFeatures });

        resolve();
      });
    }).catch(err => console.log(err));
  }

  jsonToGeoJson(weatherItem) {
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
  }

  centerMoved(mapProps, map) {
    console.log(mapProps.geometry);
    console.log(map.center.lat(), map.center.lng());
  }

  componentDidMount() {
    // Axios.get(
    //   `https://tile.openweathermap.org/map/clouds/5/1/1.png?appid=${weatherAPI}`
    // ).then(data => {
    //   Axios.post("http://localhost:3001/getdata", data);
    // });
    Axios.get(`http://localhost:3001/geo`)
      .then(data => {
        // const { northeast, southwest } = data.data.results[0].geometry.bounds;
        const northeast = { lat: 37.8, lng: -122.39 };
        const southwest = { lat: 37.702, lng: -122.49395 };
        this.getWeather(
          northeast.lat,
          northeast.lng,
          southwest.lat,
          southwest.lng
        ).then(() => {
          this.setState({
            coords: data.data.results[0].geometry.location,
            isLoading: false
          });
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const test = { lat: 37.771, lng: -122.4318 };
    let { lat, lng } = this.state.coords;
    lat = Number(lat);
    lng = Number(lng);
    const mapStyles = { width: "100%", height: "100%" };
    const MapImage = (
      <div className="contaner">
        <Map
          google={this.props.google}
          zoom={this.state.zoom}
          style={mapStyles}
          initialCenter={test}
          features={this.state.features}
          // initialCenter={{ lat: lat.toFixed(1), lng: lng.toFixed(1) }}
          onClick={this.handleMapClick}
          onDragend={this.centerMoved}
        >
          <Marker position={{ lat: 37.762391, lng: -122.439192 }} />
          {this.state.features.map(feature => {
            const [lng, lat] = feature.geometry.coordinates;
            return (
              <Marker
                title={feature.properties.city}
                name={feature.properties.city}
                position={{ lng, lat }}
                icon={{ url: feature.properties.icon }}
              />
            );
          })}
        </Map>
      </div>
    );

    return this.state.isLoading ? <div>loading</div> : <div>{MapImage}</div>;
  }
}

export default GoogleApiWrapper({ apiKey: googleAPIKey })(Scratch);
