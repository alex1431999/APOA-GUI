import React from 'react'

import BasicLoader from '../../../../components/BasicLoader/index'

import apiService from '../../../../services/api/index'

import './styles.scss'

class KeywordDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: null,
      language: null,
      score: 0,
    }

    this.getData()
      .then(({ keyword, score }) => {
        this.setState({
          keyword: keyword.keyword_string,
          language: keyword.language,
          score,
        })
      });
  }

  async getData() {
    const keywordRequest = apiService.getKeyword(this.props._id);
    const scoreRequest = apiService.getKeywordAvgScore(this.props._id);

    const keyword = await keywordRequest;
    let score = await scoreRequest;

    if (score) {
      score = score.toFixed(3);
    } else {
      score = 'no score yet.';
    }

    return { keyword, score };
  }

  render() {
  const details = (
    <div>
      <h1>{this.state.keyword} ({this.state.language})</h1>
      <p id="averageScore" className="float-left">Average Score: {this.state.score}</p>
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
