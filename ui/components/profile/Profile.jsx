import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useAuth0 } from '../../react-auth0-spa';
import { useStateValue } from '../../state/AppState.jsx';

export default function Profile() {
  const { user, loading, getTokenSilently } = useAuth0();
  const [{ userInfo }, dispatch] = useStateValue();
  const [name, setName] = useState('');
  const [home, setHome] = useState('');
  const [otherLocations, setOtherLocations] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'name':
        setName(e.target.value);
        break;
      case 'home':
        setHome(e.target.value);
        break;
      case 'other':
        setOtherLocations(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
    }
  };

  const getCityByZip = (zip) => new Promise((resolve, reject) => {
    Axios.get(`http://localhost:3003/api/citybyzip/${zip}`)
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err));
  });

  const getZipByCity = (city) => new Promise((resolve, reject) => {
    Axios.get(`http://localhost:3003/api/zipbycity/${city}`)
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err));
  });

  const isZip = (str) => {
    const test = parseInt(str);
    return test > 0;
  };

  const buildLocationObj = async (str) => {
    if (isZip(str)) {
      const city = await getCityByZip(str);
      return { zip: str, city: city[0].city };
    }
    const zip = await getZipByCity(str);
    return { zip: zip[0].zip, city: str };
  };

  const updateUsersProfile = async (data) => {
    const token = await getTokenSilently();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    Axios.put(`http://localhost:3002/api/users/${userInfo.id}`, data, config)
      .then(async ({ data }) => {
        const {
          home, name, otherLocations, id,
        } = data;
        await dispatch({
          type: 'SET_USER',
          payload: {
            home: home.city, name, otherLocations, id,
          },
        });
        await updateUserInfo();
      })
      .catch((err) => console.log({ err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newLocations;
    if (otherLocations.split) {
      newLocations = await Promise.all(
        otherLocations
          .split(',')
          .map((location) => buildLocationObj(location.trim())),
      );
    }

    const data = { updatedUserInfo: {} };
    if (name !== userInfo.name) {
      data.updatedUserInfo.name = name;
    }
    if (!userInfo.home || home.city !== userInfo.home.city) {
      data.updatedUserInfo.home = await buildLocationObj(home);
    }
    data.updatedUserInfo.otherLocations = newLocations;
    await updateUsersProfile(data);
  };

  const updateUserInfo = (payload) => {
    Axios.get(
      'http://localhost:3002/api/users/google-oauth2|114594183936957584797',
    ).then(({ data }) => dispatch({ type: 'SET_USER', payload: data }));
  };

  useEffect(() => {
    if (userInfo) {
      let cityList;
      if (userInfo.otherLocations) {
        cityList = userInfo.otherLocations.map(
          (location, idx) => location.city,
        );
      }
      setName(userInfo.name);
      setHome(userInfo.home && userInfo.home.city);
      setOtherLocations(cityList);
    }
  }, [
    userInfo && userInfo.name,
    userInfo && userInfo.home,
    userInfo && userInfo.otherLocations,
  ]);

  return loading || !user ? (
    <div>loading</div>
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="form-group row">
        <label
          htmlFor="name"
          className="col-sm-2 col-form-label col-form-label-lg"
        >
          Name
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control form-control-lg"
            id="name"
            // placeholder={userInfo.name}
            onChange={handleChange}
            value={name}
          />
        </div>
      </div>
      {/* <div className="form-group row">
        <label htmlFor="email" className="col-sm-2 col-form-label col-form-label-lg">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            className="form-control form-control-lg"
            id="email"
            placeholder="col-form-label-lg"
            onChange={handleChange}
            value={email}
          />
        </div>
      </div> */}
      <div className="form-group row">
        <label
          htmlFor="home"
          className="col-sm-2 col-form-label col-form-label-lg"
        >
          City
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control form-control-lg"
            id="home"
            // placeholder={userInfo.home}
            onChange={handleChange}
            value={home}
          />
        </div>
      </div>
      <div className="form-group row">
        <label
          htmlFor="other"
          className="col-sm-2 col-form-label col-form-label-lg"
        >
          Other Cities
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control form-control-lg"
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
