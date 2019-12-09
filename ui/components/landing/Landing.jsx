import React, { Component, useState } from "react";
import { withRouter } from "react-router-dom";
import { useStateValue } from "../../state/AppState.jsx";

function Landing(props) {
  const [zipInput, updateZipInput] = useState("");
  const [{ zip }, dispatch] = useStateValue();

  const handleChange = e => {
    updateZipInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: "SET_ZIP", payload: zipInput });
    props.history.push("/weather");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Please enter your zip:</p>
        <input type="text" onChange={handleChange} value={zipInput} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default withRouter(Landing);
