import React from 'react'

import apiService from '../../../../services/api/index'
import store from '../../../../store';

class KeywordList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: []
    }

    store.subscribe(() => this.setState({keywords: store.getState().keywordManager.keywords}));

    apiService.getKeywords();
  }

  render() {
    return (
      <div className="KeywordList">
        <ul className="list-group">
          {
            this.state.keywords.map((keyword, key) => {
              return <li className="list-group-item" key={key}>{keyword.keyword_string} ({keyword.language})</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default KeywordList;
