import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./landing/Landing.jsx";
import Forecast from "./forecast/Forecast.jsx";
import Navbar from "./navbar/Navbar.jsx";
import Current from "./current/Current.jsx";
import "./app.css";

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
        <Navbar updateZip={this.updateZip} />
        <h1>Weather App</h1>
        <Switch>
          <Route path="/" exact={true}>
            <Landing updateZip={this.updateZip} />
          </Route>
          <Route path="/forecast">
            <Forecast zip={this.state.zip} />
          </Route>
          <Route path="/current">
            <Current zip={this.state.zip} />
          </Route>
        </Switch>
      </Router>
    );
  }
}
