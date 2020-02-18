import React from 'react'

import BasicLoader from '../../../../components/BasicLoader/index'

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
    const details = <h1>{this.state.keyword} ({this.state.language})</h1>

    let content = <BasicLoader/>;

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
