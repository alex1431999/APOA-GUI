import React from 'react'
import Select from 'react-select'

import notificationService from '../../../../../../services/notification/index'
import apiService from '../../../../../../services/api/index'
import store from '../../../../../../store'

import './styles.scss'

class AddKeywordButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: [],
      selectedKeyword: null,
    }

    store.subscribe(() => {
      const keywords = JSON.parse(JSON.stringify(store.getState().keywordManager.keywords));
      const keywordsFormatted = keywords.map(keyword => {
        return { 
          value: keyword._id.$oid,
          label: `${keyword.keyword_string} (${keyword.language})`,
        }
      });

      this.setState({ keywords: keywordsFormatted });
    });

    apiService.getKeywords();

    this.handleOnChangeSelect = this.handleOnChangeSelect.bind(this);
    this.handleOnClickButton = this.handleOnClickButton.bind(this);
    this.handleOnKeyDownSelect = this.handleOnKeyDownSelect.bind(this);
  }

  handleOnChangeSelect(value) {
    this.setState({ selectedKeyword: value });
  }

  handleOnClickButton() {
    if (this.state.selectedKeyword == null) {
      return notificationService.display(
        'No Keyword Selected',
        'Please Select a Keyword.',
        notificationService.types.danger
      );
    }

    const _id = this.state.selectedKeyword.value;
    
    this.props.addKeyword(_id);

    notificationService.display(
      'Keyword Added',
      'Added Keyword to Graph.',
      notificationService.types.default
    );
  }

  handleOnKeyDownSelect(event) {
    if (event.key === 'Enter') {
      this.handleOnClickButton();
    }
  }

  render() {
    return (
      <div className="AddKeywordButton">
        <Select
          name="keyword"
          value={this.state.selectedKeyword}
          options={this.state.keywords}
          onChange={this.handleOnChangeSelect}
          onKeyDown={this.handleOnKeyDownSelect}
        />
        <button 
          type="button" 
          className="btn btn-warning" 
          id='addBtn'
          onClick={this.handleOnClickButton}>
            Add Keyword
          </button>
      </div>
    );
  }
}

export default AddKeywordButton;
