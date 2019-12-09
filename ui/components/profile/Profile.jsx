import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { useStateValue } from "../../state/AppState.jsx";

export default function Profile() {
  const { user, loading } = useAuth0();
  const [{ userInfo }, dispatch] = useStateValue();

  useEffect(() => {}, [loading]);
  return loading || !user ? (
    <div>loading</div>
  ) : (
    <div className="container bg-shade1 px-2 py-2 px-md-5 py-md-3">
      <h3></h3>
      <div className="row py-2 pb-m-4">
        <div className="col-10 col-md-4 ">Name: {userInfo.name} </div>
        <div className="col-2 col-md-8">
          <small>
            <div className="btn btn-shade3 btn-sm">edit</div>
          </small>
        </div>
      </div>
      <div className="row py-2 pb-m-4">
        <div className="col-10 col-md-4">
          {" "}
          Home: {userInfo.home || "Add your hometown to track the weather"}{" "}
        </div>
        <div className="col-2 col-md-8">
          <small>edit</small>
        </div>
      </div>

      <div className="row py-2 pb-m-4">
        <div className="col-10 col-md-4">
          {" "}
          Cities:{" "}
          {userInfo.otherCities ||
            "Select other cities to keep tabs on their weather"}
        </div>
        <div className="col-2 col-md-8">
          <small>edit</small>
        </div>
      </div>
    </div>
  );
}
