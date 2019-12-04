import React from 'react'

class KeywordAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: ['de', 'en'],
    }
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
