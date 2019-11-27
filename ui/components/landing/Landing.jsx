import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { zip: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { zip } = this.state;
    this.setState({ zip: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateZip(this.state.zip);
    this.props.history.push("/weather");
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>Please enter your zip:</p>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.zip}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(Landing);
