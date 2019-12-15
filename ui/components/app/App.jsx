import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProtectedRoute from "../protectedRoute/ProtectedRoute.jsx";
import { useAuth0 } from "../../react-auth0-spa.js";
import { useStateValue } from "../../state/AppState.jsx";
import News from "../news/News.jsx";
import Forecast from "../forecast/Forecast.jsx";
import Navbar from "../navbar/Navbar.jsx";
import Current from "../current/Current.jsx";
import Profile from "../profile/Profile.jsx";
import Landing from "../landing/Landing.jsx";
import "./app.css";

export default function App() {
  const { isAuthenticated, user, loading } = useAuth0();
  const [{ userInfo, zip }, dispatch] = useStateValue();
  const { IP_GEOLOCATION_API_KEY, USERS_API_URL } = process.env;

  const getUser = () =>
    new Promise((resolve, reject) => {
      Axios.get(`${USERS_API_URL}/api/users/${user.sub}`)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });

  const createUser = newUser =>
    new Promise((resolve, reject) => {
      Axios.post(`${USERS_API_URL}/api/users`, newUser)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });

  const updateUserState = payload => dispatch({ type: "SET_USER", payload });

  const updateZipState = payload => dispatch({ type: "SET_ZIP", payload });

  const updateStateOnLogin = async user => {
    updateUserState(user);
    updateZipState(user.home.zip);
  };

  const getUserIp = async () => {
    const { data } = await Axios.get("https://api.ipify.org?format=json");
    return data.ip;
  };

  const findIpLocation = async ip => {
    const { data } = await Axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${IP_GEOLOCATION_API_KEY}&ip=${ip}&fields=geo`
    );
    return data.zipcode;
  };

  useEffect(() => {
    (async () => {
      const ip = await getUserIp();
      const localZip = await findIpLocation(ip);
      updateZipState(localZip);

      if (isAuthenticated && user && !loading) {
        let user = await getUser();
        if (!user.id) {
          user = createUser(user);
        }
        await updateStateOnLogin(user);
      }
    })();
  }, [loading]);

  return (
    <Router>
      <Navbar />
      <h1>Weather App</h1>
      {user && (
        <h3>
          Hello,
          {user.given_name}
        </h3>
      )}
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/news" exact>
          <News />
        </Route>
        <Route path="/forecast">
          <Forecast />
        </Route>
        <Route path="/current">
          <Current />
        </Route>
        <ProtectedRoute path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}
