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
    this.updateData = this.updateData.bind(this);
  }

  updateData() {
    let i = 0;
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

  componentDidMount() {
    this.updateData();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("***STATE*****");
    console.log(this.state, prevState);
    console.log("***PROPS*****");
    console.log(this.props, prevProps);
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
      backgroundColor: "#ecfcff",
      lineColor: "red"
    };
    const chart = this.state.loading ? (
      <div class="spinner-border text-shade4" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    ) : (
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
    );

    return (
      <div id="forecast" className="mb-5">
        {chart}
      </div>
    );
  }
}

export default ForecastChart;
