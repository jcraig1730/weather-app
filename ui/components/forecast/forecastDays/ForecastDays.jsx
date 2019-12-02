import React, { useEffect, useState } from "react";
import moment from "moment";
import "./forecastDays.css";

export default function ForecastDays(props) {
  const [state, setstate] = useState("isLoading");
  const [days, setdays] = useState({});

  const imageMap = {
    day: {
      Rain: "09d",
      Clear: "01d",
      Clouds: "03d",
      thunderstorm: "11d"
    },
    night: {
      Rain: "09n",
      Clear: "01n",
      Clouds: "03n",
      thunderstorm: "11d"
    }
  };

  useEffect(() => {
    for (let i = 0; i < props.data.length; i++) {
      if (!days[props.data[i].timestamp.slice(0, "YYYY-MM-DD".length)]) {
        setstate(
          (days[props.data[i].timestamp.slice(0, "YYYY-MM-DD".length)] = {
            high: props.data[i].temp,
            low: props.data[i].temp,
            humidity: props.data[i].humidity,
            description: props.data[i].description
          })
        );
      } else {
        if (
          props.data[i].temp >
          days[props.data[i].timestamp.slice(0, "YYYY-MM-DD".length)].high
        ) {
          setstate(
            (days[props.data[i].timestamp.slice(0, "YYYY-MM-DD".length)].high =
              props.data[i].temp)
          );
        }
      }
      if (
        props.data[i].temp <
        days[props.data[i].timestamp.slice(0, "YYYY-MM-DD".length)].low
      ) {
        setstate(
          (days[props.data[i].timestamp.slice(0, "YYYY-MM-DD".length)].low =
            props.data[i].temp)
        );
      }
    }
    Object.keys(days).forEach(day => {
      setstate((days[day].icon = imageMap.day[days[day].description]));
    });
    setstate("ready");
    return () => {};
  });

  return (
    // <div className="container">
    <div className="row justify-content-center">
      {state === "isLoading" ? (
        <div className="spinner-border text-shade4" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        Object.keys(days).map(day => (
          <div
            className="col-12 col-sm-4 col-lg-2"
            style={{ width: "100%", height: "100%" }}
          >
            <div
              className="card text-shade4 bg-primary mb-3 mr-auto ml-auto"
              style={{
                maxWidth: "18rem",
                background: `url(http://openweathermap.org/img/wn/${days[day].icon}@2x.png)`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
              }}
              key={day.timestamp}
            >
              <div className="card-header">
                {moment(day).format("ddd, MMM Do")}
              </div>
              <div className="card-body">
                <div className="card-text">
                  <ul className="list-unstyled">
                    <li>{days[day].description}</li>
                    <li>Hi {Math.round(days[day].high)}&#8457;</li>
                    <li>Lo {Math.round(days[day].low)}&#8457;</li>
                    <li>{days[day].humidity}% Humidty</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    // </div>
  );
}
