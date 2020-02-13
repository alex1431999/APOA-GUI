import React from 'react'

import AddKeywordButton from './components/AddKeywordButton'

import './styles.scss'

class Menu extends React.Component {
  constructor(props) {
    super(props);

    const {
      entitiesMax,
      entitiesAmount,
      categoriesMax,
      categoriesAmount,
    } = this.props;

    this.state = {
      entitiesMax,
      categoriesMax,
      entitiesAmount,
      categoriesAmount,
    }

    this.handleEntitiesChange = this.handleEntitiesChange.bind(this);
    this.handleCategoriesChange = this.handleCategoriesChange.bind(this);
  }

  setEntitiesAmount(amount) {
    /* Apply change in amount to this state and parent state */
    this.setState({ entitiesAmount: amount });
    this.props.setEntitiesAmount(amount);
  }

  setCategoriesAmount(amount) {
    /* Apply change in amount to this state and parent state */
    this.setState({ categoriesAmount: amount });
    this.props.setCategoriesAmount(amount);
  }

  handleEntitiesChange(event) {
    this.setEntitiesAmount(event.target.value);
  }

  handleCategoriesChange(event) {
    this.setCategoriesAmount(event.target.value);
  }

  render() {
    return (
      <div className="Menu">
        <label>Entity Amount {this.state.entitiesAmount}</label>
        <input
          type="range" 
          className="custom-range" 
          id="entityRange" min="0" 
          max={this.state.entitiesMax} 
          value={this.state.entitiesAmount}
          onChange={this.handleEntitiesChange}>

          </input>

        <label>Category Amount {this.state.categoriesAmount}</label>
        <input
          type="range" 
          className="custom-range" 
          id="categoryRange" 
          min="0" 
          max={this.state.categoriesMax}
          value={this.state.categoriesAmount}
          onChange={this.handleCategoriesChange}>

          </input>
        <AddKeywordButton
          addKeyword={this.props.addKeyword}
        >

        </AddKeywordButton>
      </div>
    );
  }
}

export default Menu;
