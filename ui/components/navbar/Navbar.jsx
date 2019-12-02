import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";

import "./navbar.css";

function Navbar(props) {
  const [zip, updatezip] = useState("");

  const handleChange = e => {
    updatezip(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.updateZip(zip);
    props.history.push("/forecast");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-custom bg-shade3">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
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
          </ul>
          <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Enter a zip"
              aria-label="Search"
              onChange={handleChange}
              value={zip}
            />
            <button
              className="btn btn-outline-shade4 my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navbar);
