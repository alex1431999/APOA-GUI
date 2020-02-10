import React from 'react'

import Graph from './components/Graph/index'
import Menu from './components/Menu/index'

import apiService from '../../services/api/index'

class RelationshipGraph extends React.Component {
  constructor(props) {
    super(props);

    const { _id } = this.props.match.params;

    this.state = {
      _id,
      entitiesMax: 50,
      categoriesMax: 50,
      entitiesAmount: 10,
      categoriesAmount: 10,
      entities: [],
      entitiesDisplayed: [],
      categories: [],
      categoriesDisplayed: [],
    }

    this.setEntitiesAmount = this.setEntitiesAmount.bind(this);
    this.setCategoriesAmount = this.setCategoriesAmount.bind(this);
  }

  componentDidMount() {
    /* Request graph data */
    this.requestEntities(this.state._id, this.state.entitiesMax);
    this.requestCategories(this.state._id, this.state.categoriesMax);
  }

  requestEntities(_id, limit) {
    apiService.getEntities(_id, limit)
      .then((entities) => {
        const entitiesDisplayed = entities.slice(0, this.state.entitiesAmount);

        this.setState({ entities, entitiesDisplayed });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  requestCategories(_id, limit) {
    apiService.getCategories(_id, limit)
    .then((categories) => {
      const categoriesDisplayed = categories.slice(0, this.state.categoriesAmount);

      this.setState({ categories, categoriesDisplayed });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  setEntitiesAmount(amount) {
    const entitiesDisplayed = this.state.entities.slice(0, amount);

    this.setState({ entitiesAmount: amount, entitiesDisplayed });
  }

  setCategoriesAmount(amount) {
    const categoriesDisplayed = this.state.categories.slice(0, amount);

    this.setState({ categoriesAmount: amount, categoriesDisplayed });
  }

  render() {
    return (
      <div className="RelationshipGraph">
        <Menu
        entitiesMax={this.state.entitiesMax}
        categoriesMax={this.state.categoriesMax}
        entitiesAmount={this.state.entitiesAmount}
        categoriesAmount={this.state.categoriesAmount}
        setEntitiesAmount={this.setEntitiesAmount}
        setCategoriesAmount={this.setCategoriesAmount}
        ></Menu>

        <Graph
        entities={this.state.entitiesDisplayed}
        categories={this.state.categoriesDisplayed}
        key={this.state.entitiesDisplayed.length + this.state.categoriesDisplayed.length}
        ></Graph>
      </div>
    )
  }
}

export default RelationshipGraph;
