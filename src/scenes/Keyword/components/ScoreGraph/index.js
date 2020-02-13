import React from 'react'
import Loader from 'react-loader-spinner'
import { LineChart } from 'react-chartkick'
import 'chart.js'


import apiService from '../../../../services/api/index'

class ScoreGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'loading',
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

  render() {
    const loader = <Loader
      type="Triangle"
      color="#FFA500"
      height={100}
      width={100}
    />

    let content = loader;

    if (this.state.plottingData) {
      /* Format data */
      const formattedData = {};
      this.state.plottingData.forEach((point) => formattedData[point.timestamp] = point.score);

      /* Plot graph */
      const graph = <LineChart round={2} min={-1} max={1} xtitle="Timestamp" ytitle="Sentiment" data={formattedData}></LineChart>
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
