import moment from 'moment';
import React, { useState, useEffect } from 'react';
import CanvasJSReact from './canvas/canvasjs.react.js';
import './forecastChart.css';
import { useStateValue } from '../../../state/AppState.jsx';
import LoadingSpinner from '../../LoadingSpinner.jsx';


const { CanvasJS } = CanvasJSReact;
const { CanvasJSChart } = CanvasJSReact;

function ForecastChart(props) {
  const [{ zip }, dispatch] = useStateValue();
  const [state, setState] = useState({
    data: null,
    dataPoints: null,
    loading: true,
  });

  const updateData = () => {
    const i = 0;
    const dataPoints = [];
    const data = props.data.map((node, i) => {
      dataPoints.push({
        y: node.temp,
        label: moment(node.timestamp).format('ddd, hA'),
      });
      return {
        x: i + 1,
        y: node.temp,
      };
    });
    setState({ data, dataPoints, loading: false });
  };

  useEffect(() => {
    updateData();
  }, []);

  const options = {
    animationEnabled: true,
    title: {
      text: `Forecast for ${props.city}`,
    },
    axisY: {
      title: 'Temperature',
      includeZero: false,
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: 'spline',
        name: 'Temp',
        showInLegend: false,
        dataPoints: state.dataPoints,
      },
    ],
    backgroundColor: '#ecfcff',
    lineColor: 'red',
  };
  const chart = state.loading ? (
    <LoadingSpinner />
  ) : (
    <CanvasJSChart
      options={options}
      /* onRef={ref => chart = ref} */
    />
  );

  return (
    <div id="forecast" className="mb-5">
      {chart}
    </div>
  );
}

export default ForecastChart;
