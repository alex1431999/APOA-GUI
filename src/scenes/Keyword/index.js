import React from 'react'

import KeywordDetails from './components/KeywordDetails/index'

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
            <KeywordDetails _id={this.state._id}></KeywordDetails>
          </div>
        </div>
      </div>
    )
  }

}

export default Keyword;
