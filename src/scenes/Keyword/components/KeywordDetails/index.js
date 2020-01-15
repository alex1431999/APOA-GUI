import React from 'react'
import Loader from 'react-loader-spinner'

import apiService from '../../../../services/api/index'

class KeywordDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'loading',
      keyword: null,
      language: null,
    }

    apiService.getKeyword(this.props._id)
      .then((response) => {
        this.setState({
          status: 'success',
          keyword: response.keyword_string,
          language: response.language,
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

    const details = <h1>{this.state.keyword} ({this.state.language})</h1>

    let content = loader;

    if (this.state.keyword) {
      content = details;
    }

    return (
      <div className="KeywordDetails text-center">
        {content}
      </div>
    )
  }
}

export default KeywordDetails;
