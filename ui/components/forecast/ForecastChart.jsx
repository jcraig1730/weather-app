import moment from "moment";
var React = require("react");
var Component = React.Component;
import CanvasJSReact from "./canvas/canvasjs.react.js";
import "./forecastChart.css";
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
          name: "Temp",
          showInLegend: false,
          dataPoints: this.state.dataPoints
        }
      ],
      backgroundColor: "#dff6f0",
      lineColor: "red"
    };
    const chart = this.state.loading ? (
      "loading"
    ) : (
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
    );

    return <div id="forecast">{chart}</div>;
  }
}

export default ForecastChart;
