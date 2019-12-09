import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { googleAPIKey, weatherAPI } from "../../keys.js";
import Axios from "axios";

class Scratch extends Component {
  constructor() {
    super();
    this.state = { weather: false };
  }
  componentDidMount() {
    Axios.get(
      `https://tile.openweathermap.org/map/clouds/5/1/1.png?appid=${weatherAPI}`
    ).then(data => {
      Axios.post("http://localhost:3001/getdata", data);
    });
  }
  render() {
    const mapStyles = { width: "100%", height: "100%" };
    const MapImage = (
      <Map
        google={this.props.google}
        zoom={5}
        style={mapStyles}
        initialCenter={{ lat: 1, lng: 1 }}
      />
    );

    return (
      <div>
        {/* {MapImage} */}
        <iframe
          src={`https://tile.openweathermap.org/map/clouds/5/1/1.png?appid=${weatherAPI}`}
          // style={{ height: "100%", width: "100%" }}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({ apiKey: googleAPIKey })(Scratch);
