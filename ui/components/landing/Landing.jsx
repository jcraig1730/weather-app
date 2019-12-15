import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useAuth0 } from '../../react-auth0-spa.js';


export default function Landing() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <div className="jumbotron bg-shade1 text-shade4">
      <h1 className="display-4">Welcome to the Weather App!</h1>
      <p className="lead">Thanks for visiting! Feel free to look at weather news or check out your forecast</p>
      <hr className="my-4" />

      {isAuthenticated
        ? (
          <div>
            <p>Click below to edit your profile</p>
            <Link className="btn btn-primary btn-lg" to="/profile" role="button">Profile</Link>
          </div>
        )
        : (
          <div>
            <p>Click below to create an account</p>
            <a className="btn btn-primary btn-lg" onClick={() => loginWithRedirect({})} role="button">Sign up</a>
          </div>
        )}
    </div>
  );
}
