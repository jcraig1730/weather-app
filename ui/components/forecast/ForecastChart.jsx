// import React from "react";
// import LineChart from "react-svg-line-chart";
import moment from "moment";

// let dates = [];
// let data = [];

// for (let x = 1; x <= 30; x++) {
//   data.push({ x: x, y: Math.floor(Math.random() * 100) });
// }

// // data = [
// //   { x: 1, y: 3 },
// //   { x: 2, y: 4 },
// //   { x: 3, y: 4 }
// // ];

// export default class ForecastChart extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { activePoint: null, loading: true, dates: [], data: null };
//     this.handlePointHover = this.handlePointHover.bind(this);
//     // this.componentDidMount = this.componentDidMount.bind(this);
//   }

// componentDidMount() {
//   const start = new Date();
//   const data = this.props.data.map((node, i) => {
//     dates.push([moment(node.timestamp).format("ddd, hA")]);
//     return {
//       x: i + 1,
//       y: node.temp
//     };
//   });
//   this.setState({ dates, data, loading: false });
// }

//   handlePointHover = (activePoint, e) => {
//     this.setState({ activePoint });
//   };

//   render() {
//     const { activePoint } = this.state;
//     const { data, dates } = this.state;
//     const chart = data ? (
//       <LineChart
//         data={data.map((point, i) => ({
//           ...point,
//           active: activePoint && point.x === activePoint.x ? true : false
//         }))}
//         pointsOnHover={this.handlePointHover}
//         labelsFormatX={x => (x % 3 === 0 ? dates[x][0] : "")}
//         gridVisible={false}
//       />
//     ) : null;

//     return <div>{this.state.loading ? "loading" : chart}</div>;
//   }
// }
/* App.js */
var React = require("react");
var Component = React.Component;
import CanvasJSReact from "./canvas/canvasjs.react.js";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ForecastChart extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: null, dataPoints: [] };
  }

  componentDidMount() {
    let dataPoints = [];
    const data = this.props.data.map((node, i) => {
      dataPoints.push({
        y: node.temp,
        label: moment(node.timestamp).format("ddd, hA")
      });
      return {
        x: i + 1,
        y: node.temp
      };
    });
    this.setState({ dataPoints });
    this.setState({ data, dataPoints, loading: false });
  }

  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: `3 Day Forecast for ${this.props.city}`
      },
      axisY: {
        title: "Temperature",
        includeZero: false
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "spline",
          name: "temp",
          showInLegend: false,
          dataPoints: this.state.dataPoints
        }
      ]
    };
    const chart = this.state.loading ? (
      "loading"
    ) : (
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
    );

    return <div>{chart}</div>;
  }
}

export default ForecastChart;
