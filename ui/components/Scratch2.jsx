import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { googleAPIKey, weatherAPI } from "../../keys.js";
import Axios from "axios";

class Scratch extends Component {
  constructor() {
    super();
    this.state = { isLoading: true, coords: { lat: "", lng: "" } };
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  handleMapClick(e) {
    console.log(e);
  }

  componentDidMount() {
    Axios.get(
      `https://tile.openweathermap.org/map/clouds/5/1/1.png?appid=${weatherAPI}`
    ).then(data => {
      Axios.post("http://localhost:3001/getdata", data);
    });
    Axios.get(`http://localhost:3001/geo`)
      .then(data => {
        this.setState({
          coords: data.data.results[0].geometry.location,
          isLoading: false
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let { lat, lng } = this.state.coords;
    lat = Number(lat);
    lng = Number(lng);
    const mapStyles = { width: "100%", height: "100%" };
    const MapImage = (
      <div className="contaner">
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: lat.toFixed(1), lng: lng.toFixed(1) }}
          onClick={this.handleMapClick}
        >
          <Marker name="home sweet home" title="home sweet home" />
          <div>hello world</div>
        </Map>
      </div>
    );

    return this.state.isLoading ? <div>loading</div> : <div>{MapImage}</div>;
  }
}

export default GoogleApiWrapper({ apiKey: googleAPIKey })(Scratch);
