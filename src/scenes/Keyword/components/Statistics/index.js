import React from 'react'

import apiService from '../../../../services/api/index'

import BasicLoader from '../../../../components/BasicLoader/index'

import Table from './components/Table'

import './styles.scss'

class Statistics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entities: [],
      entityLimit: 10,
      entityTableRender: false,
      categories: [],
      categoryLimit: 10,
      categoryTableRender: false,
    }

    this.requestEntities();
    this.requestCategories();
  
    this.requestEntities = this.requestEntities.bind(this);
    this.requestCategories = this.requestCategories.bind(this);
  }

  async requestEntities() {
    const data = await apiService.getEntities(this.props._id, this.state.entityLimit);
    
    const entities = data.map((entity) => {
      return { 
        'Entity': entity.value,
        'Count': entity.count,
        'Score': entity.score.toFixed(3),
      }
    });

    this.setState({ entities, entityTableRender: true });
  }

  async requestCategories() {
    const data = await apiService.getCategories(this.props._id, this.state.categoryLimit);

    const categories = data.map((category) => {
      return {
        'Category': category.value,
        'Count': category.count,
        'Confidence': category.confidence.toFixed(3),
      }
    }); 

    this.setState({ categories, categoryTableRender: true });
  }

  render() {
    const content = [];

    if (this.state.entityTableRender) {
      const table = (
        <div id="entityTable" key='entityTable'>
          <Table
            data={this.state.entities}
            title='Most Relevant Entities'
          ></Table>
        </div>
      )
      content.push(table)
    } else {
      content.push(<BasicLoader key="entityLoader"/>)
    }

    if (this.state.categoryTableRender) {
      const table = (
        <div id="categoryTable" key='categoryTable'>
          <Table
            data={this.state.categories}
            title='Most Relevant Categories'
          ></Table>
        </div>
      )
      content.push(table);
    } else {
      content.push(<BasicLoader key="categoryLoader"/>)
    }

    return (
      <div className="Statistics text-center">
        {content}
      </div>
    )
  }
}

export default Statistics;
