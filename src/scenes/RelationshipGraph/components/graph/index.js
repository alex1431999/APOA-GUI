import React from 'react'

import { ForceGraph3D } from 'react-force-graph'

import './styles.scss'

class Graph extends React.Component {
  constructor(props) {
    super(props);

    const { keywords } = props;

    /* Data has to be serpate from the state, since the state acts async */
    this.data = { nodes: [], links: [] };

    this.state = {
      data: { nodes: [], links: [] },
      keywords,
    }
  }

  componentDidMount() {
    this.constructGraph();
  }

  constructGraph() {
    for (let i = 0; i < this.state.keywords.length; i += 1) {
      const keyword = this.state.keywords[i];

      const keywordNode = this.addKeyword(keyword);

      keyword.entities.forEach((entity) => {
        const { value, score, count } = entity;
        const entityNode = this.addEntity(value, count, score);
        this.createLink(keywordNode.id, entityNode.id, score);
      });

      keyword.categories.forEach((category) => {
        const { value, count } = category;
        const categoryNode = this.addCategory(value, count);
        this.createLink(keywordNode.id, categoryNode.id, 1);
      });
    }
  }

  addKeyword(keyword) {
    const node = {
      id: keyword._id.$oid,
      name: keyword.keyword_string,
      val: 100,
      color: '0000ff',
    };

    this.addNode(node);

    return node;
  }

  addEntity(value, count, score) {
    const node = {
      id: value,
      name: value,
      val: count,
      color: score > 0 ? '00ff00' : 'ff0000',
    };

    this.addNode(node);

    return node;
  }

  addCategory(value, count) {
    const node = {
      id: value,
      name: value,
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

  createLink(source, target, score) {
    const link = { 
      source, 
      target, 
      color: score > 0 ? '00ff00' : 'ff0000',
    };

    this.data.links.push(link);

    this.setState({ data: this.data });
  }

  render() {
    return (
      <div className="Graph text-center">
        <ForceGraph3D
          graphData={this.state.data}
          backgroundColor='#cd8400'
          linkWidth={3}
          linkOpacity={0.5}
        >

        </ForceGraph3D>
      </div>
    )
  }
}

export default Graph;
