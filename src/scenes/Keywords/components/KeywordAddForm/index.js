import React from 'react'

import apiService from '../../../../services/api/index'

class KeywordAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [],
    }

    this.setLanguages();
  }

  setLanguages() {
    apiService.getLanguagesAvailable()
      .then((languages) => {
        this.setState({languages})
      });
  }

  render() {
    return (
      <div className="KeywordAddForm">
        <input type="text" placeholder="Keyword"/>
        <select>
          {
            this.state.languages.map(language => <option value={language} key={language}>{language.toUpperCase()}</option> )
          }
        </select>
        <button className="btn btn-success">Add Keyword</button>
      </div>
    )
  }
}

export default KeywordAddForm;
