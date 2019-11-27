import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import ForecastChart from "./ForecastChart.jsx";
import { weatherAPI } from "../../../keys.js";

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = { city: "", forecastList: [], loading: true };
  }
  componentDidMount() {
    if (!this.props.zip) {
      return this.props.history.push("/");
    }
    const { zip } = this.props;
    axios
      .get(
        // "http://localhost:3001/test"
        `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&APPID=${weatherAPI}&units=imperial`
      )
      .then(data => {
        this.setState({
          city: data.data.city.name,
          forecastList: data.data.list.map(node => ({
            timestamp: node.dt_txt,
            temp: node.main.temp,
            humidity: node.main.humidity,
            description: node.weather[0].main
          })),
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div>
          {this.state.loading ? (
            <div>loading</div>
          ) : (
            <ForecastChart
              data={this.state.forecastList}
              city={this.state.city}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Forecast);
