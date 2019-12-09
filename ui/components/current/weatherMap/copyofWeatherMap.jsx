import React, { useEffect, useState } from "react";
import axios from "axios";
import { weatherAPI } from "../../../../keys.js";

export default function WeatherMap(props) {
  const [state, setState] = useState({ isLoading: true, map: null });
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://tile.openweathermap.org/map/clouds/30/20/3.png?appid=${weatherAPI}`
  //     )
  //     .then(data => {
  //       console.log(data.data);
  //       setState({ map: data.data, isLoading: false });
  //     })
  //     .catch(err => console.log(err));
  // }, []);
  return (
    <div>
      <img
        src={`https://tile.openweathermap.org/map/clouds/5/1/1.png?appid=${weatherAPI}`}
        // style={{ height: "100%", width: "100%" }}
      />
      <iframe
        src={`http://a.basemaps.cartocdn.com/#5/1/1`}
        frameborder="0"
      ></iframe>
    </div>
  );
  return state.isLoading ? <div>loading</div> : <div id="map"></div>;
}
