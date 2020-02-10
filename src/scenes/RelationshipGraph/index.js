import React from 'react'

import Graph from './components/Graph/index'
import Menu from './components/Menu/index'

class RelationshipGraph extends React.Component {
  constructor(props) {
    super(props);

    const { _id } = this.props.match.params;

    this.state = {
      _id,
      entitiesAmount: 10,
      categoriesAmount: 10,
    }

    this.setEntitiesAmount = this.setEntitiesAmount.bind(this);
    this.setCategoriesAmount = this.setCategoriesAmount.bind(this);
  }

  setEntitiesAmount(amount) {
    this.setState({ entitiesAmount: amount });
  }

  setCategoriesAmount(amount) {
    this.setState({ categoriesAmount: amount });
  }

  render() {
    return (
      <div className="RelationshipGraph">
        <Menu
        entitiesAmount={this.state.entitiesAmount}
        categoriesAmount={this.state.categoriesAmount}
        setEntitiesAmount={this.setEntitiesAmount}
        setCategoriesAmount={this.setCategoriesAmount}
        ></Menu>

        <Graph _id={this.state._id}></Graph>
      </div>
    )
  }
}

export default RelationshipGraph;
