import React from 'react'

import { ForceGraph3D } from 'react-force-graph'

import './styles.scss'

class Graph extends React.Component {
  constructor(props) {
    super(props);

    const { entities, categories } = props;

    /* Data has to be serpate from the state, since the state acts async */
    this.data = { nodes: [], links: [] };

    this.state = {
      data: { nodes: [], links: [] },
      entities,
      categories,
    }
  }

  componentDidMount() {
    this.constructGraph();
  }

  constructGraph() {
    for (let i = 0; i < this.state.entities.length; i += 1) {
      const { keyword, entity, mentionedWith } = this.state.entities[i];

      const keywordNode = this.addKeyword(keyword);
      const entityNode = this.addEntity(entity, mentionedWith.count, mentionedWith.score);

      this.createLink(keywordNode.id, entityNode.id);
    }

    for (let i = 0; i < this.state.categories.length; i += 1) {
      const { keyword, category, mentionedWith } = this.state.categories[i];
      
      const keywordNode = this.addKeyword(keyword);
      const categoryNode = this.addCategory(category, mentionedWith.count);

      this.createLink(keywordNode.id, categoryNode.id);
    }
  }

  addKeyword(keyword) {
    const node = {
      id: keyword._id,
      name: keyword.keyword_string,
      val: 10,
      color: '0000ff',
    };

    this.addNode(node);

    return node;
  }

  addEntity(entity, count, score) {
    const node = {
      id: entity.entity_string,
      name: entity.entity_string,
      val: count,
      color: score > 0 ? '00ff00' : 'ff0000',
    };

    this.addNode(node);

    return node;
  }

  addCategory(category, count) {
    const node = {
      id: category.category_string,
      name: category.category_string,
      val: count,
      color: 'ffff00',
    };

    this.addNode(node);

    return node;
  }

  addNode(node) {
    const nodeIds = this.data.nodes.map(e => e.id);
    const isAlreadyInGraph = nodeIds.includes(node.id);

    if (!isAlreadyInGraph) {
      this.data.nodes.push(node);
    } else { // When the node already exists, just add the value of the new node on top
      const nodes = this.data.nodes;

      /* Add the value of the current node on top of the inserted node */
      for (let i = 0; i < nodes.length; i += 1) {
        if (nodes[i].id === node.id) {
          nodes[i].val += node.val;
        }
      }
    }

    this.setState({ data: this.data });
  }

  createLink(source, target) {
    const link = { source, target };

    this.data.links.push(link);

    this.setState({ data: this.data });
  }

  render() {
    return (
      <div className="Graph text-center">
        <ForceGraph3D
          graphData={this.state.data}
          backgroundColor='#cd8400'
        >

        </ForceGraph3D>
      </div>
    )
  }
}

export default Graph;
