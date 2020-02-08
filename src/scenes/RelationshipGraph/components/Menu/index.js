import React from 'react'

import AddKeywordButton from './components/AddKeywordButton'

import './styles.scss'

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      maxEntities: 100,
      maxCategories: 100,
    }
  }

  render() {
    return (
      <div className="Menu">
        <label for="entityRange">Entity Amount</label>
        <input type="range" class="custom-range" id="entityRange" min="0" max={this.state.maxEntities}></input>
        <label for="categoryRange">Category Amount</label>
        <input type="range" class="custom-range" id="categoryRange" min="0" max={this.state.maxCategories}></input>
        <AddKeywordButton></AddKeywordButton>
      </div>
    );
  }
}

export default Menu;
