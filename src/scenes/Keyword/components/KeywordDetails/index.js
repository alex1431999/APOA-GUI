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
      score: null,
    }

    this.getData()
      .then(({ keyword, score }) => {
        this.setState({
          status: 'success',
          keyword: keyword.keyword_string,
          language: keyword.language,
          score,
        })
      })
      .catch(() => {
        this.setState({
          status: 'failed',
        });
      });
  }

  async getData() {
    const keywordRequest = apiService.getKeyword(this.props._id);
    const scoreRequest = apiService.getKeywordAvgScore(this.props._id);

    const keyword = await keywordRequest;
    const score = await scoreRequest;

    return { keyword, score: score.toFixed(3) };
  }

  render() {
  const details = (
    <div>
      <h1>{this.state.keyword} ({this.state.language})</h1>
      <h2>Average Score: {this.state.score}</h2>
    </div>
  )

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
