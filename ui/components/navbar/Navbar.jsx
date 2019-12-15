import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useAuth0 } from '../../react-auth0-spa.js';
import { useStateValue } from '../../state/AppState.jsx';

import './navbar.css';
import Axios from 'axios';

function Navbar(props) {
  const [zipInput, updateZipInput] = useState('');
  const [{ zip }, dispatch] = useStateValue();

  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    getTokenSilently,
  } = useAuth0();

  const handleZipChange = (e) => {
    updateZipInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_ZIP', payload: zipInput });
    props.history.push('/forecast');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-custom bg-shade3 sticky-top">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
                {' '}
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/news">
                News
                {' '}
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/current">
                Current
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/forecast">
                Forecast
              </Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            )}
          </ul>
          <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Enter a zip"
              aria-label="Search"
              onChange={handleZipChange}
              value={zipInput}
            />
            <button
              className="btn btn-outline-shade4 my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          <div>
            {!isAuthenticated && (
              <button
                className="btn btn-outline-shade4 my-2 my-sm-0"
                onClick={() => loginWithRedirect({})}
              >
                Log in
              </button>
            )}

            {isAuthenticated && (
              <button
                className="btn btn-outline-shade4 my-2 my-sm-0"
                type="submit"
                onClick={() => logout()}
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navbar);
