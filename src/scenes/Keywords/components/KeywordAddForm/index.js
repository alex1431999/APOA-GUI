import React from 'react'

import notificationService from '../../../../services/notification/index'
import apiService from '../../../../services/api/index'

class KeywordAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [],
      languageSelected: '',
      keyword: '',
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputKeywordChange = this.handleInputKeywordChange.bind(this);

    this.setLanguages();
  }

  setLanguages() {
    apiService.getLanguagesAvailable()
      .then((languages) => {
        this.setState({languages, languageSelected: languages[0]})
      });
  }

  handleButtonClick() {
    apiService.addKeyword(this.state.keyword, this.state.languageSelected);
    notificationService.display(
      'Keyword Added', 
      `Added keyword ${this.state.keyword} (${this.state.languageSelected}).`, 
      notificationService.types.default
    );
  }

  handleSelectChange(event) {
    this.setState({ languageSelected: event.target.value })
  }

  handleInputKeywordChange(event) {
    this.setState({ keyword: event.target.value });
  }

  render() {
    return (
      <div className="KeywordAddForm float-left">
        <input type="text" placeholder="Keyword" onChange={this.handleInputKeywordChange}/>
        <select className="margin-left" onChange={this.handleSelectChange}>
          {
            this.state.languages.map(language => <option value={language} key={language}>{language.toUpperCase()}</option> )
          }
        </select>
        <button className="btn btn-primary margin-left" onClick={this.handleButtonClick}>Add Keyword</button>
      </div>
    )
  }
}

export default KeywordAddForm;
