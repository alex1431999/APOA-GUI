import React from 'react'

import apiService from '../../services/api/index'
import store from '../../store'

import KeywordAddForm from './components/KeywordAddForm/index'
import KeywordSearch from './components/KeywordSearch/index'
import KeywordList from './components/KeywordList/index'

import './styles.scss'

class Keywords extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      keywords: [],
      keywordsDisplayed: [],
    }

    this.subscribeToKeywords();

    apiService.getKeywords();

    this.search = this.search.bind(this);
  }

  search(searchTerm) {
    const keywords = JSON.parse(JSON.stringify(this.state.keywords));
    const keywordsDisplayed = keywords.filter(keyword => keyword.keyword_string.toLowerCase().includes(searchTerm.toLowerCase()));

    this.setState({ keywordsDisplayed });
  }

  subscribeToKeywords() {
    store.subscribe(() => {
      const keywords = store.getState().keywordManager.keywords;
      this.setState({ keywords, keywordsDisplayed: keywords });
    });
  }

  render() {
    return (
      <div className="Keywords">
        <div className="container">
          <div className="jumbotron">
            <KeywordAddForm/>
            <KeywordSearch
              search={this.search}
            />
            <br/><br/>
            <KeywordList
              keywords={this.state.keywordsDisplayed}
              key={this.state.keywordsDisplayed.length}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Keywords;
