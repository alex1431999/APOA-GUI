import React from 'react'

import { Link } from 'react-router-dom'

import TextSnippets from './components/TextSnippets/index'
import KeywordDetails from './components/KeywordDetails/index'
import ScoreGraph from './components/ScoreGraph/index'
import Statistics from './components/Statistics/index'

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
      <div id="Keyword" className="Keywords">
        <div className="container">
          <div className="jumbotron">
            <TextSnippets></TextSnippets>
            <Link className="btn btn-warning" to={`/keywords/${this.state._id}/graph`}>Show Graph</Link>
            <KeywordDetails _id={this.state._id}></KeywordDetails>
            <ScoreGraph keywordId={this.state._id}></ScoreGraph>
            <Statistics 
              _id={this.state._id} 
              key={this.state._id}>
            </Statistics>
          </div>
        </div>
      </div>
    )
  }

}

export default Keyword;
