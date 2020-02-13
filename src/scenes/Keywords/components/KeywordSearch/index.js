import React from 'react'

class KeywordSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  handleOnChange(event) {
    console.log(event.target.value);
  }


  render() {
    return (
      <div className="KeywordSearch float-right">
        <input
          type="text"
          placeholder="Search..."
          onChange={this.handleOnChange}>
        </input>
      </div>
    )
  }
}

export default KeywordSearch;
