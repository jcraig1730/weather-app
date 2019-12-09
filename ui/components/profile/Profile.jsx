import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { useStateValue } from "../../state/AppState.jsx";
import Axios from "axios";

export default function Profile() {
  const { user, loading } = useAuth0();
  const [{ userInfo }, dispatch] = useStateValue();
  const [name, setName] = useState("");
  const [home, setHome] = useState("");
  const [otherLocations, setOtherLocations] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = e => {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "home":
        setHome(e.target.value);
        break;
      case "other":
        setOtherLocations(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      updatedUserInfo: {
        name,
        home,
        otherLocations: otherLocations.split(",")
      }
    };
    Axios.put(`http://localhost:3002/api/users/${userInfo.id}`, data)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setName(userInfo.name);
    setHome(userInfo.home);
    setOtherLocations(userInfo.otherLocations);
  }, [userInfo]);
  
  return loading || !user ? (
    <div>loading</div>
  ) : (
    <form onSubmit={handleSubmit}>
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label col-form-label-lg">
          Name
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control form-control-lg"
            id="name"
            // placeholder={userInfo.name}
            onChange={handleChange}
            value={name}
          />
        </div>
      </div>
      {/* <div class="form-group row">
        <label for="email" class="col-sm-2 col-form-label col-form-label-lg">
          Email
        </label>
        <div class="col-sm-10">
          <input
            type="email"
            class="form-control form-control-lg"
            id="email"
            placeholder="col-form-label-lg"
            onChange={handleChange}
            value={email}
          />
        </div>
      </div> */}
      <div class="form-group row">
        <label for="home" class="col-sm-2 col-form-label col-form-label-lg">
          City
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control form-control-lg"
            id="home"
            // placeholder={userInfo.home}
            onChange={handleChange}
            value={home}
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="other" class="col-sm-2 col-form-label col-form-label-lg">
          Other Cities
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control form-control-lg"
            id="other"
            // placeholder={userInfo.otherLocations}
            onChange={handleChange}
            value={otherLocations}
          />
          <div className="help-block">Seperate cities by comma</div>
        </div>
      </div>
      <button className="submit">Submit</button>
    </form>
  );
}
