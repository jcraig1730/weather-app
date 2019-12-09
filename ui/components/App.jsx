import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { useAuth0 } from "../react-auth0-spa.js";
import { useStateValue } from "../state/AppState.jsx";
import Landing from "./landing/Landing.jsx";
import Forecast from "./forecast/Forecast.jsx";
import Navbar from "./navbar/Navbar.jsx";
import Current from "./current/Current.jsx";
import Profile from "./profile/Profile.jsx";
import "./app.css";
import Axios from "axios";

export default function App() {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    getTokenSilently,
    loading
  } = useAuth0();

  const [{ zip1, userInfo1 }, dispatch] = useStateValue();

  const [zip, setZip] = useState("");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (isAuthenticated && user && !loading) {
      Axios.get(`http://localhost:3002/api/users/${user.sub}`).then(data => {
        if (!data.data) {
          const newUser = {
            user: {
              id: user.sub,
              name: user.name
            }
          };
          Axios.post(`http://localhost:3002/api/users`, newUser)
            .then(data => dispatch({ type: "SET_USER", payload: data.data }))
            .catch(err => console.log(err));
        } else {
          // setUserInfo(data.data);
          // console.log("here");
          dispatch({ type: "SET_USER", payload: data.data });
        }
      });
    }
  }, [isAuthenticated, loading]);

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          return isAuthenticated === true ? (
            <Component props={rest} />
          ) : (
            <Redirect to="/" />
          );
        }}
      />
    );
  };

  const setUser = userObj => {
    setUser(userObj);
  };

  function updateZip(zip) {
    setZip(zip);
  }

  return (
    // <StateProvider initialState={initialState} reducer={reducer}>
    <Router>
      <Navbar />
      <h1>Weather App</h1>
      {user && <h3>Hello, {user.given_name}</h3>}
      <Profile />
      <Switch>
        <Route path="/" exact={true}>
          <Landing />
        </Route>
        {/* <ProtectedRoute path="/forecast" component={Forecast} zip={zip} /> */}
        <Route path="/forecast">
          <Forecast zip={zip} />
        </Route>
        <Route path="/current">
          <Current />
        </Route>
        <ProtectedRoute path="/profile" component={Profile} />
      </Switch>
    </Router>
    // </StateProvider>
  );
}
