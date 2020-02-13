import React from 'react'

import { Link } from 'react-router-dom'

import KeywordDetails from './components/KeywordDetails/index'
import ScoreGraph from './components/ScoreGraph/index'

import './styles.scss'

class Keyword extends React.Component {
  constructor(props) {
    super(props);

    const { _id } = this.props.match.params;

    this.state = {
      _id,
    }
  }

  render() {
    return (
      <div className="Keywords">
        <div className="container">
          <div className="jumbotron">
            <Link className="btn btn-warning" to={`/keywords/${this.state._id}/graph`}>Show Graph</Link>
            <KeywordDetails _id={this.state._id}></KeywordDetails>
            <br/>
            <ScoreGraph keywordId={this.state._id}></ScoreGraph>
          </div>
        </div>
      </div>
    )
  }

}

export default Keyword;