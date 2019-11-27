import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./landing/Landing.jsx";
import Forecast from "./forecast/Forecast.jsx";

export default class App extends Component {
  constructor() {
    super();
    this.state = { zip: "" };
    this.updateZip = this.updateZip.bind(this);
  }

  updateZip(zip) {
    this.setState({ zip });
  }
  render() {
    return (
      <Router>
        <h1>Weather App</h1>
        <Switch>
          <Route path="/" exact={true}>
            <Landing updateZip={this.updateZip} />
          </Route>
          <Route path="/weather">
            <Forecast zip={this.state.zip} />
          </Route>
        </Switch>
      </Router>
    );
  }
}
