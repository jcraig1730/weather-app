import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import ForecastDays from "./forecastDays/ForecastDays.jsx";
import ForecastChart from "./forecastChart/ForecastChart.jsx";
import { weatherAPI } from "../../../keys.js";

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = { city: "", forecastList: [], isLoading: true };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    const { zip } = this.props;
    this.setState({ isLoading: true });
    // let test = zip === "76309" ? "test" : "test2";
    let test = "test2";
    // console.log(test);
    axios
      .get(
        "http://localhost:3001/" + test
        // `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&APPID=${weatherAPI}&units=imperial`
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
          isLoading: false
        });
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    // if (!this.props.zip) {
    //   return this.props.history.push("/");
    // }
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.zip !== this.props.zip) {
      this.fetchData();
    }
  }

  render() {
    return (
      <div>
        {/* <div> */}
        {/* <div class="jumbotron bg-shade3"> */}
        <div class="container-fluid py-5 px-5 bg-shade3 my-4">
          {this.state.isLoading ? (
            <div>isLoading</div>
          ) : (
            <ForecastChart
              style={{ width: "75vw" }}
              data={this.state.forecastList}
              city={this.state.city}
            />
          )}
        </div>
        {/* </div> */}
        {/* </div> */}

        {this.state.isLoading ? (
          <div>loading</div>
        ) : (
          <ForecastDays data={this.state.forecastList} />
        )}
      </div>
    );
  }
}

export default withRouter(Forecast);
