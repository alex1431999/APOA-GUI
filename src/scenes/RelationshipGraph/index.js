import React from 'react'

import Graph from './components/graph/index'
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
      keywords: [],
      keywordsDisplayed: [],
      refresh: false,
    }

    this.requestKeyword = this.requestKeyword.bind(this);
    this.setEntitiesAmount = this.setEntitiesAmount.bind(this);
    this.setCategoriesAmount = this.setCategoriesAmount.bind(this);
  }

  componentDidMount() {
    this.requestKeyword(this.state._id);
  }

  async requestKeyword(_id) {
    const keywordRequest = apiService.getKeyword(_id);
    const entitiesRequest = apiService.getEntities(_id, this.state.entitiesMax);
    const categoriesRequest = apiService.getCategories(_id, this.state.categoriesMax);

    const keyword = await keywordRequest;
    const entities = await entitiesRequest;
    const categories = await categoriesRequest;

    /* Remove keyword from entities and categories */
    entities.forEach(entitiy => delete entitiy.keyword);
    categories.forEach(category => delete category.keyword);

    keyword.entities = entities;
    keyword.categories = categories;

    // Append keyword
    this.setState({ keywords: [...this.state.keywords, keyword] }, this.setKeywordsDisplayed);
  }

  setKeywordsDisplayed() {
    const keywordsDisplayed = [];
    for (let i = 0; i < this.state.keywords.length; i += 1) {
      const keyword = JSON.parse(JSON.stringify(this.state.keywords[i]));

      keyword.entities = keyword.entities.slice(0, this.state.entitiesAmount);
      keyword.categories = keyword.categories.slice(0, this.state.categoriesAmount);

      keywordsDisplayed.push(keyword);
    }

    this.setState({ keywordsDisplayed, refresh: true }, () => this.setState({ refresh: false }));
  }

  setEntitiesAmount(amount) {
    this.setState({ entitiesAmount: amount }, this.setKeywordsDisplayed);
  }

  setCategoriesAmount(amount) {
    this.setState({ categoriesAmount: amount }, this.setKeywordsDisplayed);
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
        addKeyword={this.requestKeyword}
        ></Menu>

        <Graph
        keywords={this.state.keywordsDisplayed}
        key={this.state.refresh}
        ></Graph>
      </div>
    )
  }
}

export default RelationshipGraph;
