import React from 'react'

class KeywordSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    }

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    const searchTerm = event.target.value;

    this.setState({ searchTerm }, this.updateList);
  }

  updateList() {
    this.props.search(this.state.searchTerm);
  }


  render() {
    return (
      <div className="KeywordSearch float-right">
        <input
          type="text"
          placeholder="Search..."
          value={this.state.searchTerm}
          onChange={this.handleOnChange}>
        </input>
      </div>
    )
  }
}

export default KeywordSearch;
