import React from 'react'

import { ForceGraph3D } from 'react-force-graph'

import apiService from '../../../../services/api/index'

import './styles.scss'

class Graph extends React.Component {
  constructor(props) {
    super(props);

    const { _id } = props;

    const limit = 20; // Hardcoded for now

    this.requestData(_id, limit);

    this.state = {
      _id,
      data: { nodes: [], links: [] },
    }
  }

  requestData(_id, limit) {
    apiService.getEntities(_id, limit)
      .then((data) => {
        for (let i = 0; i < data.length; i += 1) {
          const { keyword, entity, mentionedWith } = data[i];

          const keywordNode = this.addKeyword(keyword);
          const entityNode = this.addEntity(entity, mentionedWith.count, mentionedWith.score);
          
          this.createLink(keywordNode.id, entityNode.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

  addNode(node) {
    const nodeIds = this.state.data.nodes.map(e => e.id);
    const isAlreadyInGraph = nodeIds.includes(node.id);

    if (!isAlreadyInGraph) {
      this.setState({
        data: { 
          nodes: [...this.state.data.nodes, node],
          links: this.state.data.links,
        }
      });
    } else { // When the node already exists, just add the value of the new node on top
      const newNodes = [...this.state.data.nodes];

      /* Add the value of the current node on top of the inserted node */
      for (let i = 0; i < newNodes.length; i += 1) {
        if (newNodes[i].id === node.id) {
          newNodes[i].val += node.val;
        }
      }

      this.setState((prevState) => ({
        data: {
          nodes: newNodes,
          links: prevState.data.links,
        }
      }));
    }
  }

  createLink(source, target) {
    const link = { source, target };

    this.setState({
      data: { 
        nodes: this.state.data.nodes,
        links: [...this.state.data.links, link],
      }
    });
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
