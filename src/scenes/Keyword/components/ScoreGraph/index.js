import React from 'react'
import { LineChart } from 'react-chartkick'
import 'chart.js'

import BasicLoader from '../../../../components/BasicLoader/index'

import apiService from '../../../../services/api/index'

class ScoreGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'loading',
      pointsAmount: 20,
      plottingData: null,
    }

    apiService.getCrawlsPlottingData(this.props.keywordId)
      .then((plottingData) => {
        this.setState({
          status: 'success',
          plottingData,
        })
      })
      .catch(() => {
        this.setState({
          status: 'failed',
        })
      });
  }

  accumulatePlottingData(plottingData) {
    if (plottingData.length === 0) {
      return [];
    }

    const pointsAmountToAccumulate = Math.ceil(plottingData.length / this.state.pointsAmount);

    const plottingDataAccumulated = [];
    let accumulator = 0;
    let point = plottingData[0];
    for (let i = 0; i < plottingData.length; i += 1) {
      if (i % pointsAmountToAccumulate === 0 && i !== 0) {
        point.score = accumulator / pointsAmountToAccumulate;
        plottingDataAccumulated.push(point);
        accumulator = 0;
        point = plottingData[i];
      }

      accumulator += plottingData[i].score;
    }

    return plottingDataAccumulated;
  }

  render() {
    let content = <BasicLoader/>;

    if (this.state.plottingData) {
      /* Accumulate plotting data points*/
      const plottingDataAccumulated = this.accumulatePlottingData(this.state.plottingData);

      /* Format data */
      const plottingDataFormatted = {};
      plottingDataAccumulated.forEach((point) => plottingDataFormatted[point.timestamp] = point.score);

      /* Plot graph */
      const graph = <LineChart round={2} min={-1} max={1} xtitle="Timestamp" ytitle="Sentiment" data={plottingDataFormatted}></LineChart>
      content = graph;
    }

    return (
      <div className="ScoreGraph text-center">
        {content}
      </div>
    )
  }
}

export default ScoreGraph;
