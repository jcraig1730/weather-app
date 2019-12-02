import React, { useState, useEffect } from "react";
import axios from "axios";
import { weatherAPI } from "../../../keys";

export default function Current(props) {
  const [state, setState] = useState({});
  useEffect(() => {
    axios
      .get(
        `api.openweathermap.org/data/2.5/weather?zip=${props.zip}&APPID=${weatherAPI}&units=imperial`
      )
      .then(data => {
        console.log(data);
        // setState({
        //   high: data.high,
        //   low: data.low,
        //   humidity:
        // })
      });
    return () => {};
  });
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body bg-shade4 text-shade1">
        <ul>
          <li>hello</li>
          <li>goodbye</li>
        </ul>
      </div>
    </div>
  );
}
